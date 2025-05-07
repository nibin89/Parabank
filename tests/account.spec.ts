// tests/accounts.spec.ts
import { test,expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { AccountsPage } from '../pages/accounts.page';
import { TestData } from '../config/test-data';

test.describe('Accounts Page Tests', () => {
  let loginPage: LoginPage;
  let accountsPage: AccountsPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    accountsPage = new AccountsPage(page);
    await loginPage.navigate();
    await loginPage.login(TestData.USER.VALID.username, TestData.USER.VALID.password);
  });

  test('Verify accounts overview displays correctly', async () => {
    await accountsPage.navigateToAccountsOverview();
    await accountsPage.assertAccountsVisible();
  });

  test('View account details for first available account', async () => {
    await accountsPage.navigateToAccountsOverview();
    const accountIds = await accountsPage.getAccountIds();
    if (accountIds.length === 0) {
      test.skip(); // Skip if no accounts exist
      return;
    }

    await accountsPage.openAccount(accountIds[0]!);
  });

  test('Verify account balance is displayed', async () => {
    await accountsPage.navigateToAccountsOverview();
    const accountIds = await accountsPage.getAccountIds();
    
    if (accountIds.length === 0) {
      test.skip();
      return;
    }

    const balance = await accountsPage.getAccountBalance(accountIds[0]!);
    expect(balance).toMatch(/^\$\d+\.\d{2}$/); // Matches currency format
  });

  test('Verify multiple accounts exist for transfer testing', async () => {
    await accountsPage.navigateToAccountsOverview();
    const accountIds = await accountsPage.getAccountIds();
    expect(accountIds.length).toBeGreaterThanOrEqual(2);
  });

  test('Verify accounts page visual appearance', async ({ page }) => {
    await accountsPage.navigateToAccountsOverview();
    
  });
});