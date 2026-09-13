import lighthouse from 'lighthouse';
import { launch } from 'chrome-launcher';
import { mkdir, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
const origin = process.env.AUDIT_URL || 'http://127.0.0.1:4321';
const paths = ['/'];
await mkdir('artifacts/lighthouse', { recursive: true });
await mkdir('artifacts/lighthouse/chrome-profile', { recursive: true });
const chrome = await launch({
  userDataDir: resolve('artifacts/lighthouse/chrome-profile'),
  chromePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
  chromeFlags: ['--headless=new', '--no-first-run', '--disable-extensions'],
});
const scores = [];
try {
  for (const path of paths) {
    const result = await lighthouse(origin + path, {
      port: chrome.port,
      output: ['json', 'html'],
      logLevel: 'error',
      onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
      formFactor: 'mobile',
      throttlingMethod: 'simulate',
    });
    const slug = path === '/' ? 'home' : path.replaceAll('/', '-');
    await writeFile(`artifacts/lighthouse/${slug}.json`, result.report[0]);
    await writeFile(`artifacts/lighthouse/${slug}.html`, result.report[1]);
    const lhr = result.lhr;
    const entry = {
      path,
      scores: Object.fromEntries(
        Object.entries(lhr.categories).map(([key, value]) => [key, Math.round(value.score * 100)]),
      ),
      lcpMs: lhr.audits['largest-contentful-paint'].numericValue,
      cls: lhr.audits['cumulative-layout-shift'].numericValue,
      tbtMs: lhr.audits['total-blocking-time'].numericValue,
      failedAudits: Object.values(lhr.audits)
        .filter((a) => a.score !== null && a.score < 0.9)
        .map((a) => ({ id: a.id, title: a.title, value: a.displayValue })),
    };
    scores.push(entry);
    console.log(JSON.stringify(entry));
    await writeFile('artifacts/lighthouse/scores.json', JSON.stringify(scores, null, 2));
  }
} finally {
  await chrome.kill();
}
if (scores.some((page) => Object.values(page.scores).some((score) => score < 95)))
  process.exitCode = 1;
