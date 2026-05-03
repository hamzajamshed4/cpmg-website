const http = require("http");
const fs = require("fs");
const path = require("path");

const root = __dirname;
const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".png": "image/png",
  ".xml": "application/xml; charset=utf-8",
  ".txt": "text/plain; charset=utf-8"
};

const server = http.createServer((req, res) => {
  const url = new URL(req.url, "http://localhost");
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
        res.writeHead(fallbackErr ? 404 : 200, { "Content-Type": fallbackErr ? "text/plain" : "text/html; charset=utf-8" });
        res.end(fallbackErr ? "Not found" : fallback);
      });
      return;
    }
    res.writeHead(200, { "Content-Type": types[path.extname(filePath)] || "application/octet-stream" });
    res.end(data);
  });
});

const port = process.env.PORT || 4173;
server.listen(port, () => console.log(`CPMG site running at http://localhost:${port}`));
