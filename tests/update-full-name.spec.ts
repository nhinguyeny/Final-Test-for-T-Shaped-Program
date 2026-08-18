import test, { expect } from '@core/fixtures/all.fixture';
import accounts from "../resources/accounts.json";
import * as allure from "allure-js-commons";
type Account = { username: string; password: string; role: "admin" | "customer" };
const customerAccount = (accounts as Account[]).find((a) => a.role === "customer")!;
const adminAccount = (accounts as Account[]).find((a) => a.role === "admin")!;

const updatedFullName = "Update Full Name Test";

test.describe("Customer - Update Full Name", () => {

  let originalFullName: string;
  let authToken: string;

  test.beforeEach(async ({ authApi, loginPage, homePage, profilePage }) => {
    await allure.step('Step 1: Get Token via API', async () => {
      authToken = await authApi.login(customerAccount.username, customerAccount.password)
    })

    await allure.step('Step 2: Login successfully', async () => {
      await loginPage.loginAs(customerAccount.username, customerAccount.password);
    })

    await allure.step('Step 3: Navigate to Profile page and get original fullname ', async () => {
      await homePage.clickOnHeaderUsername();
      originalFullName = await profilePage.getFullName();
    })

  });

  test.afterEach(async ({ profileApi }) => {
    await allure.step('Step 5: Restore the original value via API', async () => {
      await profileApi.updateFullName(authToken, originalFullName);
      const restoredFullName = await profileApi.getFullName(authToken);
      expect(restoredFullName).toBe(originalFullName);
    })


  });

  test("Update Full Name successfully", async ({ profilePage }) => {
    await allure.step('Step 4: Update FullName', async () => {
      await profilePage.updateFullName(updatedFullName);
      await expect.poll(() => profilePage.getFullName()).toBe(updatedFullName);
    })

  });

})
test.describe("Admin - Update Full Name", () => {

  let originalFullName: string;
  let authToken: string;

  test.beforeEach(async ({ authApi, loginPage, homePage, profilePage }) => {
    await allure.step('Step 1: Get Token via API', async () => {
      authToken = await authApi.login(adminAccount.username, adminAccount.password)
    })

    await allure.step('Step 2: Login successfully', async () => {
      await loginPage.loginAs(adminAccount.username, adminAccount.password);
    })

    await allure.step('Step 3: Navigate to Profile page and get original fullname ', async () => {
      await homePage.clickOnHeaderUsername();
      originalFullName = await profilePage.getFullName();
    })

  });

  test.afterEach(async ({ profileApi }) => {
    await allure.step('Step 5: Restore the original value via API', async () => {
      await profileApi.updateFullName(authToken, originalFullName);
      const restoredFullName = await profileApi.getFullName(authToken);
      expect(restoredFullName).toBe(originalFullName);
    })

  });

  test("Update Full Name successfully", async ({ profilePage }) => {
    await allure.step('Step 4: Update FullName', async () => {
      await profilePage.updateFullName(updatedFullName);
      await expect.poll(() => profilePage.getFullName()).toBe(updatedFullName);
    })

  });

})


