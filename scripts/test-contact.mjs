import { chromium } from '@playwright/test';
import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';
import { once } from 'node:events';
import { createApp } from '../server/app.js';
import { contactTopics } from '../contact-topics.mjs';
const origin = process.env.AUDIT_URL || 'http://127.0.0.1:4322';
const browser = await chromium.launch({ channel: 'chrome', headless: true });
const results = [];
let testServer;
try {
  const context = await browser.newContext();
  const page = await context.newPage();
  const errors = [];
  page.on('pageerror', (error) => errors.push(error.message));
  let behavior = 'malformed';
  const ids = [];
  await page.route('**/api/contact', async (route) => {
    ids.push(route.request().postDataJSON().requestId);
    if (behavior === 'timeout') return;
    if (behavior === 'malformed')
      return route.fulfill({ status: 200, contentType: 'text/html', body: 'Unavailable' });
    return route.fulfill({
      status: behavior === 'limited' ? 429 : 200,
      contentType: 'application/json',
      body: JSON.stringify({ success: behavior === 'success' }),
    });
  });
  await page.goto(origin + '/#contact');
  assert.equal(
    new URL(await page.locator('#contact-form').getAttribute('data-endpoint'), origin).href,
    origin + '/api/contact',
    'Contact-state audit only supports the mocked same-origin endpoint; refusing unmocked delivery.',
  );
  await page.getByLabel('Your name').fill('QA Visitor');
  await page.getByLabel('Your email', { exact: true }).fill('qa@example.org');
  await page.getByLabel('What’s this about?').selectOption('Compliance SaaS project');
  await page
    .getByLabel('What are you working on?')
    .fill('A local test of contact delivery failure and retry behavior.');
  for (const mode of ['malformed', 'limited', 'timeout', 'success']) {
    behavior = mode;
    await page.getByRole('button', { name: 'Send message' }).click();
    await page.waitForFunction(() => !document.querySelector('#submit-contact').disabled, null, {
      timeout: 30000,
    });
    const message = await page.locator('#form-status').textContent();
    if (mode === 'success') {
      assert(message.includes('was sent'));
      assert.equal(await page.getByLabel('Your name').inputValue(), '');
    } else {
      assert.equal(await page.getByLabel('Your name').inputValue(), 'QA Visitor');
      assert.equal(await page.locator('#message').isEnabled(), true);
      assert(
        message.includes(
          mode === 'limited'
            ? 'Too many attempts'
            : mode === 'timeout'
              ? 'Delivery has not been confirmed'
              : 'could not be sent',
        ),
      );
    }
    results.push({ state: mode, passed: true, message });
  }
  assert.equal(
    new Set(ids).size,
    1,
    'A retry of unchanged content must reuse its idempotency key.',
  );
  // Forward browser submissions to a real local API with a fake mail transport.
  // This checks the rendered options, client payload, server allowlist, and email topic together.
  const mails = [];
  const recipient = 'owner@example.test';
  testServer = createApp({
    env: { CLIENT_ORIGIN: origin, CONTACT_RECIPIENT: recipient },
    rateLimit: 20,
    transport: {
      async sendMail(mail) {
        mails.push(mail);
        return { accepted: [recipient] };
      },
    },
  }).listen(0, '127.0.0.1');
  await once(testServer, 'listening');
  await page.unroute('**/api/contact');
  await page.route('**/api/contact', async (route) => {
    const response = await context.request.post(
      `http://127.0.0.1:${testServer.address().port}/api/contact`,
      { data: route.request().postDataJSON(), headers: { Origin: origin } },
    );
    await route.fulfill({ response });
  });
  assert.deepEqual(await page.locator('#topic option').allTextContents(), [
    'Choose a topic',
    ...contactTopics,
  ]);
  for (const topic of contactTopics) {
    await page.getByLabel('Your name').fill('QA Visitor');
    await page.getByLabel('Your email', { exact: true }).fill('qa@example.org');
    await page.getByLabel('What’s this about?').selectOption(topic);
    await page
      .getByLabel('What are you working on?')
      .fill('A local test of the selected contact topic.');
    await page.getByRole('button', { name: 'Send message' }).click();
    await page.waitForFunction(() =>
      document.querySelector('#form-status').textContent.includes('was sent'),
    );
    assert.equal(mails.at(-1).subject, `${topic} — QA Visitor`);
    assert(mails.at(-1).text.includes(`Topic: ${topic}\n`));
    assert.equal(await page.locator('#topic').inputValue(), '');
    results.push({ topic, passed: true, delivery: 'local API with fake mail transport' });
  }
  assert.equal(mails.length, contactTopics.length);
  assert.equal(errors.length, 0);
  await mkdir('artifacts/audit', { recursive: true });
  await writeFile(
    'artifacts/audit/contact-states.json',
    JSON.stringify(
      { delivery: 'mocked; no email sent', results, retainedRequestIdAcrossRetries: true },
      null,
      2,
    ),
  );
  console.log(
    'PASS: malformed responses, rate limits, 25-second timeout, successful retry, stable request ID, and all topic values delivered through the local API to a fake transport. No email sent.',
  );
} finally {
  if (testServer)
    await new Promise((resolve, reject) =>
      testServer.close((error) => (error ? reject(error) : resolve())),
    );
  await browser.close();
}
