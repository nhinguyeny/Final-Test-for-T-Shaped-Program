# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: update-full-name.spec.ts >> Admin - Update Full Name >> Update Full Name successfully
- Location: tests\update-full-name.spec.ts:57:7

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('profile-success')
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for getByTestId('profile-success')

```

```yaml
- button "← Home"
- heading "My Profile" [level=1]
- img "avatar"
- text: 📷
- paragraph: JPG, PNG, GIF up to 5MB. Click to change.
- text: Username
- textbox: admin
- text: Full Name
- textbox "John Doe": Update Full Name Test
- button "Saving..." [disabled]
```

# Test source

```ts
  1  | import { expect, type Locator, type Page } from "@playwright/test";
  2  | 
  3  | export class BasePage {
  4  |     readonly page: Page;
  5  | 
  6  |     constructor(page: Page) {
  7  |         this.page = page;
  8  |     }
  9  | 
  10 |     async openUrl(path: string = "") {
  11 |         await this.page.goto(path);
  12 |     }
  13 | 
  14 |     async enterTxt(element: Locator, text: string) {
  15 |         await element.clear();
  16 |         await element.fill(text);
  17 |     }
  18 | 
  19 |     async typeText(element: Locator, text: string, delay: number = 100) {
  20 |         await element.pressSequentially(text, { delay });
  21 |     }
  22 | 
  23 |     async clickOnElement(element: Locator) {
  24 |         await element.click();
  25 |     }
  26 | 
  27 |     async getTextContent(element: Locator) {
  28 |         return await element.textContent();
  29 |     }
  30 | 
  31 |     async getInputValue(element: Locator) {
  32 |         return await element.inputValue();
  33 |     }
  34 | 
  35 |     async hoverOnElement(element: string) {
  36 |         return await this.page.hover(element);
  37 |     }
  38 | 
  39 |     async waitUntilVisible(element: Locator, timeout?: number, message?: string) {
> 40 |         await expect(element, message).toBeVisible({ timeout });
     |                                        ^ Error: expect(locator).toBeVisible() failed
  41 |     }
  42 | 
  43 |     async waitUntilHidden(element: Locator, timeout?: number, message?: string) {
  44 |         await expect(element, message).toBeHidden({ timeout });
  45 |     }
  46 | 
  47 |     async waitForPageLoad(loadState?: 'networkidle' | 'load' | 'domcontentloaded') {
  48 |         return await this.page.waitForLoadState(loadState);
  49 |     }
  50 | 
  51 |     async getText(locator: Locator) {
  52 |         const elementText = await locator.innerText();
  53 |         return elementText;
  54 |     }
  55 | 
  56 |     async countElements(locator: Locator): Promise<number> {
  57 |         return await locator.count();
  58 |     }
  59 | }
  60 | 
```