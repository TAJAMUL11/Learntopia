/**
 * Learntopia Gemini proxy (Cloudflare Worker).
 *
 * The Gemini API key lives ONLY here, as a Worker secret (GEMINI_API_KEY) — it
 * never ships in the client bundle. The browser calls this Worker with a model
 * name and a request body; the Worker forwards the call to the Generative
 * Language API with the key attached, and returns Gemini's response verbatim.
 *
 * Protection: requests are only accepted from the app's own origins (CORS
 * allowlist below). Firebase App Check verification is a planned follow-up.
 *
 * Deploy: see worker/README.md.
 */

const ALLOWED_ORIGINS = [
  "https://learntopia-react.web.app",
  "https://learntopia-react.firebaseapp.com",
  "http://localhost:5173",
  "http://localhost:5174",
  "http://localhost:5175",
];

// Models the client is allowed to request (mirrors src/services/geminiService.js).
const ALLOWED_MODELS = new Set([
  "gemini-3.6-flash",
  "gemini-3.5-flash",
  "gemini-3.1-flash-lite",
]);

function corsHeaders(origin) {
  return {
    "Access-Control-Allow-Origin": ALLOWED_ORIGINS.includes(origin) ? origin : "null",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    Vary: "Origin",
  };
}

function jsonResponse(obj, status, origin) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: { ...corsHeaders(origin), "Content-Type": "application/json" },
  });
}

export default {
  async fetch(request, env) {
    const origin = request.headers.get("Origin") || "";

    // CORS preflight.
    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders(origin) });
    }
    if (request.method !== "POST") {
      return jsonResponse({ error: "Method not allowed" }, 405, origin);
    }
    // Only our own app may call the proxy.
    if (!ALLOWED_ORIGINS.includes(origin)) {
      return jsonResponse({ error: "Forbidden origin" }, 403, origin);
    }
    if (!env.GEMINI_API_KEY) {
      return jsonResponse({ error: "Proxy misconfigured: missing GEMINI_API_KEY secret" }, 500, origin);
    }

    let payload;
    try {
      payload = await request.json();
    } catch {
      return jsonResponse({ error: "Invalid JSON body" }, 400, origin);
    }

    const model = ALLOWED_MODELS.has(payload?.model) ? payload.model : "gemini-3.6-flash";
    const body = payload?.body;
    if (!body || typeof body !== "object") {
      return jsonResponse({ error: "Missing request body" }, 400, origin);
    }

    const url = `https://generativelanguage.googleapis.com/v1/models/${model}:generateContent?key=${env.GEMINI_API_KEY}`;

    try {
      const upstream = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const text = await upstream.text();
      // Pass Gemini's status + JSON straight through so the client keeps its
      // existing handling (rate limits, safety blocks, model fallback).
      return new Response(text, {
        status: upstream.status,
        headers: { ...corsHeaders(origin), "Content-Type": "application/json" },
      });
    } catch {
      return jsonResponse({ error: "Upstream request failed" }, 502, origin);
    }
  },
};
