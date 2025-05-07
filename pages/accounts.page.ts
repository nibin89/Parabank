import { Page, expect } from '@playwright/test';

export class AccountsPage {
  constructor(private page: Page) {}

  async navigateToAccountsOverview() {
    await this.page.click('text=Accounts Overview');
  }

  async assertAccountsVisible() {
    await expect(this.page.locator('#accountTable')).toBeVisible();
  }

  // Get list of all account IDs
  async getAccountIds() {
    const rows = this.page.locator('#accountTable tbody tr')
    const count = await rows.count();
    const ids: (string | null)[] = [];
    for (let i = 0; i < count; i++) {
      const link = rows.nth(i).locator('td a');
      if (await link.count()) {
        ids.push(await link.first().innerText());
      }
    }
  
    return ids;
  }
    // Open specific account by ID
    async openAccount(accountId: string) {
      await this.page.click(`text=${accountId}`);
    }
 // Get account balance
 async getAccountBalance(accountId: string) {
  const row = this.page.locator(`tr:has-text("${accountId}")`);
  return await row.locator('td').nth(2).textContent();
}
}