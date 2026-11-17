const assert = require("node:assert/strict");
const { readFileSync } = require("node:fs");
const http = require("node:http");
const path = require("node:path");
const { test } = require("node:test");
const qrRedirect = require("../api/qr.js");

test("redirecionamento HTTP da rota /qr", async (t) => {
  const originalDestination = process.env.QR_REDIRECT_URL;
  const config = JSON.parse(readFileSync(path.join(__dirname, "..", "vercel.json"), "utf8"));
  assert(config.rewrites.some((rule) => rule.source === "/qr" && rule.destination === "/api/qr"));

  const server = http.createServer(qrRedirect);
  t.after(async () => {
    if (originalDestination === undefined) delete process.env.QR_REDIRECT_URL;
    else process.env.QR_REDIRECT_URL = originalDestination;
    server.closeAllConnections();
    await new Promise((resolve, reject) => server.close((error) => error ? reject(error) : resolve()));
  });
  await new Promise((resolve, reject) => {
    server.once("error", reject);
    server.listen(0, "127.0.0.1", resolve);
  });
  const endpoint = `http://127.0.0.1:${server.address().port}/qr`;

  await t.test("GET retorna 307 e Location padrão, sem HTML ou corpo", async () => {
    delete process.env.QR_REDIRECT_URL;
    const response = await fetch(endpoint, { redirect: "manual" });
    assert.equal(response.status, 307);
    assert.equal(response.headers.get("location"), "https://bozezz.vercel.app/");
    assert.equal(response.headers.get("cache-control"), "no-store");
    assert.equal(await response.text(), "");
  });

  await t.test("lê a variável a cada requisição e conserva o destino completo", async () => {
    for (const destination of ["https://example.com/agendar?origem=qr", "https://example.org/novo-destino#horarios"]) {
      process.env.QR_REDIRECT_URL = destination;
      const response = await fetch(endpoint, { redirect: "manual" });
      assert.equal(response.status, 307);
      assert.equal(response.headers.get("location"), destination);
      assert.equal(await response.text(), "");
    }
  });

  await t.test("HEAD também responde 307, sem corpo", async () => {
    process.env.QR_REDIRECT_URL = "https://bozezz.vercel.app/";
    const response = await fetch(endpoint, { method: "HEAD", redirect: "manual" });
    assert.equal(response.status, 307);
    assert.equal(response.headers.get("location"), "https://bozezz.vercel.app/");
    assert.equal(await response.text(), "");
  });

  await t.test("parâmetros da URL não alteram o destino configurado", async () => {
    process.env.QR_REDIRECT_URL = "https://example.com/destino-oficial";
    const response = await fetch(`${endpoint}?url=https://example.net/outro`, { redirect: "manual" });
    assert.equal(response.status, 307);
    assert.equal(response.headers.get("location"), "https://example.com/destino-oficial");
    await response.text();
  });

  await t.test("variável vazia utiliza o padrão", async () => {
    process.env.QR_REDIRECT_URL = "   ";
    const response = await fetch(endpoint, { redirect: "manual" });
    assert.equal(response.status, 307);
    assert.equal(response.headers.get("location"), "https://bozezz.vercel.app/");
    await response.text();
  });

  await t.test("configuração inválida não envia Location nem página intermediária", async () => {
    for (const destination of ["not-a-url", "/caminho-relativo", "javascript:alert(1)"]) {
      process.env.QR_REDIRECT_URL = destination;
      const response = await fetch(endpoint, { redirect: "manual" });
      assert.equal(response.status, 500);
      assert.equal(response.headers.get("location"), null);
      assert.equal(response.headers.get("cache-control"), "no-store");
      assert.equal(await response.text(), "");
    }
  });
});
