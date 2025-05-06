// 📂 playwright.config copy.ts
import { defineConfig, devices } from '@playwright/test';
import { on } from 'events';

/**
 * Playwright configuration file
 * Defines global test settings and behaviors
 */
export default defineConfig({
  testDir: './tests', // Location of test files
  timeout: 30000,     // Global test timeout (30 seconds)
  retries: 1,         // Retry failed tests once
  workers: 2,         // Run tests in parallel (3 at a time)
  
  // Reporting configuration
  reporter: [
    ['html', { open: 'never' }] // Generate HTML report (don't auto-open)
  ],
  
  // Shared settings for all tests
  use: {
    headless: false,            // Show browser during execution
    screenshot: 'only-on-failure', // Capture screenshots on failures
    trace: 'retain-on-failure', // Record traces for failed tests
    Video:on                     //Record video
  },
  
  // Browser configurations
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] }, // Chrome browser
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] }, // Firefox browser
    },
  ],
});