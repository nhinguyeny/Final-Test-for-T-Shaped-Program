import { Page } from "playwright";
import { BasePage } from "./base.page";

export class HomePage extends BasePage {
    constructor(page: Page) {
        super(page);
    }

    private readonly productGridSection = this.page.locator('div.product-grid');
    private readonly productCards = this.productGridSection.locator('div.product-card');
    private readonly headerUsername = this.page.getByTestId('header-username');
    private readonly cartButton = this.page.locator('.cart-btn');
    private readonly cartItemCountBadge = this.page.locator('.cart-badge');


    async clickOnHeaderUsername() {
        await this.clickOnElement(this.headerUsername);
    }

    async getProductCardsCount(): Promise<number> {
        return await this.countElements(this.productCards);
    }

    private productCardByName(productName: string) {
        return this.productCards.filter({ hasText: productName });
    }

    private productCartByIndex(index: number) {
        return this.productCards.nth(index);
    }

    async getProductNameByIndex(index: number): Promise<string> {
        const card = this.productCartByIndex(index);

        await this.waitUntilVisible(card);
        return (await this.getText(card.locator('.product-name')));
    }

    async addProductToCartByIndex(index: number) {
        const card = this.productCartByIndex(index);
        await this.waitUntilVisible(card);
        await this.clickOnElement(card.locator('.add-to-cart'));
    }

    async addProductToCartByName(productName: string) {
        const card = this.productCardByName(productName);
        await this.waitUntilVisible(card);
        await this.clickOnElement(card.locator(".add-to-cart"));
    }

    async getCartItemCountBadge(): Promise<string> {
        return (await this.getTextContent(this.cartItemCountBadge)) ?? "";
    }
    async openCart() {
        await this.clickOnElement(this.cartButton);
    }
}