import { BasePage } from '@page-objects/base.page';
import { LoginPage } from '@page-objects/login-page.page';
import { HomePage } from '@page-objects/home-page.page';
import { ProfilePage } from '@page-objects/profile-page.page';
import { CartPage } from '@page-objects/cart-page.page';
import { CheckoutPage } from '@page-objects/checkout-page.page';
import { ProfileApi } from '@api/profile-api';
import { AuthApi } from '@api/auth-api';
import { type test as base } from '@playwright/test';


export type PageFixtures = {
    basePage: BasePage;
    loginPage: LoginPage;
    homePage: HomePage;
    profilePage: ProfilePage;
    cartPage: CartPage;
    checkoutPage: CheckoutPage;
    profileApi: ProfileApi;
    authApi: AuthApi;
};

type ExtendParams = Parameters<typeof base.extend<PageFixtures>>;

export const pageFixtures: ExtendParams[0] = {
    page: async ({ page }, use) => {
        await page.addInitScript(() => {
            window.localStorage.setItem('shopvn_lang', 'en');
        });
        await use(page);
    },
    basePage: async ({ page }, use) => {
        await use(new BasePage(page));
    },
    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },
    homePage: async ({ page }, use) => {
        await use(new HomePage(page));
    },
    profilePage: async ({ page }, use) => {
        await use(new ProfilePage(page));
    },
    cartPage: async ({page}, use) => {
        await use(new CartPage(page));
    },
    checkoutPage: async ({page}, use) => {
        await use(new CheckoutPage(page));
    },
    profileApi: async ({request}, use) => {
        await use(new ProfileApi(request));
    },
    authApi: async ({request}, use) => {
        await use(new AuthApi(request));
    },
};

export { expect } from '@playwright/test';
