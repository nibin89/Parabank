// 📂 tests/transfer.spec.ts
import { test,expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { TransferPage } from '../pages/transfer.page';
import { TestData } from '../config/test-data';

test.describe('Funds Transfer Tests', () => {
  let loginPage: LoginPage;
  let transferPage: TransferPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    transferPage = new TransferPage(page);
    await loginPage.navigate();
    await loginPage.login(TestData.USER.VALID.username, TestData.USER.VALID.password);
  });

  test('Successful transfer between accounts', async () => {
    await transferPage.navigate();
    await transferPage.transferFunds(
      TestData.TRANSFER.VALID_AMOUNT,
      TestData.ACCOUNTS.FROM_ACCOUNT,
      TestData.ACCOUNTS.TO_ACCOUNT
    );
    await transferPage.assertTransferSuccess();
  });

  test('Transfer with zero amount shows error', async () => {
    test.slow();
    await transferPage.navigate();
    await transferPage.transferFunds(
      TestData.TRANSFER.INVALID_AMOUNT,
      TestData.ACCOUNTS.FROM_ACCOUNT,
      TestData.ACCOUNTS.TO_ACCOUNT
    );
    await expect(transferPage.page.getByText('Amount must be positive')).toBeVisible();
  });
});