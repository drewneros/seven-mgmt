# Seven Management rebuild: open issues (28 Sep 2026)

Static site, built by `node build.mjs` from `data.mjs`. Preview: `python3 -m http.server 8877`.
GitHub Pages build: `BASE=/seven-mgmt node build.mjs` (project-site path). Real domain: plain `node build.mjs`.

| # | Issue | Status |
|---|---|---|
| 1 | Photos are placeholders. Host names (first + last), languages, event types are invented (data.mjs) | Drew OK'd invented names |
| 2 | Logo: real one from old site, in place (nav, footer, favicon) | DONE |
| 3 | Enquiry form has no backend, shows thank-you only | LATER (Drew) |
| 4 | WhatsApp: same +380 number as old site | Drew OK'd |
| 5 | SOP adapted for SEO only (titles, meta, canonical, one H1, schema, sitemap, robots, alt) | Drew OK'd |
| 6 | Hosting: GitHub Pages. Free Pages needs a PUBLIC repo | Waiting Drew yes |
| 7 | No og.jpg yet (referenced at /assets/og.jpg) | After real photos |
| 8 | Google Fonts from CDN, self-host for launch | Later |
| 9 | Not run: PageSpeed, Rich Results Test, CodeRabbit, Search Console, GA4 | After deploy |
| 10 | Terms are Anastasia's legal text, filled the missing email, not lawyer-checked | Anastasia |
| 11 | Canonical/sitemap point to sevenmgmt.vip, which is still the LIVE old Framer site | Don't point the domain until she approves |
