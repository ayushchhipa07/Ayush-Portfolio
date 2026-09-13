import { chromium } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import assert from 'node:assert/strict';
import { access, mkdir, writeFile } from 'node:fs/promises';

const origin = process.env.AUDIT_URL || 'http://127.0.0.1:4321';
const paths = ['/'];
const sectionIds = ['home', 'projects', 'about', 'skills', 'services', 'contact'];
const legacyRoutes = {
  '/work/': '/#projects',
  '/about/': '/#about',
  '/contact/': '/#contact',
  '/work/niyamhub/': '/#niyamhub',
  '/work/complyrelax-queue/': '/#complyrelax',
};
await mkdir('artifacts/audit', { recursive: true });
const browser = await chromium.launch({ channel: 'chrome', headless: true });
const report = {
  testedAt: new Date().toISOString(),
  origin,
  pages: [],
  consoleErrors: [],
  consoleWarnings: [],
  expectedMockErrors: [],
  pageErrors: [],
  brokenLinks: [],
  interactions: [],
};
function monitor(page) {
  page.on('pageerror', (error) => report.pageErrors.push(error.message));
  page.on('console', (message) => {
    const entry = { page: page.url(), text: message.text(), location: message.location() };
    if (message.type() === 'error') report.consoleErrors.push(entry);
    if (message.type() === 'warning') report.consoleWarnings.push(entry);
  });
}
const normalize = (text) => text.replace(/\s+/g, ' ').trim();
try {
  const context = await browser.newContext();
  const page = await context.newPage();
  monitor(page);
  const links = new Set();
  const titles = new Set();
  const descriptions = new Set();
  const socialImages = new Set();
  const pageText = new Map();
  for (const path of paths) {
    const response = await page.goto(origin + path, { waitUntil: 'networkidle' });
    assert.equal(response.status(), 200, `Unexpected status on ${path}`);
    const rawHTML = await response.text();
    assert(rawHTML.includes('<h1'), `Missing static heading on ${path}`);
    assert(!rawHTML.includes('/work/xbrl-parser'), `Stale XBRL link on ${path}`);
    assert(!rawHTML.includes('/social/xbrl-parser'), `Stale XBRL social asset on ${path}`);
    await page.evaluate(() => document.fonts.ready);
    const title = await page.title();
    assert(!titles.has(title), `Duplicate title: ${title}`);
    titles.add(title);
    const description = await page.locator('meta[name="description"]').getAttribute('content');
    assert(description && !descriptions.has(description), 'Missing/duplicate description');
    descriptions.add(description);
    for (const prefix of ['og', 'twitter']) {
      const attribute = prefix === 'og' ? 'property' : 'name';
      assert.equal(
        await page.locator(`meta[${attribute}="${prefix}:title"]`).getAttribute('content'),
        title,
      );
      assert.equal(
        await page.locator(`meta[${attribute}="${prefix}:description"]`).getAttribute('content'),
        description,
      );
    }
    const social = await page.locator('meta[property="og:image"]').getAttribute('content');
    assert(social && !socialImages.has(social));
    socialImages.add(social);
    assert.equal(await page.locator('meta[name="twitter:image"]').getAttribute('content'), social);
    assert.equal(
      await page.locator('meta[name="twitter:card"]').getAttribute('content'),
      'summary_large_image',
    );
    assert.equal(await page.locator('h1').count(), 1);
    const canonical = await page.locator('link[rel="canonical"]').getAttribute('href');
    assert.equal(new URL(canonical).pathname, path);
    assert.equal(await page.locator('meta[property="og:url"]').getAttribute('content'), canonical);
    const schemas = (
      await page.locator('script[type="application/ld+json"]').allTextContents()
    ).map(JSON.parse);
    schemas.forEach((schema) => assert.equal(schema['@context'], 'https://schema.org'));
    if (path === '/' || path === '/about/') {
      const person = schemas.find((schema) => schema['@type'] === 'Person');
      assert(person, `Missing Person schema on ${path}`);
      assert.equal(person.name, 'Ayush Chhipa');
      assert.equal(person.alternateName, 'Ayushchhipa');
      assert.equal(person.jobTitle, 'Software Engineer');
      assert.equal(person.sameAs.length, 2);
      person.sameAs.forEach((url) => assert.equal(new URL(url).protocol, 'https:'));
      const profile = schemas.find((schema) => schema['@type'] === 'ProfilePage');
      assert(profile, `Missing ProfilePage schema on ${path}`);
      assert.equal(profile.mainEntity['@id'], person['@id']);
      assert.match(
        profile.dateModified,
        /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}[+-]\d{2}:\d{2}$/,
        'ProfilePage dateModified must be a full ISO 8601 date-time with timezone',
      );
    }
    for (const id of sectionIds)
      assert.equal(
        await page.locator(`[id="${id}"]`).count(),
        1,
        `Missing/duplicate ${id} section`,
      );
    const projectArticles = page.locator('#projects article');
    assert.equal(await projectArticles.count(), 2, 'Exactly two project showcases are required');
    assert.deepEqual(await projectArticles.evaluateAll((nodes) => nodes.map((node) => node.id)), [
      'niyamhub',
      'complyrelax',
    ]);
    for (const id of ['niyamhub', 'complyrelax']) {
      assert(
        (await page.locator(`#${id} a[href^="https://"]`).count()) > 0,
        `No live link for ${id}`,
      );
    }
    const work = schemas.filter((schema) =>
      ['CreativeWork', 'SoftwareApplication'].includes(schema['@type']),
    );
    assert.equal(work.length, 2, 'Expected structured data for both visible projects');
    assert.deepEqual(work.map((project) => new URL(project['@id']).hash).sort(), [
      '#complyrelax',
      '#niyamhub',
    ]);
    for (const project of work) {
      assert.equal(new URL(project['@id']).pathname, '/');
      assert.equal(new URL(project['@id']).origin, new URL(canonical).origin);
      assert.equal(new URL(project.url).protocol, 'https:');
      assert(project.description && project.name && project.applicationCategory);
      const article = page.locator(new URL(project['@id']).hash);
      assert((await article.innerText()).includes(project.description));
      assert.equal(await article.locator(`a[href="${project.url}"]`).count(), 1);
    }
    const faqSchema = schemas.find((schema) => schema['@type'] === 'FAQPage');
    const faqDetails = await page.locator('.faq-list details').count();
    if (faqDetails) {
      assert(faqSchema, `Missing FAQPage schema on ${path}`);
      assert.equal(faqSchema.mainEntity.length, faqDetails);
      for (const [index, question] of faqSchema.mainEntity.entries()) {
        const details = page.locator('.faq-list details').nth(index);
        assert.equal(normalize(await details.locator('summary').textContent()), question.name);
        assert.equal(
          normalize(await details.locator('p').textContent()),
          question.acceptedAnswer.text,
        );
        assert.equal(question['@type'], 'Question');
        assert.equal(question.acceptedAnswer['@type'], 'Answer');
        assert((await details.locator('a[href]').count()) > 0);
      }
    } else assert(!faqSchema, `FAQ schema without visible questions on ${path}`);
    const headings = await page.locator('h1,h2,h3,h4,h5,h6').evaluateAll((nodes) =>
      nodes.map((node) => ({
        level: Number(node.tagName.slice(1)),
        text: node.textContent.trim(),
      })),
    );
    for (let index = 1; index < headings.length; index++) {
      assert(
        headings[index].level <= headings[index - 1].level + 1,
        `Skipped heading level on ${path}: ${headings[index].text}`,
      );
    }
    assert.equal(await page.locator('img:not([alt])').count(), 0, `Image missing alt on ${path}`);
    const mainText = await page.locator('main').innerText();
    pageText.set(path, normalize(mainText));
    assert(
      !/A small concurrency experiment|Before: concurrent reads|After: serialized writes|Run both requests|Read case study/i.test(
        mainText,
      ),
      'Removed queue demonstration/case-study UI remains visible',
    );
    assert.equal(
      await page.locator('[data-ticket-b], [data-state="race"], .queue-demo').count(),
      0,
    );
    assert(
      !/lorem ipsum|\[yourdomain\]|\[handle\]|\[last name\]/i.test(mainText),
      `Placeholder content on ${path}`,
    );
    const hrefs = await page
      .locator('a[href]')
      .evaluateAll((nodes) => nodes.map((node) => node.getAttribute('href')));
    for (const href of hrefs) {
      if (href.startsWith('/')) links.add(href.split('#')[0]);
      if (href.startsWith('#') || href.startsWith('/#'))
        assert.equal(
          await page.locator(`[id="${href.split('#')[1]}"]`).count(),
          1,
          `Broken anchor ${href} on ${path}`,
        );
      assert(
        !Object.keys(legacyRoutes).includes(href),
        `Legacy multi-page navigation remains: ${href}`,
      );
      assert(!href.includes('[handle]') && href !== '#', 'Placeholder link');
    }
    const entry = {
      path,
      title,
      schemas: schemas.map((schema) => schema['@type']),
      headings,
      viewports: [],
    };
    for (const theme of ['dark', 'light']) {
      await page.evaluate((theme) => {
        document.documentElement.dataset.theme = theme;
        localStorage.setItem('ayush-theme', theme);
      }, theme);
      for (const width of [360, 768, 1024, 1440]) {
        await page.setViewportSize({ width, height: 1000 });
        const overflow = await page.evaluate(
          () => document.documentElement.scrollWidth > innerWidth,
        );
        assert(!overflow, `Overflow at ${path} ${theme} ${width}`);
        const result = { theme, width, overflow };
        if (path === '/' || width === 360 || width === 1440) {
          const axe = await new AxeBuilder({ page })
            .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'best-practice', 'experimental'])
            .analyze();
          result.violations = axe.violations.map((v) => ({
            id: v.id,
            impact: v.impact,
            nodes: v.nodes.map((n) => ({ target: n.target, summary: n.failureSummary })),
          }));
        }
        await page.screenshot({
          path: `artifacts/audit/${path === '/' ? 'home' : path.replaceAll('/', '-')}-${theme}-${width}.png`,
          fullPage: true,
        });
        if (path === '/' && width === 360) {
          await page.screenshot({
            path: `artifacts/audit/home-${theme}-360-viewport.png`,
            fullPage: false,
          });
        }
        entry.viewports.push(result);
      }
    }
    report.pages.push(entry);
    console.log(`Checked ${path} in both themes at four widths.`);
  }
  for (const link of [
    ...links,
    '/robots.txt',
    '/sitemap.xml',
    '/llms.txt',
    '/favicon.svg',
    '/apple-touch-icon.png',
    ...[...socialImages].map((url) => new URL(url).pathname),
  ]) {
    const response = await context.request.get(origin + link);
    if (!response.ok()) report.brokenLinks.push({ link, status: response.status() });
  }
  const robots = await (await context.request.get(origin + '/robots.txt')).text();
  for (const bot of [
    'GPTBot',
    'OAI-SearchBot',
    'ChatGPT-User',
    'ClaudeBot',
    'Claude-SearchBot',
    'Claude-User',
    'PerplexityBot',
    'Google-Extended',
    'Applebot-Extended',
    '*',
  ])
    assert(robots.includes(`User-agent: ${bot}\nAllow: /`));
  const xml = await (await context.request.get(origin + '/sitemap.xml')).text();
  const sitemapPaths = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(
    (match) => new URL(match[1]).pathname,
  );
  assert.deepEqual(
    sitemapPaths.sort(),
    [...paths].sort(),
    'Sitemap must contain only the one-page portfolio URL',
  );
  const llms = await (await context.request.get(origin + '/llms.txt')).text();
  assert(!llms.includes('/work/xbrl-parser'));
  for (const id of ['niyamhub', 'complyrelax']) assert(llms.includes(`#${id}`));
  for (const [route, destination] of Object.entries(legacyRoutes)) {
    const response = await context.request.get(origin + route, { maxRedirects: 0 });
    assert.equal(response.status(), 301, `Missing permanent redirect for ${route}`);
    assert.equal(response.headers().location, destination, `Wrong destination for ${route}`);
  }
  for (const removed of ['/work/xbrl-parser/', '/social/xbrl-parser.png']) {
    assert.equal(
      (await context.request.get(origin + removed)).status(),
      404,
      `Removed artifact is still served: ${removed}`,
    );
  }
  for (const removed of [
    'public/social/xbrl-parser.png',
    'dist/social/xbrl-parser.png',
    'dist/work/xbrl-parser/index.html',
  ]) {
    await assert.rejects(access(removed), { code: 'ENOENT' }, `Stale artifact remains: ${removed}`);
  }
  const missing = await context.request.get(origin + '/this-page-does-not-exist/');
  assert.equal(missing.status(), 404, 'Missing routes must return HTTP 404');
  const missingHTML = await missing.text();
  assert(
    missingHTML.includes('This path ends here.') && missingHTML.includes('noindex'),
    'Missing custom, non-indexable 404',
  );
  report.interactions.push(
    'One-page sitemap, crawler allow rules, llms.txt, favicon, legacy permanent redirects, removed XBRL artifacts, and custom HTTP 404 verified.',
  );

  await page.goto(origin);
  await page.evaluate(() => localStorage.removeItem('ayush-theme'));
  await page.reload();
  assert.equal(await page.locator('html').getAttribute('data-theme'), 'dark');
  await page.getByRole('button', { name: 'Switch to light theme' }).click();
  await page.reload();
  assert.equal(await page.locator('html').getAttribute('data-theme'), 'light');
  const navLinks = page.locator('nav[aria-label="Main navigation"] a');
  for (const link of await navLinks.all()) {
    const href = await link.getAttribute('href');
    assert(href.startsWith('#') || href.startsWith('/#'), 'Navigation must stay on one page');
    await link.click();
    assert.equal(new URL(page.url()).pathname, '/');
    assert.equal(new URL(page.url()).hash, '#' + href.split('#')[1]);
  }
  assert.equal(await page.locator('html').getAttribute('data-theme'), 'light');
  report.interactions.push('Default dark theme; light preference survives reload and navigation.');
  await page.goto(origin);
  await page.keyboard.press('Tab');
  assert.equal(await page.locator(':focus').textContent(), 'Skip to content');
  await page.keyboard.press('Enter');
  assert.equal(await page.locator(':focus').getAttribute('id'), 'main');
  report.interactions.push('Keyboard skip link focuses main content.');
  await page.emulateMedia({ reducedMotion: 'reduce' });
  const motion = await page.evaluate(() => ({
    reduced: matchMedia('(prefers-reduced-motion: reduce)').matches,
    scrollBehavior: getComputedStyle(document.documentElement).scrollBehavior,
  }));
  assert.equal(motion.reduced, true);
  assert.notEqual(
    motion.scrollBehavior,
    'smooth',
    'Reduced motion must disable animated scrolling',
  );
  report.interactions.push(
    'Navigation targets visible sections on the same page; queue experiment is absent; reduced motion disables animated scrolling.',
  );
  for (const width of [360, 1440]) {
    await page.setViewportSize({ width, height: 1000 });
    for (const id of [...sectionIds, 'niyamhub', 'complyrelax']) {
      await page.locator(`a[href="#${id}"], a[href="/#${id}"]`).first().click();
      await page.waitForFunction((id) => {
        const header = document.querySelector('.site-header').getBoundingClientRect();
        const target = document.getElementById(id).getBoundingClientRect();
        return target.top >= header.bottom - 2 && target.top < innerHeight;
      }, id);
      assert.equal(new URL(page.url()).hash, '#' + id);
    }
  }
  report.interactions.push(
    'All six sections and both project anchors remain visible below the sticky header at 360px and 1440px.',
  );
  // This isolated context never reaches the delivery service. Actual SMTP
  // acceptance and server spam controls have their own integration checks.
  const formContext = await browser.newContext();
  const formPage = await formContext.newPage();
  formPage.on('pageerror', (error) => report.pageErrors.push(error.message));
  formPage.on('console', (message) => {
    const entry = { page: formPage.url(), text: message.text(), location: message.location() };
    if (message.type() === 'error') {
      if (message.location().url === origin + '/api/contact' && message.text().includes('503')) {
        report.expectedMockErrors.push(entry);
      } else report.consoleErrors.push(entry);
    }
    if (message.type() === 'warning') report.consoleWarnings.push(entry);
  });
  const requests = [];
  let release;
  let responseStatus = 503;
  let gate = new Promise((resolve) => {
    release = resolve;
  });
  await formPage.route(origin + '/api/contact', async (route) => {
    requests.push({
      method: route.request().method(),
      body: route.request().postDataJSON(),
      headers: route.request().headers(),
    });
    await gate;
    await route.fulfill({
      status: responseStatus,
      contentType: 'application/json',
      body: JSON.stringify({
        success: responseStatus === 200,
        message:
          responseStatus === 200
            ? 'Message sent successfully.'
            : 'Message delivery is temporarily unavailable.',
      }),
    });
  });
  await formPage.goto(origin + '/#contact');
  assert.equal(
    new URL(await formPage.locator('#contact-form').getAttribute('data-endpoint'), origin).href,
    origin + '/api/contact',
    'Contact audit requires the same-origin endpoint covered by its mock; refusing an unmocked delivery',
  );
  const submit = formPage.getByRole('button', { name: 'Send message' });
  await submit.click();
  assert.equal(requests.length, 0);
  assert.equal(await formPage.locator('form').evaluate((form) => form.checkValidity()), false);
  await formPage.getByLabel('Your name').fill('QA Visitor');
  await formPage.getByLabel('Your email', { exact: true }).fill('invalid-email');
  await formPage.getByLabel('What’s this about?').selectOption('Compliance SaaS project');
  await formPage
    .getByLabel('What are you working on?')
    .fill('A QA test with & symbols and a clear scope.');
  await submit.click();
  assert.equal(requests.length, 0);
  assert.equal(
    await formPage
      .getByLabel('Your email', { exact: true })
      .evaluate((input) => input.validity.typeMismatch),
    true,
  );
  await formPage.getByLabel('Your email', { exact: true }).fill('qa@example.org');
  await formPage.getByLabel('What are you working on?').fill('short');
  await submit.click();
  assert.equal(requests.length, 0);
  const message = 'A QA test with & symbols and a clear scope.';
  await formPage.getByLabel('What are you working on?').fill(message);
  assert.equal(await formPage.locator('[name="website"]').count(), 1, 'Missing honeypot');
  assert.equal(await formPage.locator('[name="website"]').inputValue(), '');
  const pending = formPage.waitForRequest(origin + '/api/contact');
  await submit.click();
  await pending;
  assert.equal(await submit.isDisabled(), true);
  assert.equal(await formPage.locator('form').getAttribute('aria-busy'), 'true');
  await formPage.locator('form').evaluate((form) => {
    form.requestSubmit();
    form.requestSubmit();
  });
  const failed = formPage.waitForResponse(origin + '/api/contact');
  release();
  await failed;
  await formPage.waitForFunction(() =>
    document.querySelector('#form-status').textContent.includes('could not be sent'),
  );
  assert.equal(requests.length, 1, 'Duplicate requests while submission is pending');
  assert.equal(requests[0].method, 'POST');
  assert(requests[0].headers['content-type'].includes('application/json'));
  assert.equal(requests[0].body.name, 'QA Visitor');
  assert.equal(requests[0].body.email, 'qa@example.org');
  assert.equal(requests[0].body.topic, 'Compliance SaaS project');
  assert.equal(requests[0].body.message, message);
  assert.equal(requests[0].body.website, '');
  assert.match(
    requests[0].body.requestId,
    /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
  );
  assert.equal(await formPage.getByLabel('Your name').inputValue(), 'QA Visitor');
  assert.equal(
    await formPage.getByLabel('Your email', { exact: true }).inputValue(),
    'qa@example.org',
  );
  assert.equal(
    await formPage.getByLabel('What’s this about?').inputValue(),
    'Compliance SaaS project',
  );
  assert.equal(await formPage.getByLabel('What are you working on?').inputValue(), message);
  assert.equal(await submit.isEnabled(), true);
  assert.equal(await formPage.locator('form').getAttribute('aria-busy'), null);
  assert.equal(await formPage.locator(':focus').getAttribute('id'), 'form-status');
  responseStatus = 200;
  gate = Promise.resolve();
  await submit.click();
  await formPage.waitForFunction(() =>
    document.querySelector('#form-status').textContent.includes('Your message was sent.'),
  );
  assert.equal(requests.length, 2);
  assert.equal(await formPage.getByLabel('Your name').inputValue(), '');
  assert.equal(await formPage.getByLabel('Your email', { exact: true }).inputValue(), '');
  assert.equal(await formPage.getByLabel('What are you working on?').inputValue(), '');
  assert.equal(await submit.isEnabled(), true);
  await formContext.close();
  report.interactions.push(
    'Contact form: empty, invalid email, and short message rejected; honeypot present; same-origin JSON POST with UUID; concurrent duplicate submits blocked; 503 error preserves all fields and restores retry; mocked success announces delivery and clears input. No email sent by this audit.',
  );
  const noJS = await browser.newContext({ javaScriptEnabled: false });
  const crawler = await noJS.newPage();
  monitor(crawler);
  for (const path of paths) {
    const response = await crawler.goto(origin + path);
    assert.equal(response.status(), 200);
    assert((await crawler.locator('main').innerText()).length > 300);
    assert.equal(await crawler.locator('h1').count(), 1);
    for (const heading of report.pages.find((entry) => entry.path === path).headings) {
      assert(
        (await crawler.locator('main').textContent()).includes(heading.text),
        `Heading missing without JavaScript on ${path}: ${heading.text}`,
      );
    }
    for (const id of ['niyamhub', 'complyrelax']) {
      const projectText = normalize(await crawler.locator(`#${id}`).innerText());
      assert(
        projectText.length > 150 && pageText.get(path).includes(projectText),
        `Project ${id} must be readable without JavaScript`,
      );
    }
  }
  await crawler.goto(origin + '/#contact');
  assert.equal(await crawler.locator('#submit-contact').isDisabled(), true);
  assert(await crawler.locator('#contact a[href^="mailto:"]').isVisible());
  report.interactions.push(
    'All portfolio sections and both projects are readable with JavaScript disabled; direct email remains available and form submission is disabled.',
  );
  await noJS.close();
  const blockedStorage = await browser.newContext();
  await blockedStorage.addInitScript(() => {
    Object.defineProperty(window, 'localStorage', {
      get() {
        throw new Error('Storage blocked');
      },
    });
  });
  const storagePage = await blockedStorage.newPage();
  monitor(storagePage);
  const storageErrors = [];
  storagePage.on('pageerror', (error) => storageErrors.push(error.message));
  await storagePage.goto(origin);
  await storagePage.getByRole('button', { name: 'Switch to light theme' }).click();
  assert.equal(await storagePage.locator('html').getAttribute('data-theme'), 'light');
  assert.equal(storageErrors.length, 0);
  await blockedStorage.close();
  report.interactions.push('Theme toggle works when localStorage is blocked.');
  report.axeViolations = report.pages.flatMap((p) =>
    p.viewports.flatMap((v) => v.violations || []),
  );
  report.checkCounts = {
    contentPages: report.pages.length,
    viewportThemeCombinations: report.pages.reduce(
      (total, entry) => total + entry.viewports.length,
      0,
    ),
    axeScans: report.pages.reduce(
      (total, entry) =>
        total + entry.viewports.filter((viewport) => Array.isArray(viewport.violations)).length,
      0,
    ),
    legacyRedirects: Object.keys(legacyRoutes).length,
  };
  await writeFile('artifacts/audit/report.json', JSON.stringify(report, null, 2));
  assert.equal(
    report.axeViolations.length,
    0,
    'Accessibility violations: see artifacts/audit/report.json',
  );
  assert.equal(report.pageErrors.length, 0);
  assert.equal(report.consoleErrors.length, 0);
  assert.equal(report.consoleWarnings.length, 0);
  assert.equal(report.brokenLinks.length, 0);
  report.status = 'passed';
  console.log(
    'PASS: 8 viewport/theme checks, automated accessibility including experimental rules, zero unexpected console errors/warnings, anchor navigation, legacy redirects, metadata, schema/content parity, crawler readability, and contact interactions.',
  );
} catch (error) {
  report.status = 'failed';
  report.failure = error.message;
  throw error;
} finally {
  await writeFile('artifacts/audit/report.json', JSON.stringify(report, null, 2));
  await browser.close();
}
