# Software Developer portfolio review

Reviewed on 2 October 2026 against the production build at [http://127.0.0.1:4322](http://127.0.0.1:4322). This report describes the current local revision and supersedes the September one-page audit results.

## Content and implementation

- Software Developer is used in the hero, header, footer, About section, résumé-request subject, metadata, Person schema, social preview image, humans.txt, and llms.txt. AI Engineer appears as a long-term learning goal.
- DocuGuard AI is the first project, with “Aug. 2026 – Present,” “Working / Ongoing,” the supplied document intelligence/RAG features, and only the supplied GitHub repository link. Project cards and structured data consume the same project configuration.
- About describes learning AI from fundamentals toward advanced concepts through hands-on project work. Skills include the supported web and AI stack; services describe scoped AI integrations and prototypes. Docker, AWS/S3, and agent/tool-calling expertise were not added without evidence of current use.
- NiyamHub and ComplyRelax retain Businessnow attribution and their existing product links and logos.
- Contact topics are shared between the form and API through `contact-topics.mjs`. Existing relevant topics remain, with the Software development role label and the requested AI / RAG / GenAI Project, AI-powered Application, and Other choices. Previous topic names remain accepted by the API for already-open tabs.
- The existing colors, fonts, navigation, and theme behavior remain. Project cards stay in one row at every width, ordered DocuGuard AI, ComplyRelax, then NiyamHub. All three fit from 640px upward; smaller phones scroll horizontally through the same row. Compact logo tiles and stacked tablet headers preserve room for titles.
- No dependencies were added. No deployment, Git push, or real email submission occurred.

## Verification

- Production build and Astro checks passed: 12 files, zero errors, warnings, or hints.
- ESLint, formatting checks for changed frontend/audit files, and `git diff --check` passed.
- All 44 backend tests passed, including each visible topic reaching the email subject and body, validation, spam protection, origins, rate limits, deduplication, failure recovery, and missing SMTP configuration.
- Browser audit passed in dark and light themes at 320, 360, 768, 1024, and 1440 pixels: 10 viewport/theme combinations and 10 axe accessibility scans, with zero violations.
- Expanded technology stacks were checked with keyboard interaction at every audited size. Additional title/logo bounds checks at 560, 850, and 900 pixels found no overlap after the fix.
- Zero unexpected console errors, console warnings, JavaScript errors, page/heading overflow, broken images, or broken internal links.
- All six section anchors and three project anchors remain below the sticky header on mobile and desktop. Theme persistence, blocked localStorage, skip navigation, reduced motion, and no-JavaScript readability passed.
- Homepage metadata, three project schema entries, crawler files, sitemap, five legacy redirects, and custom HTTP 404 passed. No obsolete Software Engineer profile text remains in rendered HTML.
- Contact tests passed required fields, invalid email, short messages, concurrent duplicate attempts, failed delivery, malformed responses, rate limiting, the 25-second timeout, retained fields/request ID, successful retries, and clearing after success.
- All seven dropdown choices passed browser-to-API tests with a fake mail transport; selected values appeared unchanged in the resulting mail subject and body. No actual SMTP delivery was attempted.
- Visually inspected desktop/mobile layouts, tablet skills, contact layout, project cards, and the regenerated social preview.

Evidence: [browser audit](artifacts/audit/report.json), [contact states and topic integration](artifacts/audit/contact-states.json), [additional layout checks](artifacts/review/layout.json), and screenshots in `artifacts/audit/` and `artifacts/review/`. Artifacts are local and ignored by Git.

## Lighthouse

Lighthouse 13.4.1, installed Chrome, simulated mobile conditions, production build served locally. These measurements precede the subsequent three-column project-row adjustment; Lighthouse was not repeated for that layout-only follow-up.

| Performance | Accessibility | Best Practices | SEO |
| ----------: | ------------: | -------------: | --: |
| 100 | 100 | 100 | 100 |

LCP: 1.36 seconds. CLS: 0.0385. Total Blocking Time: 0 ms. These are local lab results, not production field measurements.

Evidence: [scores](artifacts/lighthouse/scores.json) and [HTML report](artifacts/lighthouse/home.html).

## Project-row follow-up

The single-row layout was checked in dark/light themes at 320, 360, 639, 640, 653, 700, 768, 1023, 1024, and 1440px. Checks cover project order, all three cards sharing one row, horizontal scrolling on phones, no page or heading overflow, no title/logo overlap, and working technology disclosures. Evidence: [layout report](artifacts/project-row/report.json) and screenshots in `artifacts/project-row/`. The broader content/contact audit above was performed before this follow-up.

## External links and remaining limitations

The subsequent DocuGuard AI disclosure update passed build/type checks, ESLint, and eight targeted browser checks (dark/light at 360, 653, 768, and 1440px). The card initially shows a short summary and two highlights; native Show more / Show less reveals the full description and features. Verified keyboard activation, restored collapsed height, single-row layout, no page overflow, no JavaScript errors, and operation without JavaScript. The collapsed desktop layout was visually reviewed. Evidence: [disclosure report](artifacts/project-disclosure/report.json). The broader audit and Lighthouse measurements above precede this disclosure update.

Checked on 2 October 2026 with certificate verification enabled:

| Destination | Result |
| ----------- | ------ |
| DocuGuard AI GitHub repository | HTTP 200 |
| Ayush's GitHub profile | HTTP 200 |
| ComplyRelax | HTTP 200 |
| HackerRank certificate | HTTP 200 |
| NiyamHub, root and www | `CERT_HAS_EXPIRED`; requires certificate renewal on NiyamHub hosting |
| LinkedIn profile | HTTP 999; automated requests blocked, manual verification remains |

The existing NiyamHub URL is preserved; no unverified alternate destination or insecure HTTP replacement was introduced. Its certificate cannot be repaired within this portfolio repository.

No local `.env` or `server/.env` is present. Live contact delivery requires server-side SMTP credentials; the current tests use a fake transport and do not establish inbox delivery. The direct email link remains available. On 3 October 2026, the newly supplied Word résumé was added unchanged at `public/Ayush-Chhipa-Resume.docx` and connected to the existing Download resume button, replacing the request-by-email fallback.

The updated frontend is available at port 4321; port 4322 serves the production build and contact API. See [LAUNCH_CHECKLIST.md](LAUNCH_CHECKLIST.md) for deployment configuration and remaining publication checks.

Résumé follow-up (3 October 2026): build and Astro checks passed. A real browser click on Download resume downloaded `Ayush-Chhipa-Resume.docx` (17,391 bytes) with the correct Word MIME type. The downloaded bytes exactly matched the supplied file. No résumé content was edited.
