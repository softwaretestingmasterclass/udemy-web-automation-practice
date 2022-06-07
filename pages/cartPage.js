const { expect } = require('@playwright/test');

exports.CartPage = class CartPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.checkoutButton = page.locator('[id="checkout"]');
    this.continueShoppingButton = page.locator('[id="continue-shopping"]');
    this.cartItem = page.locator('.cart_item');
    this.itemName = page.locator('.cart_item .inventory_item_name');
    this.itemPrice = page.locator('.cart_item .inventory_item_price');
    this.cartQuantity = page.locator('.cart_list .cart_quantity');
  }

  async verifyItems(items) {
    if (Array.isArray(items)) {
      for (let i = items.length - 1; i >= 0; i--) {
        await expect.soft(this.page.locator(this.getCartItem(items[i]))).toContainText([items[i].name, `$${items[i].price}`, '1']);
      }
      await expect.soft(this.cartItem).toHaveCount(items.length);
      return;
    }
    await expect.soft(this.itemName).toHaveText(items.name);
    await expect.soft(this.itemPrice).toHaveText(`$${items.price}`);
    await expect.soft(this.cartQuantity).toHaveText('1');
    await expect.soft(this.cartItem).toHaveCount(1);
  }

  async removeItem(itemName) {
    const item = itemName.replace(/\s/g, '-').toLowerCase();
    await this.page.click(`[id="remove-${item}"]`);
  }

  getCartItem(item) {
    return `//*[@id="item_${item.id}_title_link"]/ancestor::*[@class="cart_item"]`;
  }
};
