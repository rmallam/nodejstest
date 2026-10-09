#!/usr/bin/env node
"use strict";

const http = require("http");

const port = Number(process.env.PORT || 3000);
const appName = "nodejstest";

function health() {
  return { status: "ok", app: appName, mesh: "ambient" };
}

function api() {
  return {
    service: appName,
    message: "ok",
    mesh: "ambient",
    ts: new Date().toISOString(),
  };
}

const page = () => `<!doctype html>
<html><head><meta charset="utf-8"><title>${appName}</title></head>
<body style="font-family:sans-serif;margin:2rem;max-width:42rem">
  <h1>${appName}</h1>
  <p>Node.js golden-path service with Jenkins, Helm, and Sonar</p>
  <p>Golden path: Jenkins → Sonar → Helm. Mesh: ambient.</p>
</body></html>`;

const server = http.createServer((req, res) => {
  const url = (req.url || "/").split("?")[0];
  if (url === "/health") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(health()));
    return;
  }
  if (url === "/api") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(api()));
    return;
  }
  res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
  res.end(page());
});

if (require.main === module) {
  server.listen(port, "0.0.0.0", () => {
    console.log(`${appName} listening on http://0.0.0.0:${port}`);
  });
}

module.exports = { health, api, server };
