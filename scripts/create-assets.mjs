import { chromium } from '@playwright/test';
import sharp from 'sharp';
import { readFile, mkdir, rm } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const projectDirectory = fileURLToPath(new URL('../', import.meta.url));
const socialDirectory = resolve(projectDirectory, 'public/social');
const imagesDirectory = resolve(projectDirectory, 'public/images');
await mkdir(socialDirectory, { recursive: true });
await mkdir(imagesDirectory, { recursive: true });

// Only remove the named assets from the previous multi-page portfolio.
for (const filename of [
  'work.png',
  'about.png',
  'contact.png',
  'niyamhub.png',
  'complyrelax-queue.png',
  'xbrl-parser.png',
]) {
  const obsoleteAsset = resolve(socialDirectory, filename);
  if (dirname(obsoleteAsset) !== socialDirectory) {
    throw new Error('Obsolete social asset must stay inside public/social.');
  }
  await rm(obsoleteAsset, { force: true });
}

for (const [source, name, width, height, quality] of [
  ['NiyamHubLogo.jpeg', 'niyamhub', 936, 428, 85],
  ['NiyamHubLogo.jpeg', 'niyamhub-small', 468, 214, 85],
  ['WebLogoComplyrelax.png', 'complyrelax', 936, 344, 88],
  ['WebLogoComplyrelax.png', 'complyrelax-small', 468, 172, 88],
]) {
  await sharp(resolve(projectDirectory, 'docs/reference/assets', source))
    .resize(width, height, { fit: 'fill' })
    .webp({ quality })
    .toFile(resolve(imagesDirectory, `${name}.webp`));
}
for (const [name, size] of [
  ['favicon-32', 32],
  ['apple-touch-icon', 180],
  ['icon-192', 192],
  ['icon-512', 512],
]) {
  await sharp(resolve(projectDirectory, 'public/favicon.svg'))
    .resize(size, size)
    .png()
    .toFile(resolve(projectDirectory, `public/${name}.png`));
}
const font = (
  await readFile(resolve(projectDirectory, 'public/fonts/space-grotesk-latin.woff2'))
).toString('base64');
const browser = await chromium.launch({ channel: 'chrome', headless: true });
try {
  const page = await browser.newPage({
    viewport: { width: 1200, height: 630 },
    deviceScaleFactor: 1,
  });
  await page.setContent(`<!doctype html>
    <html lang="en">
      <head>
        <meta charset="utf-8">
        <style>
          @font-face {
            font-family: Space;
            src: url(data:font/woff2;base64,${font});
            font-weight: 300 700;
          }
          * { box-sizing: border-box; }
          body {
            margin: 0;
            padding: 52px 64px;
            height: 630px;
            background: #12232f;
            color: #f3f6f5;
            font-family: Space, Arial, sans-serif;
          }
          .top {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding-bottom: 25px;
            border-bottom: 1px solid #3d535f;
            font-size: 22px;
          }
          .location { color: #b0c1c8; font-size: 20px; }
          main {
            display: flex;
            flex-direction: column;
            justify-content: center;
            height: 371px;
          }
          h1 {
            font-size: 90px;
            font-weight: 500;
            line-height: 1.07;
            letter-spacing: -5px;
            margin: 0 0 16px;
          }
          .dot { color: #d8b66a; }
          .role {
            font-size: 63px;
            line-height: 1.15;
            letter-spacing: -3px;
            color: #72d1c4;
            margin: 0;
          }
          .bottom {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding-top: 25px;
            border-top: 1px solid #3d535f;
            color: #b0c1c8;
            font-size: 23px;
          }
          .arrow { color: #d8b66a; font-size: 28px; }
        </style>
      </head>
      <body>
        <div class="top">
          <span>Portfolio</span>
          <span class="location">Jaipur, India</span>
        </div>
        <main>
          <h1>Ayush Chhipa<span class="dot">.</span></h1>
          <p class="role">Software Engineer</p>
        </main>
        <div class="bottom">
          <span>Full-stack development · Web applications &amp; SaaS</span>
          <span class="arrow" aria-hidden="true">↗</span>
        </div>
      </body>
    </html>`);
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: resolve(socialDirectory, 'home.png') });
} finally {
  await browser.close();
}
console.log('Generated home social image, four optimized project logos, and existing favicons.');
