import { test, expect } from "@playwright/test";

// Regression net for the V2 clay redesign. Two things it guarantees on the
// public pages:
//   1. No page crashes (uncaught exceptions).
//   2. No leaked i18n keys — the exact class of bug we hit during the redesign
//      (e.g. "courseData.1.short", "home.ctaBtn" rendering raw instead of text).
// It walks the routes a logged-out visitor can reach; auth-gated pages
// (dashboard, course detail) are covered by later, sign-in-flow specs.

// A leaked key looks like `namespace.something` from one of our dictionaries.
const KEY_LEAK =
  /\b(home|hero|quiz|thankYou|nav|common|courses|dashboard|profileSetup|toasts|gamification|courseData|contact|footer|leaderboard|profile|aiTutor|exerciseEngine|notFound)\.[a-zA-Z][a-zA-Z0-9]/;

const PUBLIC_ROUTES = ["/", "/courses", "/quiz", "/contact", "/login", "/signUp"];

for (const route of PUBLIC_ROUTES) {
  test(`${route} renders without crashes or raw i18n keys`, async ({ page }) => {
    const errors = [];
    page.on("pageerror", (e) => errors.push(e.message));

    // domcontentloaded (not 'load') so slow images/fonts on a WSL /mnt/c dev
    // server can't stall the test; then wait for the app shell to actually mount.
    await page.goto(route, { waitUntil: "domcontentloaded" });
    // The Robo-Py logo is in the navbar on every page — a reliable "React mounted"
    // signal that also replaces the initial loading splash.
    await expect(page.getByRole("img", { name: /learntopia/i }).first()).toBeVisible();
    const text = await page.locator("body").innerText();
    expect(text.trim().length, `no content rendered on ${route}`).toBeGreaterThan(20);

    // No raw translation keys on screen.
    expect(text, `raw i18n key leaked on ${route}`).not.toMatch(KEY_LEAK);
    // No uncaught runtime errors.
    expect(errors, `uncaught error on ${route}: ${errors.join(" | ")}`).toHaveLength(0);
  });
}

test.describe("home page", () => {
  test("hero, featured courses and CTAs render", async ({ page }) => {
    await page.goto("/", { waitUntil: "domcontentloaded" });
    // Hero headline.
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    // Featured course section renders its cards (each has a "Start" action).
    await expect(page.getByRole("button", { name: /start/i }).first()).toBeVisible();
    // Browse-all CTA links onward.
    await expect(page.getByRole("button", { name: /browse all courses/i })).toBeVisible();
    // The Robo-Py logo mark is present in the navbar.
    await expect(page.getByRole("img", { name: /learntopia/i }).first()).toBeVisible();
  });
});
