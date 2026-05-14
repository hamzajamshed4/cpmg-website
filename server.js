const http = require("http");
const fs = require("fs");
const path = require("path");
const { randomUUID } = require("crypto");

const root = __dirname;
const dataDir = path.join(root, "data");
const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".png": "image/png",
  ".xml": "application/xml; charset=utf-8",
  ".txt": "text/plain; charset=utf-8"
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

function sendJson(res, status, body) {
  res.writeHead(status, { "Content-Type": "application/json; charset=utf-8" });
  res.end(JSON.stringify(body));
}

function readJson(req) {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
      if (body.length > 100000) {
        reject(new Error("Request body too large"));
        req.destroy();
      }
    });
    req.on("end", () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch {
        reject(new Error("Invalid JSON"));
      }
    });
    req.on("error", reject);
  });
}

function isEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value || ""));
}

function isPresent(value) {
  return typeof value === "string" && value.trim().length > 0;
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
    if (data.cvFileName && !/\.(pdf|doc|docx)$/i.test(data.cvFileName)) errors.cvFileName = "CV must be PDF, DOC or DOCX.";
    if (Number(data.cvFileSize || 0) > 5 * 1024 * 1024) errors.cvFileSize = "CV must be 5MB or smaller.";
  }

  return errors;
}

function storeLead(type, data) {
  fs.mkdirSync(dataDir, { recursive: true });
  const record = {
    id: randomUUID(),
    type,
    status: "new",
    createdAt: new Date().toISOString(),
    ...data
  };
  if (type === "careers") {
    const retention = new Date();
    retention.setMonth(retention.getMonth() + 12);
    record.consentTimestamp = new Date().toISOString();
    record.retentionDeleteAt = retention.toISOString();
  }
  fs.appendFileSync(path.join(dataDir, `${type}.jsonl`), `${JSON.stringify(record)}\n`);
  return record;
}

async function handleApi(req, res, type) {
  try {
    const data = await readJson(req);
    const errors = validateLead(type, data);
    if (Object.keys(errors).length) {
      sendJson(res, 400, { ok: false, message: "Please correct the highlighted fields.", errors });
      return;
    }
    const record = storeLead(type, data);
    sendJson(res, 200, { ok: true, id: record.id, message: "Thank you. Your enquiry has been received." });
  } catch (error) {
    sendJson(res, 500, { ok: false, message: error.message || "Unable to submit the form right now." });
  }
}

const server = http.createServer((req, res) => {
  const url = new URL(req.url, "http://localhost");
  if (req.method === "POST" && url.pathname === "/api/contact") return handleApi(req, res, "contact");
  if (req.method === "POST" && url.pathname === "/api/booking") return handleApi(req, res, "booking");
  if (req.method === "POST" && url.pathname === "/api/careers") return handleApi(req, res, "careers");

  let filePath = path.join(root, decodeURIComponent(url.pathname));
  if (url.pathname === "/" || !path.extname(filePath)) filePath = path.join(root, "index.html");
  if (!filePath.startsWith(root)) {
    res.writeHead(403);
    res.end("Forbidden");
    return;
  }
  fs.readFile(filePath, (err, data) => {
    if (err) {
      fs.readFile(path.join(root, "index.html"), (fallbackErr, fallback) => {
        if (fallbackErr) {
          res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
          res.end("Not found");
          return;
        }
        res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
        res.end(fallback);
      });
      return;
    }
    res.writeHead(200, { "Content-Type": types[path.extname(filePath)] || "application/octet-stream" });
    res.end(data);
  });
});

const port = process.env.PORT || 4173;
server.listen(port, () => console.log(`CPMG site running at http://localhost:${port}`));
