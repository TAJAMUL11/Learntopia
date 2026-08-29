// @ts-check
import { defineConfig, devices } from '@playwright/test';

/**
 * Playwright config for Learntopia end-to-end tests.
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  // Fail CI if a `test.only` was left in the source.
  forbidOnly: !!process.env.CI,
  // Retry flaky tests on CI only.
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    // Tests can use relative URLs like page.goto('/') against this base.
    baseURL: 'http://localhost:5173',
    // Capture a debug trace when a test is retried.
    trace: 'on-first-retry',
  },

  // Start with Chromium only — fast and simple. Firefox/WebKit can be added later.
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
  ],

  // Boot the Vite dev server before tests (or reuse one already running locally),
  // and wait until it responds. On CI it always starts a fresh server.
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:5173',
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000,
  },
});
