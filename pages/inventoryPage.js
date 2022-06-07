const { expect } = require('@playwright/test');

exports.InventoryPage = class InventoryPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.URL = 'https://www.saucedemo.com/inventory.html';
    this.shoppingCartButton = page.locator('.shopping_cart_container');
    this.shoppingCartBadge = page.locator('.shopping_cart_container .shopping_cart_badge');
    this.sortingSelect = page.locator('[class="product_sort_container"]');
    this.el = page.locator('[class="inventory_details_img"]');
  }

  async goto() {
    await this.page.goto(this.URL, { waitUntil: 'networkidle' });
  }

  async openItemDetails(itemName) {
    await Promise.all([
      this.page.waitForNavigation({ waitUntil: 'networkidle' }),
      this.page.click(`//*[@class = "inventory_item_name" and text()="${itemName}"]`),
    ]);
  }

  async addItemToTheCart(itemName) {
    const item = itemName.replace(/\s/g, '-').toLowerCase();
    await this.page.click(`[id="add-to-cart-${item}"]`);
    await expect.soft(this.page.locator(`[id="remove-${item}"]`)).toBeVisible();
  }

  async removeItemFromTheCart(itemName) {
    const item = itemName.replace(/\s/g, '-').toLowerCase();
    await this.page.click(`[id="remove-${item}"]`);
    await expect.soft(this.page.locator(`[id="add-to-cart-${item}"]`)).toBeVisible();
  }
};
