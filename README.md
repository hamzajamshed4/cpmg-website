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
