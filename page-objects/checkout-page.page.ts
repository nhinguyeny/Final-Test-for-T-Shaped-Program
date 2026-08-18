import { Page } from "@playwright/test";
import { BasePage } from "./base.page";

export type ReceiverInfo = {
  fullName: string;
  phone: string;
  address: string;
};

export class CheckoutPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  private readonly checkoutContainer = this.page.locator('.checkout-wrapper');
  private readonly checkoutSuccessContainer = this.page.locator('.checkout-success');
  private readonly receiverNameInput = this.page.getByTestId("checkout-name");
  private readonly receiverPhoneInput = this.page.getByTestId("checkout-phone");
  private readonly receiverAddressInput = this.page.getByTestId("checkout-address");
  private readonly codPaymentOption = this.page.locator('label.payment-option').filter({ has: this.page.locator('input[value="cash"]') });
  private readonly placeOrderButton = this.page.locator('.btn-checkout');
  private readonly orderSuccessMessage = this.page.getByTestId("checkout-success-heading");
  private readonly orderIdText = this.checkoutSuccessContainer.locator('p strong').first();

  async waitForCheckoutPageLoad() {
    await this.waitUntilVisible(this.checkoutContainer);
  }

  async fillReceiverInfo(receiver: ReceiverInfo) {
    await this.enterTxt(this.receiverNameInput, receiver.fullName);
    await this.enterTxt(this.receiverPhoneInput, receiver.phone);
    await this.enterTxt(this.receiverAddressInput, receiver.address);
  }

  async selectCodPayment() {
    await this.clickOnElement(this.codPaymentOption);
  }

  async placeOrder() {
    await this.clickOnElement(this.placeOrderButton);

  }


  async checkoutWithCod(receiver: ReceiverInfo) {
    await this.waitForCheckoutPageLoad();
    await this.fillReceiverInfo(receiver);
    await this.selectCodPayment();
    await this.placeOrder();
  }

  async isOrderSuccessful(): Promise<boolean> {
    await this.orderSuccessMessage.waitFor({
      state: 'visible',
      timeout: 5000
    });

    return await this.orderSuccessMessage.isVisible();
  }

  async getOrderId(): Promise<string> {
    await this.waitUntilVisible(
      this.orderIdText,
      5000
    );
    return (await this.getTextContent(this.orderIdText))?.trim() ?? "";
  }
}