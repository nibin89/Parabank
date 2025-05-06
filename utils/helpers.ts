// 📂 utils/helpers.ts
import { Page,expect } from '@playwright/test';

/**
 * Reusable helper functions
 * Contains common utilities for tests
 */
export async function waitForSuccessToast(page: Page) {
  // Waits for success toast message to appear
  // Throws error if not visible within 5 seconds
  await page.waitForSelector('.toast-success', { timeout: 5000 });
}

/**
 * Custom assertion utilities
 * Extends Playwright's built-in assertions
 */
export async function assertUrlContains(page: Page, text: string) {
  // Verifies current URL contains specified text
  await expect(page).toHaveURL(new RegExp(text));
}