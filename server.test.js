"use strict";

const { test } = require("node:test");
const assert = require("node:assert/strict");
const http = require("http");
const { spawn } = require("child_process");
const path = require("path");
const { health } = require("./server");

test("health() returns ok", () => {
  const body = health();
  assert.equal(body.status, "ok");
  assert.equal(typeof body.app, "string");
  assert.equal(body.mesh, "ambient");
});

async function withServer(port, fn) {
  const child = spawn(process.execPath, [path.join(__dirname, "server.js")], {
    env: { ...process.env, PORT: String(port) },
    stdio: ["ignore", "pipe", "pipe"],
  });
  await new Promise((resolve) => setTimeout(resolve, 400));
  try {
    await fn();
  } finally {
    child.kill("SIGTERM");
  }
}

function getJson(url) {
  return new Promise((resolve, reject) => {
    http
      .get(url, (res) => {
        let data = "";
        res.on("data", (c) => (data += c));
        res.on("end", () => resolve(JSON.parse(data)));
      })
      .on("error", reject);
  });
}

test("GET /health returns ok", async () => {
  await withServer(3098, async () => {
    const body = await getJson("http://127.0.0.1:3098/health");
    assert.equal(body.status, "ok");
    assert.equal(body.mesh, "ambient");
  });
});

test("GET /api returns service payload", async () => {
  await withServer(3097, async () => {
    const body = await getJson("http://127.0.0.1:3097/api");
    assert.equal(body.service, "nodejstest");
    assert.equal(body.message, "ok");
    assert.equal(body.mesh, "ambient");
  });
});
