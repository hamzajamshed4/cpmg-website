const http = require("http");
const https = require("https");
const tls = require("tls");
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const { randomUUID } = crypto;

const root = __dirname;
loadEnv(path.join(root, ".env"));

const dataDir = path.resolve(process.env.DATA_DIR || path.join(root, "data"));
const privateUploadDir = path.resolve(process.env.PRIVATE_UPLOAD_DIR || path.join(root, "private_uploads"));
const siteUrl = process.env.PUBLIC_SITE_URL || "https://www.cpmanagementgroup.co.uk";
const adminEmail = process.env.EMAIL_TO || "info@cpmanagementgroup.co.uk";
const emailFrom = process.env.EMAIL_FROM || "CPMG <no-reply@cpmanagementgroup.co.uk>";
const maxCvSize = Number(process.env.CV_MAX_BYTES || 5 * 1024 * 1024);

const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".png": "image/png",
  ".xml": "application/xml; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".md": "text/markdown; charset=utf-8"
};

const services = [
  "Carpet Cleaning",
  "End of Tenancy Cleaning",
  "Deep Cleaning",
  "Landscaping and Garden",
  "Office Cleaning",
  "Communal Area Cleaning",
  "Fire Alarm Callout",
  "Waste Removal",
  "Other"
];

const publicRoutes = new Set([
  "/",
  "/services/domestic",
  "/services/commercial",
  "/about",
  "/careers",
  "/contact",
  "/booking",
  "/privacy-policy",
  "/terms-and-conditions",
  "/admin",
  "/services/domestic/carpet-cleaning",
  "/services/domestic/end-of-tenancy-cleaning",
  "/services/domestic/deep-cleaning",
  "/services/domestic/landscaping-and-garden",
  "/services/commercial/office-cleaning",
  "/services/commercial/communal-area-cleaning",
  "/services/commercial/window-cleaning",
  "/services/commercial/fire-alarm-callout",
  "/services/commercial/ground-maintenance",
  "/services/commercial/waste-removal",
  "/services/commercial/sparkle-cleaning"
]);

const statusValues = ["new", "contacted", "quoted", "booked", "completed", "cancelled"];
const cvTypes = {
  ".pdf": ["application/pdf"],
  ".doc": ["application/msword", "application/octet-stream"],
  ".docx": ["application/vnd.openxmlformats-officedocument.wordprocessingml.document", "application/zip", "application/octet-stream"]
};

function loadEnv(filePath) {
  if (!fs.existsSync(filePath)) return;
  const lines = fs.readFileSync(filePath, "utf8").split(/\r?\n/);
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const match = trimmed.match(/^([A-Za-z_][A-Za-z0-9_]*)=(.*)$/);
    if (!match) continue;
    const [, key, raw] = match;
    if (process.env[key] !== undefined) continue;
    process.env[key] = raw.replace(/^["']|["']$/g, "");
  }
}

function sendJson(res, status, body) {
  res.writeHead(status, { ...securityHeaders(), "Content-Type": "application/json; charset=utf-8" });
  res.end(JSON.stringify(body));
}

function securityHeaders(extra = {}) {
  return {
    "X-Content-Type-Options": "nosniff",
    "Referrer-Policy": "strict-origin-when-cross-origin",
    "X-Frame-Options": "SAMEORIGIN",
    "Permissions-Policy": "camera=(), microphone=(), geolocation=(), payment=()",
    ...extra
  };
}

function readBody(req, limit = 8 * 1024 * 1024) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    let size = 0;
    req.on("data", (chunk) => {
      size += chunk.length;
      if (size > limit) {
        reject(new Error("Request body too large"));
        req.destroy();
        return;
      }
      chunks.push(chunk);
    });
    req.on("end", () => resolve(Buffer.concat(chunks)));
    req.on("error", reject);
  });
}

async function readJson(req) {
  const body = await readBody(req, 250000);
  try {
    return body.length ? JSON.parse(body.toString("utf8")) : {};
  } catch {
    throw new Error("Invalid JSON");
  }
}

async function readSubmission(req) {
  const contentType = req.headers["content-type"] || "";
  if (contentType.includes("multipart/form-data")) {
    return parseMultipart(await readBody(req, maxCvSize + 500000), contentType);
  }
  return { fields: await readJson(req), files: {} };
}

function parseMultipart(buffer, contentType) {
  const boundary = contentType.match(/boundary=(?:"([^"]+)"|([^;]+))/)?.[1] || contentType.match(/boundary=(?:"([^"]+)"|([^;]+))/)?.[2];
  if (!boundary) throw new Error("Missing multipart boundary");
  const delimiter = Buffer.from(`--${boundary}`);
  const fields = {};
  const files = {};
  let start = buffer.indexOf(delimiter);
  while (start !== -1) {
    const next = buffer.indexOf(delimiter, start + delimiter.length);
    if (next === -1) break;
    let part = buffer.subarray(start + delimiter.length, next);
    if (part.subarray(0, 2).toString() === "\r\n") part = part.subarray(2);
    if (part.subarray(part.length - 2).toString() === "\r\n") part = part.subarray(0, part.length - 2);
    start = next;
    if (!part.length || part.toString("utf8", 0, 2) === "--") continue;
    const headerEnd = part.indexOf(Buffer.from("\r\n\r\n"));
    if (headerEnd === -1) continue;
    const headerText = part.subarray(0, headerEnd).toString("utf8");
    const body = part.subarray(headerEnd + 4);
    const disposition = headerText.match(/content-disposition:\s*form-data;([^\r\n]+)/i)?.[1] || "";
    const name = disposition.match(/name="([^"]+)"/)?.[1];
    const filename = disposition.match(/filename="([^"]*)"/)?.[1];
    const mimeType = headerText.match(/content-type:\s*([^\r\n]+)/i)?.[1]?.trim() || "application/octet-stream";
    if (!name) continue;
    if (filename) {
      files[name] = { filename: path.basename(filename), mimeType, buffer: body, size: body.length };
    } else {
      fields[name] = body.toString("utf8");
    }
  }
  return { fields, files };
}

function isEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value || ""));
}

function isPresent(value) {
  return typeof value === "string" && value.trim().length > 0;
}

function boolField(value) {
  return value === true || value === "true" || value === "on" || value === "1";
}

function normalizeLead(type, fields, files = {}) {
  const data = { ...fields };
  data.companyWebsite = data.companyWebsite || "";
  if (type === "contact" || type === "booking") data.consent = boolField(data.consent);
  if (type === "careers") {
    data.privacyConsent = boolField(data.privacyConsent);
    const file = files.cvFile;
    if (file && file.size > 0) {
      data.cvFileName = file.filename;
      data.cvFileSize = file.size;
      data.cvMimeType = file.mimeType;
      data._cvFile = file;
    } else {
      data.cvFileName = data.cvFileName || "";
      data.cvFileSize = Number(data.cvFileSize || 0);
    }
  }
  return data;
}

function validateLead(type, data) {
  const errors = {};
  if (data.companyWebsite) errors.form = "Spam protection triggered.";

  if (type === "contact") {
    if (!isPresent(data.name)) errors.name = "Full name is required.";
    if (!isEmail(data.email)) errors.email = "A valid email address is required.";
    if (!services.includes(data.serviceInterest)) errors.serviceInterest = "Choose a valid service.";
    if (!isPresent(data.message)) errors.message = "Message is required.";
    if (data.consent !== true) errors.consent = "Consent is required.";
  }

  if (type === "booking") {
    if (!services.filter((item) => item !== "Other").includes(data.serviceRequired)) errors.serviceRequired = "Choose a valid service.";
    if (!isPresent(data.name)) errors.name = "Full name is required.";
    if (!isEmail(data.email)) errors.email = "A valid email address is required.";
    if (!isPresent(data.phone)) errors.phone = "Phone number is required.";
    if (!isPresent(data.address)) errors.address = "Address is required.";
    if (!isPresent(data.postcode)) errors.postcode = "Postcode is required.";
    if (!isPresent(data.message)) errors.message = "Job details are required.";
    if (data.consent !== true) errors.consent = "Consent is required.";
  }

  if (type === "careers") {
    if (!isPresent(data.fullName)) errors.fullName = "Full name is required.";
    if (!isEmail(data.email)) errors.email = "A valid email address is required.";
    if (!isPresent(data.phone)) errors.phone = "Phone number is required.";
    if (!isPresent(data.postcode)) errors.postcode = "Postcode is required.";
    if (!isPresent(data.roleInterestedIn)) errors.roleInterestedIn = "Role is required.";
    if (!["Yes", "No"].includes(data.rightToWork)) errors.rightToWork = "Right to work answer is required.";
    if (!isPresent(data.availability)) errors.availability = "Availability is required.";
    if (data.privacyConsent !== true) errors.privacyConsent = "Consent is required.";
    validateCv(data, errors);
  }

  return errors;
}

function validateCv(data, errors) {
  if (!data.cvFileName && !data._cvFile) return;
  const ext = path.extname(data.cvFileName || "").toLowerCase();
  const allowed = cvTypes[ext];
  if (!allowed) errors.cvFileName = "CV must be PDF, DOC or DOCX.";
  if (Number(data.cvFileSize || 0) > maxCvSize) errors.cvFileSize = "CV must be 5MB or smaller.";
  if (data._cvFile && allowed && !allowed.includes(data._cvFile.mimeType)) {
    errors.cvFileName = "CV file type does not match an allowed document type.";
  }
}

async function createLeadRecord(type, data) {
  const record = {
    id: randomUUID(),
    type,
    status: "new",
    createdAt: new Date().toISOString(),
    source: data.source || data.sourcePage || "website",
    emailDeliveryStatus: "not_configured",
    ...withoutInternalFields(data)
  };
  if (type === "careers") {
    const retention = new Date();
    retention.setMonth(retention.getMonth() + 12);
    record.consentTimestamp = new Date().toISOString();
    record.retentionDeleteAt = retention.toISOString();
    if (data._cvFile) {
      const stored = await storeCv(record.id, data._cvFile);
      record.cvFileUrl = stored.url;
      record.cvFileKey = stored.key;
      record.cvStorageProvider = stored.provider;
    }
  }
  return record;
}

function withoutInternalFields(data) {
  const clone = { ...data };
  delete clone._cvFile;
  delete clone.companyWebsite;
  delete clone.sourcePage;
  return clone;
}

async function storeCv(leadId, file) {
  if ((process.env.CV_STORAGE_PROVIDER || "local").toLowerCase() === "s3") {
    return putS3Object(leadId, file);
  }
  fs.mkdirSync(privateUploadDir, { recursive: true });
  const key = `${leadId}-${Date.now()}-${file.filename.replace(/[^a-zA-Z0-9._-]/g, "_")}`;
  const filePath = path.join(privateUploadDir, key);
  fs.writeFileSync(filePath, file.buffer);
  return { provider: "local-private", key, url: `private://${key}` };
}

async function putS3Object(leadId, file) {
  const endpoint = requireEnv("S3_ENDPOINT");
  const region = process.env.S3_REGION || "auto";
  const bucket = requireEnv("S3_BUCKET");
  const accessKey = requireEnv("S3_ACCESS_KEY_ID");
  const secretKey = requireEnv("S3_SECRET_ACCESS_KEY");
  const key = `careers/${leadId}/${Date.now()}-${file.filename.replace(/[^a-zA-Z0-9._-]/g, "_")}`;
  const endpointUrl = new URL(endpoint);
  const host = endpointUrl.host;
  const pathname = `${endpointUrl.pathname.replace(/\/$/, "")}/${bucket}/${key}`.replace(/\/+/g, "/");
  const now = new Date();
  const amzDate = now.toISOString().replace(/[:-]|\.\d{3}/g, "");
  const dateStamp = amzDate.slice(0, 8);
  const payloadHash = sha256Hex(file.buffer);
  const canonicalHeaders = `host:${host}\nx-amz-content-sha256:${payloadHash}\nx-amz-date:${amzDate}\n`;
  const signedHeaders = "host;x-amz-content-sha256;x-amz-date";
  const canonicalRequest = ["PUT", pathname, "", canonicalHeaders, signedHeaders, payloadHash].join("\n");
  const credentialScope = `${dateStamp}/${region}/s3/aws4_request`;
  const stringToSign = ["AWS4-HMAC-SHA256", amzDate, credentialScope, sha256Hex(canonicalRequest)].join("\n");
  const signingKey = getSignatureKey(secretKey, dateStamp, region, "s3");
  const signature = crypto.createHmac("sha256", signingKey).update(stringToSign).digest("hex");
  const authorization = `AWS4-HMAC-SHA256 Credential=${accessKey}/${credentialScope}, SignedHeaders=${signedHeaders}, Signature=${signature}`;

  await request({
    method: "PUT",
    url: `${endpointUrl.protocol}//${host}${pathname}`,
    headers: {
      Authorization: authorization,
      "Content-Type": file.mimeType,
      "Content-Length": file.buffer.length,
      "x-amz-content-sha256": payloadHash,
      "x-amz-date": amzDate
    },
    body: file.buffer
  });
  return { provider: "s3", key, url: `s3://${bucket}/${key}` };
}

function sha256Hex(value) {
  return crypto.createHash("sha256").update(value).digest("hex");
}

function hmac(key, value) {
  return crypto.createHmac("sha256", key).update(value).digest();
}

function getSignatureKey(key, dateStamp, region, service) {
  const kDate = hmac(`AWS4${key}`, dateStamp);
  const kRegion = hmac(kDate, region);
  const kService = hmac(kRegion, service);
  return hmac(kService, "aws4_request");
}

function requireEnv(name) {
  if (!process.env[name]) throw new Error(`${name} is required`);
  return process.env[name];
}

async function storeLead(type, record) {
  const provider = (process.env.LEAD_STORAGE_PROVIDER || "jsonl").toLowerCase();
  if (provider === "supabase") await storeSupabase(type, record);
  else if (provider === "airtable") await storeAirtable(type, record);
  else if (provider === "webhook") await storeWebhook(type, record);
  else writeJsonl(type, record);

  if (provider !== "jsonl" && process.env.LEAD_BACKUP_JSONL !== "false") {
    writeJsonl(type, record);
  }
}

function writeJsonl(type, record) {
  fs.mkdirSync(dataDir, { recursive: true });
  fs.appendFileSync(path.join(dataDir, `${type}.jsonl`), `${JSON.stringify(record)}\n`);
}

async function storeSupabase(type, record) {
  const url = requireEnv("SUPABASE_URL");
  const key = requireEnv("SUPABASE_SERVICE_ROLE_KEY");
  const table = tableName(type);
  await request({
    method: "POST",
    url: `${url.replace(/\/$/, "")}/rest/v1/${table}`,
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
      Prefer: "return=minimal"
    },
    body: JSON.stringify(record)
  });
}

async function storeAirtable(type, record) {
  const baseId = requireEnv("AIRTABLE_BASE_ID");
  const token = requireEnv("AIRTABLE_API_KEY");
  const table = encodeURIComponent(process.env[`AIRTABLE_${type.toUpperCase()}_TABLE`] || defaultTableName(type));
  await request({
    method: "POST",
    url: `https://api.airtable.com/v0/${baseId}/${table}`,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ fields: flattenForAirtable(record) })
  });
}

async function storeWebhook(type, record) {
  await request({
    method: "POST",
    url: requireEnv("LEAD_WEBHOOK_URL"),
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ type, record })
  });
}

function tableName(type) {
  if (type === "contact") return process.env.SUPABASE_CONTACT_TABLE || "contact_enquiries";
  if (type === "booking") return process.env.SUPABASE_BOOKING_TABLE || "booking_leads";
  return process.env.SUPABASE_CAREERS_TABLE || "career_applications";
}

function defaultTableName(type) {
  return type === "contact" ? "contact_enquiries" : type === "booking" ? "booking_leads" : "career_applications";
}

function flattenForAirtable(record) {
  const flat = {};
  for (const [key, value] of Object.entries(record)) {
    flat[key] = value === null || value === undefined ? "" : typeof value === "object" ? JSON.stringify(value) : value;
  }
  return flat;
}

async function sendNotifications(type, record) {
  const provider = (process.env.EMAIL_PROVIDER || "none").toLowerCase();
  if (provider === "none") return { status: "not_configured" };

  const admin = buildAdminEmail(type, record);
  const confirmation = buildConfirmationEmail(type, record);
  const statuses = [];
  statuses.push(await sendEmail(provider, admin));
  if (confirmation.to) statuses.push(await sendEmail(provider, confirmation));
  return { status: statuses.every((item) => item.ok) ? "sent" : "failed", details: statuses };
}

function buildAdminEmail(type, record) {
  const label = type === "contact" ? "Contact enquiry" : type === "booking" ? "Booking request" : "Careers application";
  return {
    to: adminEmail,
    from: emailFrom,
    subject: `New CPMG ${label}: ${record.name || record.fullName || record.serviceRequired || record.roleInterestedIn}`,
    text: renderEmailText(label, record)
  };
}

function buildConfirmationEmail(type, record) {
  const to = record.email;
  if (!to) return {};
  const label = type === "careers" ? "application" : "enquiry";
  return {
    to,
    from: emailFrom,
    subject: `CPMG received your ${label}`,
    text: `Thank you for contacting CPMG.\n\nWe have received your ${label} and will respond as soon as possible.\n\nReference: ${record.id}\n\nCPMG Crown Property Management Group Ltd`
  };
}

function renderEmailText(label, record) {
  return [
    label,
    "",
    `Reference: ${record.id}`,
    `Created: ${record.createdAt}`,
    `Status: ${record.status}`,
    `Name: ${record.name || record.fullName || ""}`,
    `Email: ${record.email || ""}`,
    `Phone: ${record.phone || ""}`,
    `Service: ${record.serviceInterest || record.serviceRequired || ""}`,
    `Role: ${record.roleInterestedIn || ""}`,
    `Message: ${record.message || record.experience || ""}`,
    `Consent: ${record.consent || record.privacyConsent || false}`,
    `CV: ${record.cvFileUrl || ""}`
  ].join("\n");
}

async function sendEmail(provider, email) {
  try {
    if (provider === "resend") await sendResend(email);
    else if (provider === "sendgrid") await sendSendGrid(email);
    else if (provider === "mailgun") await sendMailgun(email);
    else if (provider === "smtp") await sendSmtp(email);
    else return { ok: false, provider, error: "Unknown email provider" };
    return { ok: true, provider, to: email.to };
  } catch (error) {
    return { ok: false, provider, to: email.to, error: error.message };
  }
}

async function sendResend(email) {
  await request({
    method: "POST",
    url: "https://api.resend.com/emails",
    headers: { Authorization: `Bearer ${requireEnv("RESEND_API_KEY")}`, "Content-Type": "application/json" },
    body: JSON.stringify({ from: email.from, to: [email.to], subject: email.subject, text: email.text })
  });
}

async function sendSendGrid(email) {
  await request({
    method: "POST",
    url: "https://api.sendgrid.com/v3/mail/send",
    headers: { Authorization: `Bearer ${requireEnv("SENDGRID_API_KEY")}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      personalizations: [{ to: [{ email: email.to }] }],
      from: parseEmailAddress(email.from),
      subject: email.subject,
      content: [{ type: "text/plain", value: email.text }]
    })
  });
}

async function sendMailgun(email) {
  const domain = requireEnv("MAILGUN_DOMAIN");
  const apiKey = requireEnv("MAILGUN_API_KEY");
  const body = new URLSearchParams({ from: email.from, to: email.to, subject: email.subject, text: email.text }).toString();
  await request({
    method: "POST",
    url: `https://api.mailgun.net/v3/${domain}/messages`,
    headers: {
      Authorization: `Basic ${Buffer.from(`api:${apiKey}`).toString("base64")}`,
      "Content-Type": "application/x-www-form-urlencoded",
      "Content-Length": Buffer.byteLength(body)
    },
    body
  });
}

function sendSmtp(email) {
  return new Promise((resolve, reject) => {
    const host = requireEnv("SMTP_HOST");
    const port = Number(process.env.SMTP_PORT || 465);
    const user = process.env.SMTP_USER || "";
    const pass = process.env.SMTP_PASS || "";
    const secure = process.env.SMTP_SECURE !== "false";
    const client = secure ? tls.connect(port, host, { servername: host }) : require("net").connect(port, host);
    const commands = [];
    const from = parseEmailAddress(email.from).email;
    const message = [
      `From: ${email.from}`,
      `To: ${email.to}`,
      `Subject: ${email.subject}`,
      "MIME-Version: 1.0",
      "Content-Type: text/plain; charset=utf-8",
      "",
      email.text
    ].join("\r\n");
    let buffer = "";
    let step = 0;

    function queue(command, hidden = false) {
      commands.push({ command, hidden });
    }
    queue(`EHLO ${process.env.SMTP_HELO || "cpmanagementgroup.co.uk"}`);
    if (user && pass) {
      queue("AUTH LOGIN");
      queue(Buffer.from(user).toString("base64"), true);
      queue(Buffer.from(pass).toString("base64"), true);
    }
    queue(`MAIL FROM:<${from}>`);
    queue(`RCPT TO:<${email.to}>`);
    queue("DATA");
    queue(`${message}\r\n.`);
    queue("QUIT");

    client.setTimeout(15000);
    client.on("data", (chunk) => {
      buffer += chunk.toString("utf8");
      if (!buffer.endsWith("\n")) return;
      const line = buffer.trim();
      buffer = "";
      if (/^[45]\d\d/.test(line)) {
        client.destroy();
        reject(new Error(`SMTP error: ${line}`));
        return;
      }
      const next = commands[step++];
      if (!next) return;
      client.write(`${next.command}\r\n`);
    });
    client.on("timeout", () => {
      client.destroy();
      reject(new Error("SMTP timed out"));
    });
    client.on("error", reject);
    client.on("end", resolve);
  });
}

function parseEmailAddress(value) {
  const match = String(value).match(/^(.*)<([^>]+)>$/);
  if (!match) return { email: String(value).trim() };
  return { name: match[1].trim(), email: match[2].trim() };
}

function request(options) {
  return new Promise((resolve, reject) => {
    const url = new URL(options.url);
    const client = url.protocol === "https:" ? https : http;
    const req = client.request({
      method: options.method || "GET",
      hostname: url.hostname,
      port: url.port || (url.protocol === "https:" ? 443 : 80),
      path: `${url.pathname}${url.search}`,
      headers: options.headers || {}
    }, (res) => {
      const chunks = [];
      res.on("data", (chunk) => chunks.push(chunk));
      res.on("end", () => {
        const body = Buffer.concat(chunks).toString("utf8");
        if (res.statusCode >= 200 && res.statusCode < 300) resolve({ statusCode: res.statusCode, body });
        else reject(new Error(`HTTP ${res.statusCode}: ${body.slice(0, 300)}`));
      });
    });
    req.on("error", reject);
    if (options.body) req.write(options.body);
    req.end();
  });
}

async function handleApi(req, res, type) {
  try {
    const { fields, files } = await readSubmission(req);
    const data = normalizeLead(type, fields, files);
    const errors = validateLead(type, data);
    if (Object.keys(errors).length) {
      sendJson(res, 400, { ok: false, message: "Please correct the highlighted fields.", errors });
      return;
    }

    const record = await createLeadRecord(type, data);
    const delivery = await sendNotifications(type, record);
    record.emailDeliveryStatus = delivery.status;
    record.emailDeliveryDetails = delivery.details || [];
    await storeLead(type, record);
    sendJson(res, 200, { ok: true, id: record.id, emailDeliveryStatus: record.emailDeliveryStatus, message: "Thank you. Your enquiry has been received." });
  } catch (error) {
    const badRequestMessages = ["Invalid JSON", "Missing multipart boundary", "Request body too large"];
    const status = badRequestMessages.includes(error.message) ? 400 : 500;
    sendJson(res, status, { ok: false, message: status === 400 ? error.message : "Unable to submit the form right now." });
  }
}

function readRecords(type) {
  const file = path.join(dataDir, `${type}.jsonl`);
  if (!fs.existsSync(file)) return [];
  return fs.readFileSync(file, "utf8").split(/\r?\n/).filter(Boolean).map((line) => JSON.parse(line));
}

function requireAdmin(req, res) {
  const url = new URL(req.url, "http://localhost");
  const token = process.env.ADMIN_TOKEN;
  if (!token) {
    sendJson(res, 503, { ok: false, message: "Admin API is not configured. Set ADMIN_TOKEN." });
    return false;
  }
  const auth = req.headers.authorization || "";
  if (auth !== `Bearer ${token}` && url.searchParams.get("token") !== token) {
    sendJson(res, 401, { ok: false, message: "Unauthorized" });
    return false;
  }
  return true;
}

function handleAdminLeads(req, res) {
  if (!requireAdmin(req, res)) return;
  sendJson(res, 200, {
    ok: true,
    leads: {
      contact: readRecords("contact"),
      booking: readRecords("booking"),
      careers: readRecords("careers")
    }
  });
}

function handleAdminExport(req, res) {
  if (!requireAdmin(req, res)) return;
  const rows = ["type,id,status,createdAt,email,phone,name,serviceOrRole,emailDeliveryStatus"];
  for (const type of ["contact", "booking", "careers"]) {
    for (const record of readRecords(type)) {
      rows.push([type, record.id, record.status, record.createdAt, record.email || "", record.phone || "", record.name || record.fullName || "", record.serviceInterest || record.serviceRequired || record.roleInterestedIn || "", record.emailDeliveryStatus || ""].map(csvCell).join(","));
    }
  }
  res.writeHead(200, {
    "Content-Type": "text/csv; charset=utf-8",
    "Content-Disposition": "attachment; filename=\"cpmg-leads.csv\""
  });
  res.end(rows.join("\n"));
}

async function handleAdminStatus(req, res) {
  if (!requireAdmin(req, res)) return;
  try {
    const body = await readJson(req);
    if (!["contact", "booking", "careers"].includes(body.type) || !body.id || !statusValues.includes(body.status)) {
      sendJson(res, 400, { ok: false, message: "Provide a valid type, id and status." });
      return;
    }
    const records = readRecords(body.type);
    const index = records.findIndex((record) => record.id === body.id);
    if (index === -1) {
      sendJson(res, 404, { ok: false, message: "Lead not found." });
      return;
    }
    records[index].status = body.status;
    records[index].updatedAt = new Date().toISOString();
    fs.mkdirSync(dataDir, { recursive: true });
    fs.writeFileSync(path.join(dataDir, `${body.type}.jsonl`), `${records.map((record) => JSON.stringify(record)).join("\n")}\n`);
    sendJson(res, 200, { ok: true, lead: records[index] });
  } catch (error) {
    sendJson(res, 500, { ok: false, message: error.message || "Unable to update lead status." });
  }
}

function csvCell(value) {
  return `"${String(value).replaceAll('"', '""')}"`;
}

function trackingHead() {
  const gtmId = cleanTrackingId(process.env.GTM_CONTAINER_ID, /^GTM-[A-Z0-9]+$/i);
  const gaId = gtmId ? "" : cleanTrackingId(process.env.GA_MEASUREMENT_ID, /^G-[A-Z0-9]+$/i);
  const config = { gtmId, gaId, consentRequired: process.env.COOKIE_CONSENT_REQUIRED !== "false" };
  const configScript = `<script>window.__CPMG_SITE_URL__=${JSON.stringify(siteUrl.replace(/\/$/, ""))};window.__CPMG_TRACKING_CONFIG__=${JSON.stringify(config)};</script>`;
  const consentDefault = gtmId || gaId
    ? `<script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('consent','default',{ad_storage:'denied',analytics_storage:'denied',ad_user_data:'denied',ad_personalization:'denied'});</script>`
    : "";
  if (gtmId) {
    return `${configScript}${consentDefault}<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${gtmId}');</script>`;
  }
  if (gaId) {
    return `${configScript}${consentDefault}`;
  }
  return configScript;
}

function trackingBody() {
  const gtmId = cleanTrackingId(process.env.GTM_CONTAINER_ID, /^GTM-[A-Z0-9]+$/i);
  if (!gtmId) return "";
  return `<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=${gtmId}" height="0" width="0" style="display:none;visibility:hidden" title="Google Tag Manager"></iframe></noscript>`;
}

function cleanTrackingId(value, pattern) {
  const candidate = String(value || "").trim();
  return pattern.test(candidate) ? candidate : "";
}

function metaForPath(routePath) {
  const map = {
    "/": ["Crown Property Management Group Ltd | Cleaning and Property Support", "Professional cleaning, property maintenance, grounds care and waste removal services for homes, landlords, businesses and property managers in Bristol and surrounding areas."],
    "/services/domestic": ["Domestic Cleaning Services | Crown Property Management Group Ltd", "Professional carpet cleaning, end of tenancy cleaning services, deep cleaning services for homes, landscaping and garden maintenance."],
    "/services/commercial": ["Commercial Cleaning and Property Support | Crown Property Management Group Ltd", "Commercial office cleaning, communal area cleaning, ground maintenance, waste removal and property support services for businesses and property managers."],
    "/about": ["About Crown Property Management Group Ltd", "Learn about Crown Property Management Group Ltd and its cleaning, property maintenance, grounds care and waste removal services in Bristol and surrounding areas."],
    "/careers": ["Careers | Crown Property Management Group Ltd", "Apply to work with Crown Property Management Group Ltd across cleaning, maintenance, grounds care, waste removal and property support roles."],
    "/contact": ["Contact Crown Property Management Group Ltd", "Contact Crown Property Management Group Ltd to enquire about cleaning, property maintenance, grounds care and waste removal services."],
    "/booking": ["Book a Service | Crown Property Management Group Ltd", "Request a cleaning, maintenance, grounds care or property support service from Crown Property Management Group Ltd."],
    "/privacy-policy": ["Privacy Policy | Crown Property Management Group Ltd", "Privacy policy for Crown Property Management Group Ltd covering UK GDPR, enquiry data, booking data, careers applications, cookies and analytics."],
    "/terms-and-conditions": ["Terms and Conditions | Crown Property Management Group Ltd", "Terms and conditions for Crown Property Management Group Ltd cleaning, maintenance and property support services."],
    "/services/domestic/carpet-cleaning": ["Carpet Cleaning | Crown Property Management Group Ltd", "Professional carpet cleaning using hot-water extraction, steam cleaning, stain treatment and child and pet-safe products."],
    "/services/domestic/end-of-tenancy-cleaning": ["End of Tenancy Cleaning | Crown Property Management Group Ltd", "End of tenancy cleaning services for tenants, landlords, estate agents and property managers to landlord and letting agent standards."],
    "/services/domestic/deep-cleaning": ["Deep Cleaning | Crown Property Management Group Ltd", "Deep cleaning services for homes that need a full refresh, including hard-to-reach areas and built-up grime."],
    "/services/domestic/landscaping-and-garden": ["Landscaping and Garden Services | Crown Property Management Group Ltd", "Landscaping and garden maintenance including lawn mowing, hedge trimming, patio cleaning and garden waste removal."],
    "/services/commercial/office-cleaning": ["Office Cleaning | Crown Property Management Group Ltd", "Commercial office cleaning for desks, workstations, kitchens, bathrooms and high-touch surfaces."],
    "/services/commercial/communal-area-cleaning": ["Communal Area Cleaning | Crown Property Management Group Ltd", "Scheduled cleaning for hallways, stairwells, lobbies, communal kitchens and bin stores."],
    "/services/commercial/window-cleaning": ["Window Cleaning | Crown Property Management Group Ltd", "Interior and exterior commercial window cleaning using purified water and water-fed pole systems where suitable."],
    "/services/commercial/fire-alarm-callout": ["Fire Alarm Callout | Crown Property Management Group Ltd", "Fire alarm callout support for commercial property safety, testing, inspection and fault diagnosis."],
    "/services/commercial/ground-maintenance": ["Ground Maintenance | Crown Property Management Group Ltd", "Commercial estate grounds care, lawn care, hedge maintenance, litter picking, gritting and seasonal support."],
    "/services/commercial/waste-removal": ["Waste Removal | Crown Property Management Group Ltd", "Responsible household and commercial waste removal with same-day or next-day slots where possible."],
    "/services/commercial/sparkle-cleaning": ["Sparkle Cleaning | Crown Property Management Group Ltd", "Show-home standard cleaning for new builds, sales suites, viewings and post-construction handover."]
  };
  const [title, description] = map[routePath] || map["/"];
  return { title, description, canonical: `${siteUrl.replace(/\/$/, "")}${routePath === "/" ? "/" : routePath}` };
}

function renderIndexHtml(routePath = "/") {
  const meta = metaForPath(routePath);
  const html = fs.readFileSync(path.join(root, "index.html"), "utf8");
  return html
    .replaceAll("https://www.cpmanagementgroup.co.uk", siteUrl.replace(/\/$/, ""))
    .replace(/<title>.*?<\/title>/, `<title>${escapeHtml(meta.title)}</title>`)
    .replace(/<meta name="description" content="[^"]*" \/>/, `<meta name="description" content="${escapeHtml(meta.description)}" />`)
    .replace(/<link rel="canonical" href="[^"]*" \/>/, `<link rel="canonical" href="${meta.canonical}" />`)
    .replace(/<meta property="og:title" content="[^"]*" \/>/, `<meta property="og:title" content="${escapeHtml(meta.title)}" />`)
    .replace(/<meta property="og:description" content="[^"]*" \/>/, `<meta property="og:description" content="${escapeHtml(meta.description)}" />`)
    .replace(/<meta property="og:url" content="[^"]*" \/>/, `<meta property="og:url" content="${meta.canonical}" />`)
    .replace("<!-- CPMG_TRACKING_HEAD -->", trackingHead())
    .replace("<!-- CPMG_TRACKING_BODY -->", trackingBody());
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" }[char]));
}

function sendHtml(res, status, html, extraHeaders = {}) {
  res.writeHead(status, securityHeaders({ "Content-Type": "text/html; charset=utf-8", ...extraHeaders }));
  res.end(html);
}

const server = http.createServer((req, res) => {
  const url = new URL(req.url, "http://localhost");
  if (url.pathname.length > 1 && url.pathname.endsWith("/")) {
    res.writeHead(301, securityHeaders({ Location: url.pathname.replace(/\/+$/, "") + url.search }));
    res.end();
    return;
  }
  if (req.method === "POST" && url.pathname === "/api/contact") return handleApi(req, res, "contact");
  if (req.method === "POST" && url.pathname === "/api/booking") return handleApi(req, res, "booking");
  if (req.method === "POST" && url.pathname === "/api/careers") return handleApi(req, res, "careers");
  if (req.method === "GET" && url.pathname === "/api/admin/leads") return handleAdminLeads(req, res);
  if (req.method === "GET" && url.pathname === "/api/admin/export") return handleAdminExport(req, res);
  if (req.method === "POST" && url.pathname === "/api/admin/status") return handleAdminStatus(req, res);

  let filePath = path.join(root, decodeURIComponent(url.pathname));
  const requestedRelative = path.relative(root, filePath);
  const requestedFirstSegment = requestedRelative.split(path.sep)[0];
  if (requestedRelative.startsWith("..") || path.isAbsolute(requestedRelative) || [".git", "data", "private_uploads"].includes(requestedFirstSegment) || [".env", ".env.local"].includes(path.basename(filePath))) {
    res.writeHead(403);
    res.end("Forbidden");
    return;
  }
  if (url.pathname === "/" || !path.extname(filePath)) {
    if (publicRoutes.has(url.pathname)) {
      const noIndex = url.pathname === "/admin" ? { "X-Robots-Tag": "noindex, nofollow" } : {};
      sendHtml(res, 200, renderIndexHtml(url.pathname), noIndex);
      return;
    }
    fs.readFile(path.join(root, "404.html"), "utf8", (notFoundErr, notFound) => {
      if (notFoundErr) {
        res.writeHead(404, securityHeaders({ "Content-Type": "text/plain; charset=utf-8" }));
        res.end("Not found");
        return;
      }
      sendHtml(res, 404, notFound);
    });
    return;
  }
  const relative = path.relative(root, filePath);
  const firstSegment = relative.split(path.sep)[0];
  if (relative.startsWith("..") || path.isAbsolute(relative) || [".git", "data", "private_uploads"].includes(firstSegment) || [".env", ".env.local"].includes(path.basename(filePath))) {
    res.writeHead(403);
    res.end("Forbidden");
    return;
  }
  fs.readFile(filePath, (err, data) => {
    if (err) {
      fs.readFile(path.join(root, "404.html"), (fallbackErr, fallback) => {
        if (fallbackErr) {
          res.writeHead(404, securityHeaders({ "Content-Type": "text/plain; charset=utf-8" }));
          res.end("Not found");
          return;
        }
        res.writeHead(404, securityHeaders({ "Content-Type": "text/html; charset=utf-8" }));
        res.end(fallback);
      });
      return;
    }
    res.writeHead(200, securityHeaders({ "Content-Type": types[path.extname(filePath)] || "application/octet-stream" }));
    res.end(data);
  });
});

const port = process.env.PORT || 4173;
server.listen(port, () => console.log(`CPMG site running at http://localhost:${port}`));
