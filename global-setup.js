const { chromium, expect } = require('@playwright/test');
const credentials = require('./data/credentials');
const { AuthPage } = require('./pages/authPage');
const { InventoryPage } = require('./pages/inventoryPage');

module.exports = async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  const authPage = new AuthPage(page);
  await authPage.goto();
  await authPage.login(credentials.username.standard, credentials.password);
  const inventoryPage = new InventoryPage(page);
  await expect(page).toHaveURL(inventoryPage.URL);
  await page.context().storageState({ path: 'logged_user.json' });
  await browser.close();
};
