const { expect } = require('@playwright/test');

exports.AuthPage = class AuthPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.URL = 'https://www.saucedemo.com/';
    this.loginField = page.locator('[id="user-name"]');
    this.passwordField = page.locator('[id="password"]');
    this.submitButton = page.locator('[id="login-button"]');
    this.errorMessage = page.locator('[data-test="error"]');
  }

  async goto() {
    await this.page.goto(this.URL);
  }

  async login(login, password) {
    await this.loginField.fill(login);
    await this.passwordField.fill(password);
    await Promise.all([
      this.page.waitForNavigation(),
      this.submitButton.click(),
    ]);
  }

  async verifyValidationMessage(message) {
    await expect.soft(this.errorMessage).toHaveText(`Epic sadface: ${message}`, { useInnerText: true });
  }
};
