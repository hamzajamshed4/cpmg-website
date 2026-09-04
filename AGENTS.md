# AGENTS.md

## Cursor Cloud specific instructions

### What this repo is
Public marketing website for CPMG (Crown Property Management Group Ltd), served by a single
self-contained Node.js HTTP server (`server.js`) that renders pages and exposes lead-capture
APIs (contact, booking, careers). The page markup/logic lives in `app.js`, styles in
`styles.css`. `api/*.php` are an alternative cPanel/shared-hosting deployment path and are NOT
used when running locally with Node.

### Dependencies
There are no third-party dependencies: `server.js` uses only Node.js built-in modules and there
is no `package.json` or lockfile. Node.js (v22 is present) is the only requirement, so the
startup update script is effectively a no-op. Do not add an `npm install` step.

### Running the app (development)
Start the server from the repo root:

```bash
node server.js
```

It listens on `http://localhost:4173` (override with `PORT`). There is no separate build step
and no watch/hot-reload — restart the process after editing `server.js`, `app.js`, or
`styles.css`.

### Configuration / env
`server.js` reads an optional `.env` (via its own loader; `.env` is gitignored). See
`.env.example`. With no `.env`, safe local defaults apply: `LEAD_STORAGE_PROVIDER=jsonl`
(leads written to `./data/*.jsonl`, also gitignored) and `EMAIL_PROVIDER=none` (no email sent;
`emailDeliveryStatus` becomes `not_configured`). No secrets are needed to run or test the core
flows locally. The Supabase/Airtable/webhook, email provider, and S3 CV-upload paths require
real credentials and are for production only.

### Testing / hello-world
There is no automated test suite or linter configured. Verify end-to-end by submitting a lead
form and checking persistence:

```bash
curl -s -X POST http://localhost:4173/api/contact -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"t@example.com","phone":"07123456789","serviceInterest":"Deep Cleaning","message":"hi","consent":true}'
# -> {"ok":true,...}; the lead is appended to ./data/contact.jsonl
```

The admin APIs (`GET /api/admin/leads`, `GET /api/admin/export`, `POST /api/admin/status`) and
the `/admin` page return 503 unless `ADMIN_TOKEN` is set; start the server with
`ADMIN_TOKEN=<token> node server.js` and pass `?token=<token>` (or `Authorization: Bearer <token>`)
to exercise them locally.
