// apps/api/server.js
// Clean Node.js API server with CORS support

import http from "node:http";

const PORT = process.env.PORT || 8787;

// Basic HTTP server with CORS
const server = http.createServer((req, res) => {
  // CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  
  if (req.method === "OPTIONS") {
    res.statusCode = 204;
    return res.end();
  }

  // Health check endpoint
  if (req.url === "/health") {
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    return res.end(JSON.stringify({ ok: true }));
  }

  // Default 404
  res.statusCode = 404;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.end(JSON.stringify({ error: "Not found" }));
});

server.listen(PORT, () => {
  console.log(`API listening on http://localhost:${PORT}`);
});
