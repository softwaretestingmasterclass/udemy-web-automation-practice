const { expect } = require('@playwright/test');

exports.CheckoutCompletePage = class CheckoutCompletePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.URL = 'https://www.saucedemo.com/checkout-complete.html';
    this.header = page.locator('[class="complete-header"]');
  }

  async verifyCheckoutIsComplete() {
    await expect.soft(this.page).toHaveURL(this.URL);
    await expect.soft(this.header).toHaveText('THANK YOU FOR YOUR ORDER');
  }
};
