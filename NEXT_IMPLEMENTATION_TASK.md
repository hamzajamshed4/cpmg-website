# Next Implementation Task: Production Lead Handling

## Goal

Prepare the CPMG website for production lead handling before launch.

The current site can run on a Node-capable host with:

```bash
node server.js
```

Do not deploy this version to static-only hosting or serverless hosting unless form handling and storage are changed first.

## Scope

### 1. Email Notifications

Add email delivery for all lead forms:

- Contact enquiries
- Booking requests
- Careers applications

Supported provider options:

- SMTP
- Resend
- SendGrid
- Mailgun

Required behaviour:

- Send admin notification to `info@cpmanagementgroup.co.uk`
- Send customer/applicant confirmation email where appropriate
- Include submission type, contact details, service/role, message, timestamp and consent state
- Handle email provider failures without losing the lead
- Log email delivery status
- Do not expose API keys or SMTP credentials in client-side code

### 2. Persistent Lead Storage

Replace or back up local JSONL lead files with production-safe persistent storage.

Recommended options:

- PostgreSQL
- Supabase
- Airtable
- Google Sheets
- Another managed persistent database

Required data models:

Contact enquiry:

```text
id
name
email
phone
serviceInterest
message
consent
status
createdAt
source
emailDeliveryStatus
```

Booking lead:

```text
id
serviceRequired
name
email
phone
address
postcode
preferredDate
preferredTime
propertyType
message
consent
status
createdAt
source
emailDeliveryStatus
```

Careers application:

```text
id
fullName
email
phone
address
postcode
roleInterestedIn
rightToWork
availability
experience
cvFileUrl
cvFileName
cvFileSize
privacyConsent
consentTimestamp
retentionDeleteAt
status
createdAt
emailDeliveryStatus
```

Lead status values:

```text
new
contacted
quoted
booked
completed
cancelled
```

### 3. CV Upload Handling

Add secure CV upload support for the Careers form.

Requirements:

- Accept multipart form submissions
- Allow only PDF, DOC and DOCX
- Enforce 5MB maximum file size server-side
- Validate extension and MIME type server-side
- Store files in private object storage
- Recommended storage: S3, Cloudflare R2 or equivalent
- Do not store CVs in a public web directory
- Save only private file URL/key in the lead record
- Add retention/deletion support for applications after 12 months

### 4. Environment Variables

Add `.env.example` with all required production variables.

Do not commit real secrets.

Suggested variables:

```bash
NODE_ENV=production
PORT=4173
PUBLIC_SITE_URL=https://www.cpmanagementgroup.co.uk

LEAD_STORAGE_PROVIDER=postgres
DATABASE_URL=

EMAIL_PROVIDER=resend
EMAIL_FROM=CPMG <no-reply@cpmanagementgroup.co.uk>
EMAIL_TO=info@cpmanagementgroup.co.uk
RESEND_API_KEY=
SMTP_HOST=
SMTP_PORT=
SMTP_USER=
SMTP_PASS=
SENDGRID_API_KEY=
MAILGUN_API_KEY=
MAILGUN_DOMAIN=

CV_STORAGE_PROVIDER=s3
S3_ENDPOINT=
S3_REGION=
S3_BUCKET=
S3_ACCESS_KEY_ID=
S3_SECRET_ACCESS_KEY=
S3_PUBLIC_BASE_URL=
```

### 5. Admin Visibility

Add one reliable way for CPMG to view and manage leads.

Acceptable options:

- Secure admin page
- Email delivery with confirmed receipt
- CSV export flow
- Database-backed dashboard
- Google Sheets/Airtable integration

Minimum admin requirements:

- View new contact enquiries
- View booking requests
- View careers applications
- See lead status
- Update lead status where admin UI exists
- Export leads as CSV where admin UI exists
- Access CV file links securely where CV upload exists

If implementing an admin page:

- Protect it with authentication
- Do not rely on a hardcoded password in the repository
- Use HTTPS in production
- Do not expose private CV files publicly

## Acceptance Criteria

- Contact, Booking and Careers forms still validate client-side and server-side
- Honeypot spam protection remains active
- Successful submissions are persisted in production-safe storage
- Email notifications are sent or failure is recorded without dropping the lead
- CV uploads are private, validated and size-limited
- `.env.example` exists and contains no real secrets
- No lead data, CV files, credentials or local JSONL files are committed
- The site still runs locally with documented setup steps
- Production deployment notes are updated

## Deployment Note

Until this task is complete, deploy only to a Node-capable host with persistent disk if relying on JSONL files.

Static-only hosting is not suitable for the current form/API behaviour.

Serverless hosting is not suitable unless persistent storage and upload handling are moved to managed services.
