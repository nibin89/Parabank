// 📂 tests/auth.spec.ts
import { test } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { TestData } from '../config/test-data';
import { AccountsPage } from '../pages/accounts.page';

// Test suite for authentication scenarios
test.describe('Authentication Tests', () => {
  
  // Test case: Valid credentials login
  test('Successful Login', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigate();
    await loginPage.login(
      TestData.USER.VALID.username, 
      TestData.USER.VALID.password
    );
    await loginPage.assertLoginSuccess();
  });

  // Test case: Invalid credentials login
  test('Invalid Login', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigate();
    await loginPage.login(
      TestData.USER.INVALID.username, 
      TestData.USER.INVALID.password
    );
    await loginPage.assertLoginError();
  });

  // Test case: Logout functionality
  test('Logout', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigate();
    // First login successfully
    await loginPage.login(
      TestData.USER.VALID.username, 
      TestData.USER.VALID.password
    );
    // Then logout
    await loginPage.logout();
  });

  test('After login, accounts overview is visible', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const accountsPage = new AccountsPage(page);
    
    await loginPage.navigate();
    await loginPage.login(TestData.USER.VALID.username, TestData.USER.VALID.password);
    await accountsPage.navigateToAccountsOverview();
    await accountsPage.assertAccountsVisible();
  });
});