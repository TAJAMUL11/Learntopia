// Error monitoring (Sentry) — DORMANT until a DSN is configured.
//
// This wrapper is intentionally a no-op when VITE_SENTRY_DSN is not set, so the
// app behaves identically with or without monitoring. Sentry is loaded via a
// dynamic import ONLY when a DSN exists, so it never enters the bundle for
// builds that don't use it.
//
// To activate (owner account, later): create a React project at sentry.io,
// copy its DSN, and set VITE_SENTRY_DSN (locally in .env and as a GitHub
// secret). No code change needed — this picks it up automatically in prod.
//
// The DSN is public-safe: it can only SEND events, never read your data. It is
// not a secret in the way the Firebase/Gemini keys are.

const DSN = import.meta.env.VITE_SENTRY_DSN;

// Only in a production build AND only when a DSN is provided. This keeps local
// dev and any DSN-less deploy completely free of Sentry.
const ENABLED = Boolean(DSN) && import.meta.env.PROD;

let sentry = null;

export async function initMonitoring() {
  if (!ENABLED) return;
  try {
    const Sentry = await import("@sentry/react");
    Sentry.init({
      dsn: DSN,
      environment: import.meta.env.MODE,
      // Conservative sampling to stay well within the free tier.
      tracesSampleRate: 0.1,
      // Don't send default PII (IP address etc.) for a kid-facing app.
      sendDefaultPii: false,
      // Drop non-actionable noise that comes from browser extensions on a
      // visitor's machine, not from our code. "Object Not Found Matching Id"
      // is thrown by Outlook/Editor-style content scripts; the ResizeObserver
      // lines are benign layout notifications no browser treats as real errors.
      ignoreErrors: [
        "Object Not Found Matching Id",
        "ResizeObserver loop limit exceeded",
        "ResizeObserver loop completed with undelivered notifications",
        // Injected in-app-browser / extension scripts (Samsung Internet, FB/IG
        // WebViews) running their own document.onclick handlers — not our code.
        "onShow is not defined",
        "onHide is not defined",
        /className\.indexOf is not a function/,
        // Third-party DOM mutation (translation extensions) vs React. Guarded in
        // domGuards.js so it no longer crashes; not actionable on our side.
        "The node to be removed is not a child of this node",
        "The node before which the new node is to be inserted is not a child of this node",
      ],
      // Ignore anything whose stack originates in an extension bundle.
      denyUrls: [
        /^chrome-extension:\/\//i,
        /^moz-extension:\/\//i,
        /^safari-(web-)?extension:\/\//i,
      ],
    });
    sentry = Sentry;
  } catch (err) {
    // Monitoring must never break the app. Swallow any load/init failure.
    console.error("Monitoring init failed (non-fatal):", err);
  }
}

// Report a caught error (e.g. from a React error boundary). No-op until Sentry
// is initialized, so it is always safe to call.
export function reportError(error, context) {
  if (!sentry) return;
  try {
    sentry.captureException(error, context ? { extra: context } : undefined);
  } catch {
    /* never let reporting throw */
  }
}
