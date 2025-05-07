// 📂 pages/transfer.page.ts
import { Page, expect } from '@playwright/test';

export class TransferPage {
  constructor(public page: Page) {}

  // Navigate to Transfer Funds section
  async navigate() {
    await this.page.click('text=Transfer Funds');
  }

  /**
   * Perform funds transfer between accounts
   * @param amount - Transfer amount (string to allow decimals)
   * @param fromAccount - Source account ID
   * @param toAccount - Destination account ID
   */
  async transferFunds(amount: string, fromAccount: string, toAccount: string) {
    await this.page.fill('input#amount', amount);
    await this.page.selectOption('select#fromAccountId', { value: fromAccount });
    await this.page.selectOption('select#toAccountId', { value: toAccount });
    await this.page.click('input[value="Transfer"]');
  }

  // pages/transfer.page.ts
async getAvailableAccounts() {
  await this.page.locator('select#fromAccountId option').first().waitFor();
  const options = await this.page.locator('select#fromAccountId option').all();
  
  return Promise.all(options.map(async (option) => ({
    value: await option.getAttribute('value'),
    text: await option.textContent()
  })));
}

  // Verify transfer completion message
  async assertTransferSuccess() {
    await expect(this.page.getByText('Transfer Complete!')).toBeVisible();
  }
}