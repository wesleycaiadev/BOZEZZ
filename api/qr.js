"use strict";

const DEFAULT_DESTINATION = "https://bozezz.vercel.app/";

module.exports = function qrRedirect(_request, response) {
  const configuredDestination = (process.env.QR_REDIRECT_URL || "").trim();
  let destination;

  try {
    destination = new URL(configuredDestination || DEFAULT_DESTINATION);
    if (destination.protocol !== "https:" && destination.protocol !== "http:") {
      throw new Error("The QR destination must be an absolute HTTP(S) URL.");
    }
  } catch {
    response.writeHead(500, { "Cache-Control": "no-store" });
    response.end();
    return;
  }

  response.writeHead(307, {
    Location: destination.href,
    "Cache-Control": "no-store",
  });
  response.end();
};
