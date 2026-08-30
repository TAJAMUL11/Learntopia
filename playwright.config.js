// @ts-check
import { defineConfig, devices } from '@playwright/test';

/**
 * Playwright config for Learntopia end-to-end tests.
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  // Headroom for slow first paints when the dev server runs from a WSL /mnt/c
  // mount under parallel load. The specs still wait on DOM+mount, not on 'load'.
  timeout: 45 * 1000,
  // Fail CI if a `test.only` was left in the source.
  forbidOnly: !!process.env.CI,
  // Retry flaky tests on CI only.
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  // 'list' prints each test live in the terminal; the html report is still
  // generated but NOT auto-served (open:'never'), so the run never blocks the
  // terminal waiting on the report server. View it later with:
  //   npx playwright show-report
  reporter: [['list'], ['html', { open: 'never' }]],
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
