import { Page, expect } from '@playwright/test';

export class AccountsPage {
  constructor(private page: Page) {}

  async navigateToAccountsOverview() {
    await this.page.click('text=Accounts Overview');
  }

  async assertAccountsVisible() {
    await expect(this.page.locator('#accountTable')).toBeVisible();
  }
}