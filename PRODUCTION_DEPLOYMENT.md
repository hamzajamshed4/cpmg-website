# CPMG Production Lead Handling

This site is a Node-served static application. It must run on a host that can keep `node server.js` running continuously.

## Start command

```bash
node server.js
```

Set `PORT` if the host requires a specific port.

## Hosting expectation

Use a Node-capable VPS, container host, PaaS or managed app host. Static-only hosting is not suitable because the contact, booking and careers forms submit to server endpoints. Serverless hosting is only suitable if lead storage, email and CV upload are moved to managed services and the runtime supports multipart uploads.

## Lead storage

Set `LEAD_STORAGE_PROVIDER` in production:

- `supabase`: stores leads through the Supabase REST API using a service role key.
- `airtable`: stores leads in Airtable tables.
- `webhook`: posts the lead record to a managed endpoint.
- `jsonl`: local JSONL files only. Use this for development, or only on production hosts with persistent private disk and backups.

When `LEAD_BACKUP_JSONL=true`, the server also writes a local JSONL backup to `DATA_DIR`. Confirm that directory is on persistent disk before relying on it.

## Email notifications

Set `EMAIL_PROVIDER` to `resend`, `sendgrid`, `mailgun` or `smtp`, then provide the matching credentials in environment variables. The server sends:

- An admin notification to `EMAIL_TO`.
- A confirmation email to the customer or applicant.

If email delivery fails, the lead is still stored and `emailDeliveryStatus` is saved as `failed`.

## CV uploads

Careers submissions support multipart upload for PDF, DOC and DOCX files up to 5MB. In production set `CV_STORAGE_PROVIDER=s3` and configure S3 or Cloudflare R2 credentials.

The local fallback stores files under `PRIVATE_UPLOAD_DIR`, which is not served publicly and is gitignored. Do not use local CV storage on hosts without persistent private disk and backups.

## Admin visibility

Set `ADMIN_TOKEN` to enable protected admin API access:

- `GET /api/admin/leads`
- `GET /api/admin/export`
- `POST /api/admin/status`

The `/admin` page can load server leads, export CSV, and update lead status when the token is supplied. Use HTTPS in production.

## Required environment

Copy `.env.example` to `.env` locally, or set the same variables in the production host. Never commit real secrets.
