import { Page } from "playwright";
import { BasePage } from "./base.page";

export class ProfilePage extends BasePage {
    constructor(page: Page) {
        super(page);
    }


    private readonly userNameInput = this.page.getByTestId('input.pf-input.pf-input-readonly');
    private readonly fullNameInput = this.page.getByTestId("profile-name");
    private readonly saveButton = this.page.getByTestId("profile-save");
    private readonly saveSuccessToast = this.page.getByTestId("profile-success");


    async getUserNameInputValue(): Promise<string> {
        return await this.getInputValue(this.userNameInput);
    }

    async getFullName(): Promise<string> {
        return await this.getInputValue(this.fullNameInput);
    }

    async fillFullName(fullName: string) {
        await this.enterTxt(this.fullNameInput, fullName);
    }

    async clickSave() {
        await this.clickOnElement(this.saveButton);
    }

    /** High-level flow: fill + save, used by the UI-update test. */
    async updateFullName(fullName: string) {
        await this.fillFullName(fullName);
        await this.clickSave();
        await this.waitUntilVisible(this.saveSuccessToast, 5_000);
    }
}