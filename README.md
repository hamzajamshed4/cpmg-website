# cpmg-website

Public website for CPMG Crown Property Management Group Ltd.

## Local run

```bash
node server.js
```

The site runs at `http://127.0.0.1:4173` by default.

## Production notes

This version needs a Node-capable host. Do not deploy it as a static-only site. Configure environment variables from `.env.example` for managed lead storage, email notifications, private CV upload storage and admin access.

See `PRODUCTION_DEPLOYMENT.md` for the production lead-handling setup.

## SEO, tracking and privacy

Set `PUBLIC_SITE_URL=https://www.cpmanagementgroup.co.uk` in production so canonical URLs, sitemap references and structured data stay consistent.

Google Tag Manager can be enabled with `GTM_CONTAINER_ID`. Direct GA4 can be enabled with `GA_MEASUREMENT_ID`, but if GTM is configured the direct GA4 script is not output to avoid duplicate analytics firing. Analytics consent defaults to denied until a visitor accepts the cookie notice.

The sitemap is available at `/sitemap.xml` and robots.txt points crawlers to `https://www.cpmanagementgroup.co.uk/sitemap.xml`. Admin, API, private upload and lead storage routes are not included in the sitemap.

Launch blockers outside the codebase: set up Google Search Console, submit the sitemap, create or verify the Google Business Profile, add real citations/backlinks, and collect genuine customer reviews only after services have been delivered.
