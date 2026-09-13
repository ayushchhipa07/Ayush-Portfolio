import assert from 'node:assert/strict';
import { randomUUID } from 'node:crypto';
import { once } from 'node:events';
import { mkdtemp, mkdir, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { basename, dirname, join, resolve } from 'node:path';
import test from 'node:test';
import { createApp } from './app.js';

const origin = 'https://portfolio.example.test';
const recipient = 'owner@example.test';
const env = {
  CLIENT_ORIGIN: origin,
  CONTACT_RECIPIENT: recipient,
  EMAIL_USER: 'sender@example.test',
  EMAIL_PASS: 'fake-test-password',
};
const validContact = (overrides = {}) => ({
  name: 'Test Visitor',
  email: 'visitor@example.test',
  topic: 'Compliance SaaS project',
  message: 'I would like to discuss a compliance software project.',
  website: '',
  requestId: randomUUID(),
  ...overrides,
});

function deferred() {
  let resolve;
  const promise = new Promise((done) => { resolve = done; });
  return { promise, resolve };
}

async function fixture(t, options = {}) {
  const mails = [];
  const errors = [];
  const transport = {
    async sendMail(mail) {
      mails.push(mail);
      return { accepted: [recipient] };
    },
  };
  const app = createApp({
    env,
    transport,
    logger: { error: (...args) => errors.push(args) },
    ...options,
  });
  const server = app.listen(0, '127.0.0.1');
  let posts = 0;
  server.on('request', (req) => {
    if (req.method === 'POST' && (req.originalUrl || req.url) === '/api/contact') {
      // Express consumes and parses the body before entering the async route.
      // Observe the next event-loop turn after body completion, so concurrent
      // requests have both reached that route before the fake provider settles.
      req.once('end', () => setImmediate(() => {
        posts++;
        server.emit('contact-arrived');
      }));
    }
  });
  async function waitForPosts(count) {
    while (posts < count) await once(server, 'contact-arrived');
  }
  t.after(async () => {
    const closed = new Promise((resolve, reject) => {
      server.close((error) => error ? reject(error) : resolve());
    });
    server.closeAllConnections();
    await closed;
  });
  await once(server, 'listening');
  const base = `http://127.0.0.1:${server.address().port}`;
  async function request(path, { body, headers = {}, method = 'POST', raw } = {}) {
    const response = await fetch(base + path, {
      method,
      headers: { Origin: origin, 'Content-Type': 'application/json', ...headers },
      body: raw === undefined ? (body === undefined ? undefined : JSON.stringify(body)) : raw,
      signal: AbortSignal.timeout(5000),
    });
    const text = await response.text();
    let data;
    try { data = JSON.parse(text); } catch { data = null; }
    return { status: response.status, headers: response.headers, text, data };
  }
  const post = (body, options) => request('/api/contact', { body, ...options });
  return { app, mails, errors, base, request, post, waitForPosts };
}

function assertFailure(result, status) {
  assert.equal(result.status, status, result.text);
  assert.equal(result.data?.success, false);
  assert.equal(typeof result.data.message, 'string');
  assert(result.data.message.length > 0);
}

test('valid contact sends a plain-text message to the configured owner and preserves paragraphs', async (t) => {
  const f = await fixture(t);
  const body = validContact({
    name: '  Test\r\nVisitor\t  ',
    email: '  VISITOR@EXAMPLE.TEST  ',
    message: '  First line\r\n\r\nSecond line & <em>literal text</em>.  ',
  });
  const result = await f.post(body);
  assert.equal(result.status, 200);
  assert.equal(result.data.success, true);
  assert.equal(result.headers.get('access-control-allow-origin'), origin);
  assert.equal(result.headers.get('cache-control'), 'no-store');
  assert.equal(result.headers.get('x-content-type-options'), 'nosniff');
  assert.equal(result.headers.get('x-powered-by'), null);
  assert.equal(f.mails.length, 1);
  const mail = f.mails[0];
  assert.deepEqual(mail.from, { name: 'Ayush Portfolio', address: env.EMAIL_USER });
  assert.equal(mail.to, recipient);
  assert.deepEqual(mail.replyTo, { name: 'Test  Visitor', address: 'visitor@example.test' });
  assert.equal(mail.subject, 'Compliance SaaS project — Test  Visitor');
  assert(!/[\r\n]/.test(mail.subject));
  assert.equal(mail.text, 'Name: Test  Visitor\nEmail: visitor@example.test\nTopic: Compliance SaaS project\n\nFirst line\n\nSecond line & <em>literal text</em>.');
  assert.equal(mail.html, undefined);
  assert.equal(mail.messageId, `<portfolio-${body.requestId}@example.test>`);
  assert.equal(mail.disableFileAccess, true);
  assert.equal(mail.disableUrlAccess, true);
  assert.equal(f.errors.length, 0);
});

test('all visible inquiry topics are accepted', async (t) => {
  const f = await fixture(t);
  for (const topic of [
    'Software engineering role',
    'Compliance SaaS project',
    'PHP / CodeIgniter product',
    'Data or workflow automation',
    'Another engineering problem',
  ]) {
    const result = await f.post(validContact({ topic }));
    assert.equal(result.status, 200, topic);
  }
  assert.equal(f.mails.length, 5);
});

test('invalid fields, types, topics and request identifiers never reach the mail transport', async (t) => {
  const f = await fixture(t, { rateLimit: 100 });
  const variants = [
    ['empty name', { name: '  ' }],
    ['name number', { name: 123 }],
    ['name object', { name: { value: 'Visitor' } }],
    ['name too long', { name: 'N'.repeat(81) }],
    ['email missing', { email: undefined }],
    ['invalid email', { email: 'not-an-email' }],
    ['email object', { email: { address: 'visitor@example.test' } }],
    ['email too long', { email: 'a'.repeat(109) + '@example.test' }],
    ['email header injection', { email: 'visitor@example.test\r\nBcc: other@example.test' }],
    ['unknown topic', { topic: 'Invented topic' }],
    ['topic array', { topic: ['Compliance SaaS project'] }],
    ['short message', { message: '123456789' }],
    ['long message', { message: 'M'.repeat(1801) }],
    ['message array', { message: ['A valid looking message.'] }],
    ['message null', { message: null }],
    ['missing request ID', { requestId: undefined }],
    ['request ID number', { requestId: 123 }],
    ['arbitrary request ID', { requestId: 'retry-this-message' }],
    ['non-v4 UUID', { requestId: '123e4567-e89b-12d3-a456-426614174000' }],
    ['invalid UUID variant', { requestId: '123e4567-e89b-42d3-7456-426614174000' }],
  ];
  for (const [name, changes] of variants) {
    await t.test(name, async () => assertFailure(await f.post(validContact(changes)), 400));
  }
  assert.equal(f.mails.length, 0);
});

test('honeypot content, missing honeypot and invalid honeypot types are rejected', async (t) => {
  const f = await fixture(t);
  for (const website of ['https://spam.example.test', undefined, false, []]) {
    assertFailure(await f.post(validContact({ website })), 422);
  }
  assert.equal(f.mails.length, 0);
});

test('malformed, oversized and non-object JSON requests fail without delivering mail', async (t) => {
  const f = await fixture(t, { rateLimit: 10 });
  assertFailure(await f.post(undefined, { raw: '{broken' }), 400);
  assertFailure(await f.post(undefined, { raw: '{"message":"' + 'x'.repeat(13000) + '"}' }), 413);
  assertFailure(await f.post([]), 400);
  assertFailure(await f.post(null), 400);
  assertFailure(await f.post('a string'), 400);
  assertFailure(await f.post(validContact(), { headers: { 'Content-Type': 'text/plain' } }), 415);
  assert.equal(f.mails.length, 0);
});

test('foreign origins are rejected before delivery or preflight approval', async (t) => {
  const f = await fixture(t);
  const headers = { Origin: 'https://untrusted.example.test' };
  const result = await f.post(validContact(), { headers });
  assertFailure(result, 403);
  assert.equal(result.headers.get('access-control-allow-origin'), null);
  assertFailure(await f.request('/api/contact', { method: 'OPTIONS', headers }), 403);
  assert.equal(f.mails.length, 0);
});

test('configured origins receive valid preflight and can submit', async (t) => {
  const otherOrigin = 'https://www.portfolio.example.test';
  const f = await fixture(t, { env: { ...env, CLIENT_ORIGIN: `${origin}, ${otherOrigin}` } });
  const headers = { Origin: otherOrigin, 'Access-Control-Request-Method': 'POST' };
  const preflight = await f.request('/api/contact', { method: 'OPTIONS', headers });
  assert.equal(preflight.status, 204);
  assert.equal(preflight.headers.get('access-control-allow-origin'), otherOrigin);
  assert.equal((await f.post(validContact(), { headers: { Origin: otherOrigin } })).status, 200);
  assert.equal(f.mails.length, 1);
});

test('rate limiting ignores spoofed forwarding headers and permits a new time window', async (t) => {
  let time = 1000000;
  const windowMs = 15 * 60 * 1000;
  const f = await fixture(t, { now: () => time, rateLimit: 2, windowMs });
  for (const address of ['198.51.100.1', '198.51.100.2']) {
    assert.equal((await f.post(validContact(), { headers: { 'X-Forwarded-For': address } })).status, 200);
  }
  const blocked = await f.post(validContact(), { headers: { 'X-Forwarded-For': '198.51.100.3' } });
  assertFailure(blocked, 429);
  assert.equal(blocked.headers.get('retry-after'), '900');
  assert.equal(f.mails.length, 2);
  time += windowMs;
  assert.equal((await f.post(validContact())).status, 200);
  assert.equal(f.mails.length, 3);
});

test('invalid requests also consume the spam-attempt allowance', async (t) => {
  const f = await fixture(t, { rateLimit: 1 });
  assertFailure(await f.post(validContact({ message: '' })), 400);
  assertFailure(await f.post(validContact()), 429);
  assert.equal(f.mails.length, 0);
});

test('concurrent duplicate submissions and later retries share one successful delivery', async (t) => {
  const started = deferred();
  const acceptance = deferred();
  let sends = 0;
  const f = await fixture(t, {
    rateLimit: 10,
    transport: { async sendMail() { sends++; started.resolve(); return acceptance.promise; } },
  });
  const body = validContact();
  const first = f.post(body);
  await started.promise;
  const second = f.post(body);
  await f.waitForPosts(2);
  acceptance.resolve({ accepted: [recipient] });
  for (const result of await Promise.all([first, second])) {
    assert.equal(result.status, 200);
    assert.equal(result.data.success, true);
  }
  assert.equal((await f.post(body)).status, 200);
  assert.equal(sends, 1);
});

test('a reused request identifier with changed content is rejected during and after delivery', async (t) => {
  const started = deferred();
  const acceptance = deferred();
  let sends = 0;
  const f = await fixture(t, {
    transport: { async sendMail() { sends++; started.resolve(); return acceptance.promise; } },
  });
  const body = validContact();
  const pending = f.post(body);
  await started.promise;
  try {
    assertFailure(await f.post({ ...body, message: 'A changed request that should use a new identifier.' }), 409);
  } finally {
    acceptance.resolve({ accepted: [recipient] });
  }
  assert.equal((await pending).status, 200);
  assertFailure(await f.post({ ...body, email: 'another@example.test' }), 409);
  assert.equal(sends, 1);
});

test('deduplication expires after its time window while the same content can be sent with a new ID', async (t) => {
  let time = 1000000;
  const windowMs = 15 * 60 * 1000;
  const f = await fixture(t, { now: () => time, windowMs });
  const body = validContact();
  assert.equal((await f.post(body)).status, 200);
  time += windowMs - 1;
  assert.equal((await f.post(body)).status, 200);
  assert.equal(f.mails.length, 1);
  time++;
  assert.equal((await f.post(body)).status, 200);
  assert.equal(f.mails.length, 2);
  assert.equal((await f.post({ ...body, requestId: randomUUID() })).status, 200);
  assert.equal(f.mails.length, 3);
});

test('mail acceptance must name the intended recipient before reporting success', async (t) => {
  const replies = [
    { accepted: [] },
    { accepted: ['someone-else@example.test'] },
    { rejected: [recipient] },
    { accepted: [recipient.toUpperCase()] },
  ];
  let sends = 0;
  const f = await fixture(t, { transport: { async sendMail() { return replies[sends++]; } } });
  const body = validContact();
  for (let attempt = 0; attempt < 3; attempt++) assertFailure(await f.post(body), 502);
  assert.equal((await f.post(body)).status, 200);
  assert.equal((await f.post(body)).status, 200);
  assert.equal(sends, 4);
  assert.equal(f.errors.length, 3);
});

test('provider exceptions report failure, omit private data in logs, and allow a successful retry', async (t) => {
  let sends = 0;
  const f = await fixture(t, {
    transport: {
      async sendMail() {
        sends++;
        if (sends === 1) throw Object.assign(new Error('private@example.test SMTP fake-test-password'), { code: 'EAUTH' });
        return { accepted: [recipient] };
      },
    },
  });
  const body = validContact();
  assertFailure(await f.post(body), 502);
  assert.deepEqual(f.errors, [['Contact delivery failed', { code: 'EAUTH' }]]);
  assert.equal((await f.post(body)).status, 200);
  assert.equal((await f.post(body)).status, 200);
  assert.equal(sends, 2);
});

test('concurrent provider failure allows a later retry without caching failed delivery', async (t) => {
  const started = deferred();
  const result = deferred();
  let sends = 0;
  const f = await fixture(t, {
    rateLimit: 10,
    transport: {
      async sendMail() {
        sends++;
        if (sends === 1) { started.resolve(); return result.promise; }
        return { accepted: [recipient] };
      },
    },
  });
  const body = validContact();
  const first = f.post(body);
  await started.promise;
  const second = f.post(body);
  await f.waitForPosts(2);
  result.resolve({ accepted: [] });
  for (const response of await Promise.all([first, second])) assertFailure(response, 502);
  assert.equal(sends, 1);
  assert.equal((await f.post(body)).status, 200);
  assert.equal(sends, 2);
});

test('missing SMTP credentials returns unavailable without attempting an external delivery', async (t) => {
  const f = await fixture(t, {
    env: { CLIENT_ORIGIN: origin, CONTACT_RECIPIENT: recipient },
    transport: undefined,
  });
  assertFailure(await f.post(validContact()), 503);
  assert.equal(f.errors.length, 0);
});

test('health, unknown API routes and static 404 responses preserve the correct status and headers', async (t) => {
  const dist = await mkdtemp(join(tmpdir(), 'portfolio-server-test-'));
  t.after(() => {
    assert.equal(dirname(resolve(dist)), resolve(tmpdir()));
    assert(basename(dist).startsWith('portfolio-server-test-'));
    return rm(dist, { recursive: true, force: true });
  });
  await mkdir(join(dist, '.well-known'));
  await mkdir(join(dist, '_astro'));
  await writeFile(join(dist, '404.html'), '<!doctype html><title>Not found</title><h1>This path ends here.</h1>');
  await writeFile(join(dist, '.well-known', 'security.txt'), 'Contact: mailto:owner@example.test\n');
  await writeFile(join(dist, '_astro', 'site.123.js'), 'export const test = true;');
  const f = await fixture(t, { dist });
  const health = await f.request('/health', { method: 'GET' });
  assert.equal(health.status, 200);
  assert.deepEqual(health.data, { ok: true });
  assertFailure(await f.request('/api/unknown', { method: 'GET' }), 404);
  assertFailure(await f.request('/api/contact', { method: 'GET' }), 404);
  const missing = await f.request('/missing-page/', { method: 'GET' });
  assert.equal(missing.status, 404);
  assert(missing.text.includes('This path ends here.'));
  const security = await f.request('/.well-known/security.txt', { method: 'GET' });
  assert.equal(security.status, 200);
  assert.equal(security.text, 'Contact: mailto:owner@example.test\n');
  const asset = await f.request('/_astro/site.123.js', { method: 'GET' });
  assert.equal(asset.status, 200);
  assert.equal(asset.headers.get('cache-control'), 'public, max-age=31536000, immutable');
  assert.equal(f.mails.length, 0);
});
