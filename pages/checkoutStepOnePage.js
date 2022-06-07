exports.CheckoutStepOnePage = class CheckoutStepOnePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.firstNameField = page.locator('[id="first-name"]');
    this.lastNameField = page.locator('[id="last-name"]');
    this.postalCodeField = page.locator('[id="postal-code"]');
    this.continueButton = page.locator('[id="continue"]');
  }

  async fillCheckoutCredentials(name, lastName, postalCode) {
    await this.firstNameField.fill(name);
    await this.lastNameField.fill(lastName);
    await this.postalCodeField.fill(postalCode);
  }
};
