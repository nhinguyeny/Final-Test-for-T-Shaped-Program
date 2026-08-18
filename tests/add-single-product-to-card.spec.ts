import test, { expect } from '@core/fixtures/all.fixture';
import accounts from "../resources/accounts.json";
import * as allure from "allure-js-commons";
type Account = { username: string; password: string; role: "admin" | "customer" };

const adminAccount = (accounts as Account[]).find((a) => a.role === "admin")!;
const customerAccount = (accounts as Account[]).find((a) => a.role === "customer")!;

test.describe("Customer - Add product to cart", () => {
  test.beforeEach(async ({ loginPage }) => {
    await allure.step('Step 1: Login successfully', async () => {
      await loginPage.loginAs(customerAccount.username, customerAccount.password);
    })
  });

  test.afterEach(async ({ page }) => {
    await page.close();
  });

  test("should add a single product to the cart and verify quantity on cart page", async ({
    homePage,
    cartPage,
  }) => {
    await allure.step('Step 2: Add single product to cart', async () => {
      await homePage.addProductToCartByIndex(0);
      expect(await homePage.getCartItemCountBadge()).toBe("1");
    })

    await allure.step('Step 3: Verify quantity on cart page', async () => {
      const productName = await homePage.getProductNameByIndex(0);
      await homePage.openCart();
      await cartPage.waitForCartPageLoad();
      expect(await cartPage.isProductInCart(productName)).toBe(true);
      expect(await cartPage.getCartItemsCount()).toBe(1);
      expect(await cartPage.getItemQuantity(productName)).toBe("1");
    })
  });
});

test.describe("Admin - Add product to cart", () => {
  test.beforeEach(async ({ loginPage }) => {
    await allure.step('Step 1: Login successfully', async () => {
      await loginPage.loginAs(adminAccount.username, adminAccount.password);
    })
  });

  test.afterEach(async ({ page }) => {
    await page.close();
  });

  test("should add a single product to the cart and verify quantity on cart page", async ({
    homePage,
    cartPage,
  }) => {
    await allure.step('Step 2: Add single product to cart', async () => {
      await homePage.addProductToCartByIndex(0);
      expect(await homePage.getCartItemCountBadge()).toBe("1");
    })

    await allure.step('Step 3: Verify quantity on cart page', async () => {
      const productName = await homePage.getProductNameByIndex(0);
      await homePage.openCart();
      await cartPage.waitForCartPageLoad();
      expect(await cartPage.isProductInCart(productName)).toBe(true);
      expect(await cartPage.getCartItemsCount()).toBe(1);
      expect(await cartPage.getItemQuantity(productName)).toBe("1");
    })
  });
});

