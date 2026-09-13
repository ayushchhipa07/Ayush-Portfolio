import { chromium } from '@playwright/test';
import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';
if (process.env.RUN_LIVE_DELIVERY_TEST !== '1')
  throw new Error(
    'This sends one real test email to Ayush. Set RUN_LIVE_DELIVERY_TEST=1 only for an explicitly requested delivery test.',
  );
const origin = process.env.AUDIT_URL || 'http://127.0.0.1:4322';
const browser = await chromium.launch({ channel: 'chrome', headless: true });
try {
  const context = await browser.newContext();
  const page = await context.newPage();
  const errors = [];
  page.on('pageerror', (error) => errors.push(error.message));
  page.on('console', (message) => {
    if (['error', 'warning'].includes(message.type())) errors.push(message.text());
  });
  await page.goto(origin + '/#contact');
  await page.getByLabel('Your name').fill('Portfolio delivery test');
  await page.getByLabel('Your email', { exact: true }).fill('ayushchhipa7@gmail.com');
  await page.getByLabel('What’s this about?').selectOption('Another engineering problem');
  await page
    .getByLabel('What are you working on?')
    .fill(
      'This is the single real contact-form delivery test requested in the portfolio refinement brief. It was sent through the local production build and its email endpoint. No response is needed.',
    );
  const responsePromise = page.waitForResponse(
    (response) => response.url().endsWith('/api/contact') && response.request().method() === 'POST',
  );
  await page.getByRole('button', { name: 'Send message' }).click();
  const response = await responsePromise;
  const result = await response.json();
  const report = {
    testedAt: new Date().toISOString(),
    origin,
    destination: 'ayushchhipa7@gmail.com',
    httpStatus: response.status(),
    result,
    consoleErrorsOrWarnings: errors,
    deliveryEvidence:
      'SMTP recipient acceptance confirmed by server; inbox placement was not inspected.',
  };
  await mkdir('artifacts/audit', { recursive: true });
  await writeFile('artifacts/audit/live-delivery.json', JSON.stringify(report, null, 2));
  assert.equal(response.status(), 200);
  assert.equal(result.success, true);
  await page.waitForFunction(() =>
    document.querySelector('#form-status').textContent.includes('Your message was sent'),
  );
  assert.equal(await page.getByLabel('Your name').inputValue(), '');
  assert.equal(errors.length, 0);
  await page.screenshot({ path: 'artifacts/audit/live-delivery.png', fullPage: true });
  console.log(JSON.stringify(report));
} finally {
  await browser.close();
}
