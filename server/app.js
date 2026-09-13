import cors from 'cors';
import express from 'express';
import nodemailer from 'nodemailer';
import { createHash } from 'node:crypto';
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { resolve } from 'node:path';
import { redirects } from '../redirects.mjs';

const topics = new Set([
  'Software engineering role',
  'Compliance SaaS project',
  'PHP / CodeIgniter product',
  'Data or workflow automation',
  'Another engineering problem',
]);
const idPattern = /^[\da-f]{8}-[\da-f]{4}-4[\da-f]{3}-[89ab][\da-f]{3}-[\da-f]{12}$/i;
const cleanLine = (value) =>
  typeof value === 'string' ? value.replace(/[\r\n\t]/g, ' ').trim() : '';
const validEmail = (value) => /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(value);

export function createApp({
  env = process.env,
  transport,
  now = Date.now,
  logger = console,
  rateLimit = 5,
  windowMs = 15 * 60 * 1000,
  dist = fileURLToPath(new URL('../dist/', import.meta.url)),
} = {}) {
  const app = express();
  app.disable('x-powered-by');
  // Trust only the configured reverse proxy. Forwarded IP headers are ignored
  // by default, so a caller cannot bypass rate limits by supplying one.
  if (env.TRUST_PROXY)
    app.set(
      'trust proxy',
      env.TRUST_PROXY.split(',').map((item) => item.trim()),
    );
  const origins = new Set(
    (env.CLIENT_ORIGIN || env.PUBLIC_SITE_URL || 'https://ayushchhipa-codes.onrender.com')
      .split(',')
      .map((value) => value.trim())
      .filter(Boolean),
  );
  const recipient = env.CONTACT_RECIPIENT || 'ayushchhipa7@gmail.com';
  const mailer =
    transport ||
    nodemailer.createTransport({
      service: 'gmail',
      auth: { user: env.EMAIL_USER, pass: env.EMAIL_PASS },
      connectionTimeout: 10000,
      greetingTimeout: 10000,
      socketTimeout: 15000,
      disableFileAccess: true,
      disableUrlAccess: true,
    });
  const buckets = new Map();
  const deliveries = new Map();
  let globalBucket = { count: 0, expires: 0 };
  const fail = (res, status, message) => res.status(status).json({ success: false, message });
  app.use((_req, res, next) => {
    res.set('X-Content-Type-Options', 'nosniff');
    res.set('Referrer-Policy', 'strict-origin-when-cross-origin');
    res.set('X-Frame-Options', 'DENY');
    next();
  });
  app.use(
    '/api',
    (req, res, next) => {
      res.set('Cache-Control', 'no-store');
      const origin = req.get('Origin');
      if (origin && !origins.has(origin)) return fail(res, 403, 'This origin is not allowed.');
      next();
    },
    cors({
      origin: (origin, callback) => callback(null, !origin || origins.has(origin)),
      methods: ['POST', 'OPTIONS'],
      allowedHeaders: ['Content-Type'],
      maxAge: 86400,
    }),
  );

  app.get('/health', (_req, res) => res.json({ ok: true }));
  app.use(
    '/api/contact',
    (req, res, next) => {
      const time = now();
      for (const [key, value] of buckets) if (value.expires <= time) buckets.delete(key);
      for (const [key, value] of deliveries)
        if (value.expires <= time && value.settled) deliveries.delete(key);
      if (req.method !== 'POST') return next();
      const address = req.ip || req.socket.remoteAddress || 'unknown';
      const bucket = buckets.get(address) || { count: 0, expires: time + windowMs };
      if (globalBucket.expires <= time) globalBucket = { count: 0, expires: time + windowMs };
      if (bucket.count >= rateLimit || globalBucket.count >= 100 || buckets.size >= 5000) {
        res.set('Retry-After', String(Math.max(1, Math.ceil((bucket.expires - time) / 1000))));
        return fail(
          res,
          429,
          'Too many attempts. Please wait before trying again, or email me directly.',
        );
      }
      bucket.count++;
      globalBucket.count++;
      buckets.set(address, bucket);
      if (!req.is('application/json')) return fail(res, 415, 'Please submit the form as JSON.');
      next();
    },
    express.json({ limit: '12kb', strict: true }),
  );

  app.post('/api/contact', async (req, res) => {
    const body = req.body;
    if (!body || Array.isArray(body))
      return fail(res, 400, 'Please provide valid contact details.');
    if (typeof body.website !== 'string' || body.website.trim())
      return fail(res, 422, 'This submission could not be accepted. Please email me directly.');
    const name = cleanLine(body.name);
    const email = cleanLine(body.email).toLowerCase();
    const topic = cleanLine(body.topic);
    const message =
      typeof body.message === 'string' ? body.message.replace(/\r\n/g, '\n').trim() : '';
    const requestId = typeof body.requestId === 'string' ? body.requestId : '';
    if (
      !name ||
      name.length > 80 ||
      email.length > 120 ||
      !validEmail(email) ||
      !topics.has(topic) ||
      message.length < 10 ||
      message.length > 1800 ||
      !idPattern.test(requestId)
    )
      return fail(res, 400, 'Please provide valid contact details.');
    if (!transport && (!env.EMAIL_USER || !env.EMAIL_PASS))
      return fail(res, 503, 'Contact delivery is unavailable. Please email me directly.');
    const digest = createHash('sha256')
      .update(JSON.stringify({ name, email, topic, message }))
      .digest('hex');
    let delivery = deliveries.get(requestId);
    if (delivery && delivery.digest !== digest)
      return fail(res, 409, 'Please submit the updated message again.');
    if (!delivery) {
      if (deliveries.size >= 1000)
        return fail(res, 503, 'Contact delivery is busy. Please email me directly.');
      delivery = { digest, settled: false, expires: now() + windowMs };
      delivery.promise = (async () => {
        try {
          const result = await mailer.sendMail({
            from: { name: 'Ayush Portfolio', address: env.EMAIL_USER || recipient },
            to: recipient,
            replyTo: { name, address: email },
            subject: `${topic} — ${name}`,
            text: `Name: ${name}\nEmail: ${email}\nTopic: ${topic}\n\n${message}`,
            messageId: `<portfolio-${requestId}@${recipient.split('@')[1]}>`,
            disableFileAccess: true,
            disableUrlAccess: true,
          });
          if (
            !result.accepted?.some(
              (address) => String(address).toLowerCase() === recipient.toLowerCase(),
            )
          )
            throw new Error('Recipient not accepted');
          return true;
        } catch (error) {
          // Do not log message text, contact details, or SMTP credentials.
          logger.error('Contact delivery failed', { code: error.code || 'DELIVERY_FAILED' });
          return false;
        } finally {
          delivery.settled = true;
        }
      })();
      deliveries.set(requestId, delivery);
    }
    const accepted = await delivery.promise;
    if (!accepted) {
      if (deliveries.get(requestId) === delivery) deliveries.delete(requestId);
      return fail(res, 502, 'Delivery was not confirmed. Please email me directly.');
    }
    return res.json({ success: true, message: 'Message sent successfully.' });
  });
  app.use('/api', (_req, res) => fail(res, 404, 'Endpoint not found.'));
  for (const [path, destination] of Object.entries(redirects)) {
    app.get(path, (_req, res) => res.redirect(301, destination));
  }
  app.use(
    express.static(dist, {
      dotfiles: 'ignore',
      extensions: false,
      maxAge: 0,
      setHeaders(res, path) {
        if (/[/\\]_astro[/\\]/.test(path))
          res.set('Cache-Control', 'public, max-age=31536000, immutable');
      },
    }),
  );
  app.get('/.well-known/security.txt', (_req, res) => {
    const file = resolve(dist, '.well-known/security.txt');
    if (existsSync(file)) return res.type('text/plain').sendFile(file, { dotfiles: 'allow' });
    res.sendStatus(404);
  });
  app.use((_req, res) => {
    const file = resolve(dist, '404.html');
    if (existsSync(file)) return res.status(404).sendFile(file);
    res.status(404).type('text/plain').send('Page not found.');
  });
  app.use((error, _req, res, _next) => {
    const status = error.type === 'entity.too.large' ? 413 : 400;
    fail(
      res,
      status,
      status === 413 ? 'The message is too large.' : 'The request could not be read.',
    );
  });
  return app;
}
