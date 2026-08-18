import test, { expect } from '@core/fixtures/all.fixture';
import accounts from "../resources/accounts.json";
import { addSingleProductAndVerifyCart } from '../core/helpers/cart-helper';
import * as allure from "allure-js-commons";
import { CheckoutPage } from '@page-objects/checkout-page.page';

type Account = { username: string; password: string; role: "admin" | "customer" };

const adminAccount = (accounts as Account[]).find((a) => a.role === "admin")!;
const customerAccount = (accounts as Account[]).find((a) => a.role === "customer")!;

test.describe("Customer - Checkout (COD)", () => {
  test.beforeEach(async ({ loginPage, homePage, cartPage }) => {
    await allure.step('Step 1: Login successfully', async () => {
      await loginPage.loginAs(customerAccount.username, customerAccount.password);
    })
    await allure.step('Step 2: Add single product to card successfully', async () => {
      await addSingleProductAndVerifyCart(homePage, cartPage);
    })
  });

  test.afterEach(async ({ page }) => {
    await page.close();
  });

  test("checkout succeeds with valid receiver info (COD)", async ({ cartPage, checkoutPage }) => {
    await allure.step('Step 3: Process checkout product', async () => {
      await cartPage.proceedToCheckout();
    })

    await allure.step('Step 4: Checkout with Cod ', async () => {
      await checkoutPage.checkoutWithCod({
        fullName: "Nguyen Van A",
        phone: "0901234567",
        address: "123 Le Loi, District 1, Ho Chi Minh City",
      });
    })

    await allure.step('Step 5: Verify the checkout sucessfully', async () => {
      expect(await checkoutPage.isOrderSuccessful()).toBe(true);
      expect(await checkoutPage.getOrderId()).not.toBe("");
    })

  });
});

test.describe("Admin - Checkout (COD)", () => {
  test.beforeEach(async ({ loginPage, homePage, cartPage }) => {
    await allure.step('Step 1: Login successfully', async () => {
      await loginPage.loginAs(adminAccount.username, adminAccount.password);
    })
    await allure.step('Step 2: Add single product to card successfully', async () => {
      await addSingleProductAndVerifyCart(homePage, cartPage);
    })
  });

  test.afterEach(async ({ page }) => {
    await page.close();
  });

  test("checkout succeeds with valid receiver info (COD)", async ({ cartPage, checkoutPage }) => {
    await allure.step('Step 3: Process checkout product', async () => {
      await cartPage.proceedToCheckout();
    })

    await allure.step('Step 4: Checkout with Cod ', async () => {
      await checkoutPage.checkoutWithCod({
        fullName: "Nguyen Van A",
        phone: "0901234567",
        address: "123 Le Loi, District 1, Ho Chi Minh City",
      });
    })

    await allure.step('Step 5: Verify the checkout sucessfully', async () => {
      expect(await checkoutPage.isOrderSuccessful()).toBe(true);
      expect(await checkoutPage.getOrderId()).not.toBe("");
    })

  });
});




