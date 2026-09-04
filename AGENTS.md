# AGENTS.md

## Cursor Cloud specific instructions

This repo is the CPMG (Crown Property Management Group) marketing website — a vanilla
Node.js HTTP server (`server.js`) plus static assets (`index.html`, `app.js`, `styles.css`).
There is **no `package.json`, no dependencies, and no build/lint/test tooling**. The server
uses only Node core modules, so there is nothing to `npm install`.

### Run the dev server
- Start: `node server.js` (see `README.md`). Serves at `http://127.0.0.1:4173` (override with `PORT`).
- No build step and no watch/hot-reload; restart the process after editing `server.js`.

### Environment / providers (important gotcha)
- Do **not** copy `.env.example` to `.env` for local dev. Its defaults set
  `LEAD_STORAGE_PROVIDER=supabase`, `EMAIL_PROVIDER=resend`, and `CV_STORAGE_PROVIDER=s3`,
  which require external credentials.
- With **no `.env`**, `server.js` falls back to offline defaults: `jsonl` lead storage
  (leads written to `./data/*.jsonl`), `none` email (submissions return
  `emailDeliveryStatus: "not_configured"`, which is expected), and `local` CV storage
  (`./private_uploads`). Both `./data` and `./private_uploads` are gitignored.

### Exercising the lead APIs
- `POST /api/contact` and `POST /api/booking` require `consent: true` and a `serviceInterest`
  from the fixed `services` list in `server.js` (e.g. "Deep Cleaning"). `POST /api/careers`
  handles CV uploads.
- Admin endpoints (`/api/admin/*`) are only active when `ADMIN_TOKEN` is set.

### Not used in Node dev
- `api/*.php` + `.htaccess` are an alternative cPanel/Apache backend for shared hosting;
  they are not used when running `node server.js`.

### Lint / test / build
- None configured. Verification is manual: run `node server.js` and exercise the pages/forms.
