# One-page portfolio launch checklist

The latest user request replaces the earlier multipage case-study presentation with one homepage and normal project showcases. The SQL/concurrency animation and lengthy case-study content are removed. This is a local revision; no deployment or sitemap submission has been performed.

Use [QA_REPORT.md](QA_REPORT.md) for the current audit results and scores. Earlier multipage reports, test counts, and Lighthouse scores do not establish the status of this revision.

## Current implementation

- [x] One complete HTML page with `#home`, `#projects`, `#about`, `#skills`, `#services`, and `#contact` sections.
- [x] NiyamHub appears first and ComplyRelax second, with product logos, descriptions, features, stacks, and direct live links.
- [x] Removed the queue experiment, SQL animation, case-study walkthroughs, proof strip, and FAQ.
- [x] Preserved the navy/teal/gold identity, local fonts, dark/light theme toggle, and contact delivery behavior.
- [x] Software Engineer remains the main headline; the current Businessnow role is described as full-stack developer.
- [x] About, education, certification, skills, services, and contact are available on the same page.
- [x] Existing bookmarks redirect to matching homepage sections through shared `redirects.mjs` rules: Node HTTP 301 and Astro static meta-refresh fallbacks.
- [x] The removed XBRL route and unknown routes retain 404 handling.
- [x] The contact section retains its fields, honeypot, validation, delivery endpoint, status messages, and retry behavior. No additional real email was sent for this revision.

The project copy uses supplied product facts. ComplyRelax is presented as work contributed at Businessnow; private security parameters and unconfirmed database-hardening/API-parsing claims are not included.

## Search and metadata

- [x] The homepage is generated as complete static HTML, with a single canonical URL and a homepage-only sitemap.
- [x] Homepage title, description, Open Graph/Twitter metadata, Person schema, and SoftwareApplication project entries are configured.
- [x] Explicit crawler allow rules remain in `robots.txt`; `llms.txt` describes the current one-page portfolio.
- [x] FAQPage markup is removed with the FAQ content.
- [x] Product logos have alternative text, explicit dimensions, responsive WebP sources, and lazy loading.
- [ ] Confirm the public domain and profile URLs, then rebuild the metadata, sitemap, and supporting files with that origin.
- [ ] After approved deployment, validate the public homepage with the [Schema.org validator](https://validator.schema.org/) and [Google Rich Results Test](https://search.google.com/test/rich-results).
- [ ] Verify ownership in [Google Search Console](https://search.google.com/search-console) and [Bing Webmaster Tools](https://www.bing.com/webmasters/), submit the final homepage sitemap to both, and record the accepted status.
- [ ] Confirm production crawler access and align the portfolio URL on GitHub and LinkedIn.

Valid Schema.org markup does not guarantee a Google rich result. Crawler permissions and llms.txt do not guarantee indexing or AI citations.

## Verification for this revision

The finished local one-page build passed the following checks. Detailed evidence is in [QA_REPORT.md](QA_REPORT.md):

- [x] Build, lint, and all 37 backend tests passed.
- [x] Both themes at 360, 768, 1024, and 1440 pixels: 8 combinations with no overflow.
- [x] Keyboard navigation, focus, skip link, heading structure, reduced motion, and 8 axe scans passed with zero violations.
- [x] Internal links, section/project anchors, logos, five legacy redirects, and unknown-route 404 passed. External product/profile verification remains below.
- [x] Primary content with JavaScript disabled, plus metadata and structured-data consistency passed.
- [x] Contact required fields, mocked success, errors, timeout, preserved values, and retries passed.
- [x] Zero unexpected console errors or warnings. Lighthouse: 100 Performance, 100 Accessibility, 100 Best Practices, 100 SEO.

The prior authorized live contact test established SMTP recipient acceptance for `ayushchhipa7@gmail.com` only; inbox placement was not inspected. Current contact checks use mocked delivery rather than sending another email. Evidence for that earlier delivery is `artifacts/audit/live-delivery.json`.

- [ ] Recheck NiyamHub’s HTTPS certificate on both the root and `www` host. The earlier audit found an expired certificate; the portfolio change cannot repair product hosting.
- [ ] Manually confirm LinkedIn if automated access remains blocked.
- [ ] Repeat public Lighthouse, mobile, links, form, redirect, and 404 checks after deployment.
- [ ] Measure real-user Core Web Vitals after launch; local Lighthouse does not measure field INP.

## Owner decisions before publication

- [ ] Confirm the domain. The current build fallback is `https://ayushchhipa-codes.onrender.com`.
- [ ] Confirm Ayush Chhipa, `ayushchhipa7@gmail.com`, [GitHub](https://github.com/ayushchhipa07), and [LinkedIn](https://www.linkedin.com/in/ayush-chhipa/).
- [ ] Explicitly approve the remaining ComplyRelax/Businessnow descriptions, logo, links, metadata, and llms.txt content for publication.
- [ ] Approve public facts and counts still displayed, including four NiyamHub languages and the four-game GameZone description.
- [ ] Supply the approved resume PDF headed “Software Engineer.” The current resume-request email link remains available until then.
- [ ] Confirm skipping a headshot, or supply an approved photo.
- [ ] Approve the product logos and any screenshots to be published. Current project visuals are logos, not fabricated product screenshots.
- [ ] Approve deployment of the finished one-page version and provide authenticated Google/Bing access when ready.

## Deployment after approval

1. Set the confirmed HTTPS `PUBLIC_SITE_URL` and approved profile details in `src/data/site.ts`.
2. Put the approved PDF under `public/`, set `PUBLIC_RESUME_PATH`, and record the identity, ComplyRelax, and metrics approvals used by the release check.
3. Install with `npm ci` and `npm ci --prefix server`.
4. Configure server-only `EMAIL_USER`, `EMAIL_PASS`, and `CONTACT_RECIPIENT`; set `CLIENT_ORIGIN` to the approved frontend origin.
5. Build with `npm run build:publish` and start with `npm start`. Set `PORTFOLIO_HOST=0.0.0.0` and the hosting platform’s `PORT`. Use `/api/contact` as `PUBLIC_CONTACT_ENDPOINT` for same-origin delivery.
6. Configure `TRUST_PROXY` only for verified proxy addresses or CIDRs. Rate limits and request deduplication are per process and reset on restart.
7. Deploy after publication approval. Verify the homepage, all anchors, contact delivery, permanent legacy redirects, 404 status, certificates, assets, and final metadata.
8. Complete external schema validation, Google/Bing ownership verification, and both sitemap submissions.

For static hosting, deploy the contact API separately, configure its origin allowlist, and set `PUBLIC_CONTACT_ENDPOINT` before building the site. Add HTTP 301 rules matching `redirects.mjs` where supported; Astro’s generated meta-refresh pages provide a fallback. Serve unknown routes with HTTP 404 rather than rewriting them to the homepage.

`npm run build:publish` checks recorded approvals, HTTPS origin, approved PDF, and SMTP credential presence. It does not grant publication permission or validate the live domain. Previous reports and the old resume are kept privately in `docs/reference/`.
