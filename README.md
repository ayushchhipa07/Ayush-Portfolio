# Ayush Chhipa’s portfolio

A one-page Astro portfolio for Software Developer roles and freelance work, including an active AI learning and project-building journey. The introduction, project showcase, background, skills, services, and contact form retain the navy/teal/gold identity and persisted dark/light themes.

The page is generated as complete HTML. Browser scripts handle theme switching and contact submission; the portfolio does not depend on client-side rendering. The SQL queue animation, concurrency experiment, case-study walkthroughs, proof strip, and FAQ have been removed.

## Local review

Use Node.js 24 and install both dependency sets:

```sh
npm ci
npm ci --prefix server
npm run build
npm start
```

`npm start` serves the prebuilt `dist/` output and `/api/contact` from the same Express service. The existing local configuration uses [http://127.0.0.1:5000](http://127.0.0.1:5000). Without `PORT`, the server defaults to 4322 and binds to `127.0.0.1`. Rebuild after changing content or public environment settings.

For a fresh setup, copy `.env.example` to `.env` and `server/.env.example` to `server/.env`. Keep `EMAIL_USER` and `EMAIL_PASS` in the server environment. The site can be served without SMTP credentials, but the form will report delivery as unavailable.

`npm run dev` starts Astro development on port 4321. `npm run preview -- --port 4322` previews the static build. Neither supplies the contact API; use `npm start` to review the complete site. Astro 7 background services can be stopped with `npx astro dev stop` or `npx astro preview stop`.

## Page structure

All main navigation stays on `/`:

| Section      | Anchor      | Content                                                                 |
| ------------ | ----------- | ----------------------------------------------------------------------- |
| Introduction | `#home`     | Ayush’s Software Developer headline and current web/AI work              |
| Projects     | `#projects` | DocuGuard AI (GitHub), ComplyRelax and NiyamHub (live websites)             |
| About        | `#about`    | Background, education, certification, and resume link                   |
| Skills       | `#skills`   | Frontend, backend, databases, AI/GenAI, retrieval, and tools/automation    |
| Services     | `#services` | Full-stack development, product improvements, integrations, AI prototypes |
| Contact      | `#contact`  | Direct contact links and working message form                           |

NiyamHub and ComplyRelax are both Businessnow Private Limited projects; Ayush contributes to their development as part of his role. Neither is presented as his personal product. They have `#niyamhub` and `#complyrelax` anchors and are product showcases, not separate case-study pages. This ownership correction supersedes the earlier descriptions in historical reports under `docs/reference/`.

`redirects.mjs` is shared by Astro and the Node server. Old `/work/`, `/about/`, `/contact/`, `/work/niyamhub/`, and `/work/complyrelax-queue/` bookmarks lead to the matching homepage section. The Node server returns HTTP 301; Astro generates meta-refresh fallback pages for static hosting. The removed `/work/xbrl-parser/` route and unknown routes return 404.

DocuGuard AI is an ongoing personal document intelligence and RAG project, dated “Aug. 2026 – Present” and marked “Working / Ongoing.” Its `#docuguard-ai` card links only to the supplied GitHub repository. AI service copy describes scoped prototypes and integrations; the About section makes the learning journey and long-term AI Engineer direction explicit.

The sitemap contains the single canonical homepage. Metadata includes a title, description, canonical URL, Open Graph/Twitter image, Person schema, and SoftwareApplication entries for all three projects. `/robots.txt`, `/llms.txt`, `/humans.txt`, and `/.well-known/security.txt` are generated with the configured identity and origin. There is no FAQPage schema because there is no FAQ section.

Shared identity and project content live in `src/data/site.ts`; the page is `src/pages/index.astro`. Project and contact components are in `src/components/`. `src/layouts/Layout.astro` owns shared navigation and metadata; `src/styles/global.css` owns theme and layout rules. Local Space Grotesk and IBM Plex Mono fonts use `font-display: swap`. Product logos use responsive WebP assets with explicit dimensions.

## Contact delivery

`src/components/ContactSection.astro` places the existing form on the homepage. `contact-topics.mjs` shares the dropdown choices with the API allowlist, including AI / RAG / GenAI Project, AI-powered Application, and Other. The API also accepts the previous topic names for already-open tabs. Fields, honeypot, validation, endpoint, and `src/scripts/contact.ts` behavior remain intact. No new live email was sent as part of this update.

The API checks inputs, payload size, browser origins, and per-IP/global rate limits. Success is reported only after SMTP accepts the configured recipient. Errors and the 25-second timeout retain entered values. Unchanged retries reuse a request ID; the server deduplicates in-flight and successful requests for 15 minutes. These limits and deduplication records are per process, reset on restart, and are not shared across server instances.

An earlier authorized browser test received SMTP acceptance for `ayushchhipa7@gmail.com`; evidence is in `artifacts/audit/live-delivery.json`. That historical test did not inspect inbox or spam-folder placement and is not a new delivery test of this revision.

## Verification

With the full server running, set `AUDIT_URL` to its origin. For the existing PowerShell setup, use `$env:AUDIT_URL='http://127.0.0.1:5000'`.

```sh
npm run lint
npm run test:server
npm test
npm run test:contact
npm run audit:lighthouse
```

The browser checks cover the one-page layout in both themes, responsive widths, keyboard interaction, accessibility, anchors, metadata, static content, contact states, legacy redirects, and 404 behavior. Backend and contact-state tests use mocked delivery and send no mail. Tests use installed Chrome; reports and screenshots are written under ignored `artifacts/`. Run Lighthouse separately from other heavy browser checks.

See [QA_REPORT.md](QA_REPORT.md) for this revision’s actual results and Lighthouse scores. Older multipage scores and screenshots are not evidence for the one-page version. Lab measurements do not establish field INP or production Core Web Vitals.

## Publication

The changes are local. Follow [LAUNCH_CHECKLIST.md](LAUNCH_CHECKLIST.md) before publishing. The latest one-page request supersedes the earlier multipage/design requirements; the original requirements for confirmed identity/domain, approved resume and assets, and explicit ComplyRelax/Businessnow publication approval still apply.

Deploy the complete site as a Node web service: install both dependency sets, build with `npm run build:publish`, and start with `npm start`. Set the approved HTTPS `PUBLIC_SITE_URL` at build time, `PORTFOLIO_HOST=0.0.0.0`, the host’s `PORT`, server-only SMTP credentials, and the exact allowed `CLIENT_ORIGIN`. Keep `PUBLIC_CONTACT_ENDPOINT=/api/contact` for same-origin delivery. Configure `TRUST_PROXY` only for the hosting platform’s verified proxy addresses or CIDRs; forwarded client IP headers are ignored by default.

A static-only host needs a separately deployed contact API, a matching `PUBLIC_CONTACT_ENDPOINT` at build time, and the correct `CLIENT_ORIGIN` on that API. Configure permanent redirects from `redirects.mjs` where supported; the generated meta-refresh pages are fallbacks. Unknown URLs must return the real `404.html` with HTTP 404, rather than a catch-all homepage response.

The Download resume button serves the latest user-supplied Word document at `public/Ayush-Chhipa-Resume.docx`, unchanged from the 3 October 2026 attachment. Visitors can download it directly. To use a future PDF or DOCX, add it under `public/` and set `PUBLIC_RESUME_PATH`. Historical reports and previous resumes remain outside public output. The release check records prerequisites and does not authorize deployment, verify domain ownership, or submit sitemaps.

Recheck NiyamHub HTTPS and profile links before launch, then complete public schema validation and Google/Bing sitemap submissions after an approved deployment. See the launch checklist for the remaining owner decisions.
