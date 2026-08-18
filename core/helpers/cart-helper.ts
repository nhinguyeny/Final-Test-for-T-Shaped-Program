import { expect } from "@playwright/test";
import { HomePage } from '@page-objects/home-page.page';
import { CartPage } from '@page-objects/cart-page.page';

export async function addSingleProductAndVerifyCart(
  homePage: HomePage,
  cartPage: CartPage
): Promise<string> {
  const productName = await homePage.getProductNameByIndex(0);

  await homePage.addProductToCartByIndex(0);
  await homePage.openCart();
  await cartPage.waitForCartPageLoad();

  expect(await cartPage.isProductInCart(productName)).toBe(true);
  expect(await cartPage.getCartItemsCount()).toBe(1);
  expect(await cartPage.getItemQuantity(productName)).toBe("1");

  return productName;
}