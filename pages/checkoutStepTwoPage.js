const { expect } = require('@playwright/test');

exports.CheckoutStepTwoPage = class CheckoutStepTwoPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.itemName = page.locator('.cart_item .inventory_item_name');
    this.itemPrice = page.locator('.cart_item .inventory_item_price');
    this.cartItem = page.locator('.cart_item');
    this.cartQuantity = page.locator('.cart_list .cart_quantity');
    this.summarySubtotal = page.locator('.summary_subtotal_label');
    this.summaryTax = page.locator('.summary_tax_label');
    this.summaryTotal = page.locator('.summary_total_label');
    this.finishButton = page.locator('[id="finish"]');
    this.cancelButton = page.locator('[id="cancel"]');
  }

  getCartItem(item) {
    return `//*[@id="item_${item.id}_title_link"]/ancestor::*[@class="cart_item"]`;
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

  async verifyPrice(items) {
    let subtotal = 0;
    if (Array.isArray(items)) {
      for (let i = items.length - 1; i >= 0; i--) {
        subtotal += Number(items[i].price);
      }
    } else {
      subtotal = items.price;
    }
    const tax = (subtotal / 100 * 8).toFixed(2);
    const total = (Number(tax) + Number(subtotal)).toFixed(2);
    await expect.soft(this.summarySubtotal).toHaveText(`Item total: $${subtotal}`);
    await expect.soft(this.summaryTax).toHaveText(`Tax: $${tax}`);
    await expect.soft(this.summaryTotal).toHaveText(`Total: $${total}`);
  }
};
