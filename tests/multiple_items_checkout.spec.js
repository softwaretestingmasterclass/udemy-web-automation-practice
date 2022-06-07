const { test, expect } = require('@playwright/test');
const { faker } = require('@faker-js/faker');
const randomizer = require('../utils/randomizer');

const { InventoryPage } = require('../pages/inventoryPage');
const { CartPage } = require('../pages/cartPage');
const { CheckoutStepOnePage } = require('../pages/checkoutStepOnePage');
const { CheckoutStepTwoPage } = require('../pages/checkoutStepTwoPage');
const { CheckoutCompletePage } = require('../pages/checkoutCompletePage');

test.describe('Checkout', () => {
  let desiredItemN1;
  let desiredItemN2;

  test.use({ storageState: 'logged_user.json' });

  test.beforeEach(async () => {
    desiredItemN1 = randomizer.getRandomItem();
    desiredItemN2 = randomizer.getRandomItem();
  });

  test('Multiple items checkout', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const checkoutStepOnePage = new CheckoutStepOnePage(page);
    const checkoutStepTwoPage = new CheckoutStepTwoPage(page);
    const checkoutCompletePage = new CheckoutCompletePage(page);

    await test.step('Add multiple items to the cart', async () => {
      await inventoryPage.goto();
      await inventoryPage.addItemToTheCart(desiredItemN1.name);
      await expect.soft(inventoryPage.shoppingCartBadge).toHaveText('1');
      await inventoryPage.addItemToTheCart(desiredItemN2.name);
      await expect.soft(inventoryPage.shoppingCartBadge).toHaveText('2');
    });
    await test.step('Go to the cart', async () => {
      await inventoryPage.shoppingCartButton.click();
    });
    await test.step('Verify the cart content', async () => {
      await cartPage.verifyItems([desiredItemN1, desiredItemN2]);
    });
    await test.step('Proceed to checkout step-one', async () => {
      await cartPage.checkoutButton.click();
    });
    await test.step('Fill step-one checkout process', async () => {
      await checkoutStepOnePage.fillCheckoutCredentials(
        faker.name.firstName(),
        faker.name.lastName(),
        faker.address.zipCode(),
      );
    });
    await test.step('Proceed to checkout step-two', async () => {
      await checkoutStepOnePage.continueButton.click();
    });
    await test.step('Verify the order', async () => {
      await checkoutStepTwoPage.verifyItems([desiredItemN1, desiredItemN2]);
      await checkoutStepTwoPage.verifyPrice([desiredItemN1, desiredItemN2]);
    });
    await test.step('Finish checkout', async () => {
      await checkoutStepTwoPage.finishButton.click();
      await checkoutCompletePage.verifyCheckoutIsComplete();
    });
  });
});
