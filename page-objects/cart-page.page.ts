import { Page } from "@playwright/test";
import { BasePage } from "./base.page";

export class CartPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  private readonly cartContainer = this.page.locator(".cart-title");
  private readonly cartItems = this.page.locator('.cart-content');
  private readonly emptyCartIcon = this.page.locator('empty-icon');
  private readonly checkoutButton = this.page.locator('.checkout-btn');


  async waitForCartPageLoad() {
    await this.waitUntilVisible(this.cartContainer);
  }

  async getCartItemsCount(): Promise<number> {
    return await this.countElements(this.cartItems);
  }

  private cartItemByName(productName: string) {
    return this.cartItems.filter({ hasText: productName });
  }

  async getItemQuantity(productName: string): Promise<string> {
    const row = this.cartItemByName(productName);
    await this.waitUntilVisible(row);
    return (await this.getTextContent(row.locator('.qty-value'))) ?? "";
  }

  async getItemUnitPrice(productName: string): Promise<string> {
    const row = this.cartItemByName(productName);
    return (await this.getTextContent(row.locator('.item-total'))) ?? "";
  }

  async isProductInCart(productName: string): Promise<boolean> {
    return (await this.countElements(this.cartItemByName(productName))) > 0;
  }

  async isCartEmpty(): Promise<boolean> {
    return await this.emptyCartIcon.isVisible();
  }

  async proceedToCheckout() {
    await this.clickOnElement(this.checkoutButton);
  }
}