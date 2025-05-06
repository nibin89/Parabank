// 📂 pages/login.page.ts
import { Page, expect } from '@playwright/test';
import { Constants } from '../config/constants';

/**
 * Login Page Object Model
 * Encapsulates all login-related actions and assertions
 */
export class LoginPage {
  constructor(private page: Page) {} // Page instance injected via constructor

  // Navigate to ParaBank homepage
  async navigate() {
    await this.page.goto(Constants.URL.BASE);
  }

  /**
   * Performs login action
   * @param username - Login username
   * @param password - Login password
   */
  async login(username: string, password: string) {
    await this.page.fill('input[name="username"]', username);
    await this.page.fill('input[name="password"]', password);
    await this.page.click('input[value="Log In"]');
  }

  // Verifies successful login by checking welcome message
  async assertLoginSuccess() {
    await expect(this.page.getByText('Welcome John Smith')).toBeVisible();
  }

  // Verifies login error message appears
  async assertLoginError() {
    await expect(this.page.getByText('Error!')).toBeVisible();
  }

  // Logs out and verifies redirect to login page
  async logout() {
    await this.page.click('text=Log Out');
    await expect(this.page).toHaveURL(Constants.URL.LOGIN +"?ConnType=JDBC");
  }
}