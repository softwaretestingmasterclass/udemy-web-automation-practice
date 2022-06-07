# Sauce Demo Test Automation
Test execution results: [![Allure Report](https://img.shields.io/badge/Allure%20Report-deployed-yellowgreen)](https://melmoth-der-wanderer.github.io/glowing-happiness-sauce-demo/)
---
Project: https://www.saucedemo.com/
---

### User Flows
- Cancellation of the checkout process
- Editing items in the cart before checkout
- Invalid authentication
- Inventory sorting
- Multiple items checkout

---

### Technology
Playwright, Allure Report, Eslint, Faker

---

### Functionality
Verified functionality includes:
* Login
  * Valid
  * Invalid
  * Empty
* Inventory
  * Sorting
  * Adding item to shopping cart
  * Removing item from shopping cart
  * Viewing item details
  * Cart opening
* Inventory details
  * Adding item to shopping cart
  * Removing item from shopping cart
  * Cart opening
* Cart
  * Verifying items in the cart 
  * Proceeding to checkout
  * Removing item from shopping cart
  * Returning to shopping
* Checkout
  * Filling personal address information
  * Verifying items
  * Verifying subtotal price, tax and total price (for single and multiple items)
  * Cancellation checkout
  * Finishing checkout 
  * Verification checkout
    
## Local Set Up

Clone the repository to your local computer
```
git clone https://github.com/melmoth-der-wanderer/glowing-happiness-sauce-demo.git
```

Use the package manager `npm` to install dependencies:
```
npm install
```

Install the browsers
```
npx playwright install
```

Run the UI automation tests in parallel (Chrome, Firefox, Safari):
```
npm test
```

Run the UI automation tests in headful mode using 1 worker:
```
npm run debug
```

Get the report:
```
npm run report
```

---

#### Notes:

- All the items in the tests are choosing randomly from the `data/items.json` list;
- To authenticate user once, `global setup` and `storageState` were used;
- Have been used a combination of standard assertions and snapshot ones (where it is possible to use it). There is a limitation to use snapshot assertion at item details page, because it is unstable. We need to wait for the `onload` event after image loading completion, without access to the app code we can't do that. Still, visual part is very important to user, so we will need to provide that;
- Structure and selected test scenarios must be discussed via pull-request procedure with a team;
- Preferably, existent tests should be divided into smaller pieces. Nevertheless, used soft assertions don't stop the test execution in the middle of the run and all the functionalities can be checked;
- There is no API provided in that demo-app. In reality API opens a lot of possibilities to make tests better (for example: authentication via API, items list manipulating, etc);
- Mobile emulation is also possible, but wasn't considered in this project.
