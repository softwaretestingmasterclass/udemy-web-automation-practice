const { test } = require('@playwright/test');
const credentials = require('../data/credentials');

const { AuthPage } = require('../pages/authPage');

test.describe('Authentication', () => {
  test('Invalid authentication', async ({ page }) => {
    const authPage = new AuthPage(page);

    await test.step('Check empty fields validation', async () => {
      await authPage.goto();
      await authPage.submitButton.click();
      await authPage.verifyValidationMessage('Username is required');
    });
    await test.step('Check empty password field validation', async () => {
      await authPage.loginField.fill('Not_existing_user');
      await authPage.submitButton.click();
      await authPage.verifyValidationMessage('Password is required');
    });
    await test.step('Check invalid user validation', async () => {
      await authPage.passwordField.fill(credentials.password);
      await authPage.submitButton.click();
      await authPage.verifyValidationMessage('Username and password do not match any user in this service');
    });
    await test.step('Check locked user validation', async () => {
      await authPage.loginField.fill(credentials.username.locked_out);
      await authPage.passwordField.fill(credentials.password);
      await authPage.submitButton.click();
      await authPage.verifyValidationMessage('Sorry, this user has been locked out.');
    });
  });
});
