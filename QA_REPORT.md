# One-page portfolio audit

Completed on 13 September 2026 against the finished build at [http://127.0.0.1:5000](http://127.0.0.1:5000). This report supersedes the earlier multipage report, preserved in `docs/reference/QA_REPORT.two-study.md`.

## Requested changes

- One homepage with Projects, About, Skills, Services, and Contact navigation.
- NiyamHub and ComplyRelax shown as product showcases with their original logos, descriptions, technology stacks, features, and direct live website links.
- Removed the SQL/queue animation, concurrency experiment, ticket graphics, case-study pages, proof strip, and FAQ.
- Preserved the navy/teal/gold colors, Space Grotesk typography, personal logo, persisted dark/light toggle, and working contact service.
- Replaced the social preview with the current Software Engineer introduction.
- Existing work/about/contact bookmarks redirect to the appropriate section. The Node service sends HTTP 301; Astro generates static redirect fallbacks. Unknown and removed XBRL URLs return HTTP 404.

## Featured-project card refinement

The oversized logo banners are replaced by contained header tiles: 128 × 84 pixels on large screens and 100 × 68 pixels on mobile. Features remain visible, and the technology list opens through a native keyboard-accessible disclosure. Live website actions show their destination domain. Cards stack at tablet and mobile widths to keep titles readable.

The targeted refinement check passed all eight theme/viewport combinations, including keyboard expansion of both technology lists, expanded-state axe scans, image bounds, and heading/page overflow. No accessibility findings or console errors/warnings were reported. Evidence: [project refinement report](artifacts/project-refinement/report.json). The broader one-page checks below were completed before this card-only refinement; Lighthouse was rerun against the refined build.

## Ownership copy correction

Ayush confirmed that NiyamHub, like ComplyRelax, is a Businessnow Private Limited project. Hero labels, project descriptions, About copy, generated project schema, llms.txt, and current documentation now reflect that attribution. Build/type checks and the served HTML/schema/text checks passed after this copy-only correction. The Lighthouse results below were measured on the preceding card-refinement build.

## Final Lighthouse

Lighthouse 13.4.1, Chrome, simulated mobile conditions, production build served locally.

| URL      | Performance | Accessibility | Best Practices | SEO |
| -------- | ----------: | ------------: | -------------: | --: |
| Home `/` |         100 |           100 |            100 | 100 |

LCP: **1.29 seconds**. CLS: **0.0228**. Total Blocking Time: **11.5 ms**. These are local lab measurements; field INP and production Core Web Vitals were not measured.

Evidence: [scores.json](artifacts/lighthouse/scores.json) and [HTML report](artifacts/lighthouse/home.html).

## Browser and functional checks

- **8 responsive/theme combinations passed:** dark and light at 360, 768, 1024, and 1440 pixels.
- **8 axe scans passed**, with zero accessibility violations in the audited states.
- Zero unexpected console errors, console warnings, page errors, horizontal overflow, or broken internal links.
- All six section anchors and both project anchors remain visible below the sticky header at mobile and desktop widths.
- Theme persistence, blocked storage, keyboard skip link, focus visibility, and reduced-motion scrolling checked.
- Complete homepage content and project descriptions remain readable with JavaScript disabled. Direct email stays available.
- Homepage metadata, Person/project schema parity, one-entry sitemap, crawler rules, llms.txt, images, favicon, five legacy redirects, and 404 behavior checked.
- Build, Astro type checks, ESLint, and whitespace checks passed.
- **37 backend tests passed** using a fake mail transport.
- Mocked contact checks passed for required fields, invalid input, spam trap, duplicate submission, failed delivery, malformed response, rate limiting, timeout, retained fields/request ID, and successful retry.

No additional real email was sent in this revision. The earlier authorized test established SMTP recipient acceptance; its evidence remains at [live-delivery.json](artifacts/audit/live-delivery.json). Inbox placement was not inspected. Intentional mocked delivery failures are recorded separately from unexpected console errors.

Evidence: [browser audit](artifacts/audit/report.json), [contact states](artifacts/audit/contact-states.json), and screenshots under `artifacts/audit/`.

## Publication status

This revision is local. No deployment, push, or sitemap submission occurred. External product/profile checks from the earlier revision are not new validations: NiyamHub's expired HTTPS certificate still needs a fresh check/repair, and LinkedIn was blocked to automated requests.

Before publication, confirm the domain/profile information, approved Software Engineer resume, product assets and public facts, and remaining ComplyRelax/Businessnow descriptions. Public schema validation and Google/Bing sitemap submissions require the final deployed origin and authenticated ownership access. See [LAUNCH_CHECKLIST.md](LAUNCH_CHECKLIST.md).

Audit artifacts are local and ignored by Git. The current one-page report and scores supersede historical multipage artifacts.
