# Learntopia Gemini Proxy (Cloudflare Worker)

A tiny Cloudflare Worker that proxies AI Tutor calls to the Google Gemini API. The
Gemini API key lives here as a Worker **secret** and never ships in the client
bundle. The app calls this Worker's URL (set as `VITE_GEMINI_PROXY_URL`).

## Deploy (one-time, free)

From this `worker/` folder:

```bash
# 1. Log in to the Cloudflare account
npx wrangler login

# 2. Store the Gemini key as a secret (prompts for the value; never committed)
npx wrangler secret put GEMINI_API_KEY

# 3. Deploy
npx wrangler deploy
```

`wrangler deploy` prints the Worker URL, e.g. `https://learntopia-gemini-proxy.<subdomain>.workers.dev`.

## Wire it to the app

1. Set `VITE_GEMINI_PROXY_URL` to that URL in the app's local `.env` **and** as a
   GitHub Actions secret (so production builds use it).
2. Remove `VITE_GEMINI_API_KEY` from the app's `.env` and GitHub secrets — the app
   no longer needs it.
3. **Rotate the old key** (it was public in earlier builds): create a new Gemini
   key, run `npx wrangler secret put GEMINI_API_KEY` again with the new value, and
   delete the old key in Google AI Studio.

## Allowed origins

Edit `ALLOWED_ORIGINS` in `worker.js` if the app's domain changes. Only listed
origins may call the proxy (CORS). Firebase App Check verification is a planned
follow-up for stronger protection.
