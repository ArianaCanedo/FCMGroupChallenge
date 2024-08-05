import { Locator, Page } from "@playwright/test";
import { BasePage } from "./basePage";
import { expect } from "playwright/test";

export class FormItem {
  name: string;
  type: string;
  answer: string;
}

export class ContactPage extends BasePage {
  private contactNavLink: Locator;
  private contactHeader: Locator;
  private contactFormSubmitButton: Locator;
  private thankYouMessage: Locator;

  constructor(page: Page) {
    super(page);

    this.contactHeader = page.getByRole("heading", { name: "Contact" });
    this.contactFormSubmitButton = page.locator('[data-test="contact-submit"]');
    this.thankYouMessage = page.getByText(
      "Thanks for your message! We will contact you shortly."
    );
  }

  public async assertIsCurrentPage(options?: { timeout: number }) {
    await expect(this.contactHeader).toBeVisible();
  }

  public async getFormItems(formItem: FormItem) {
    return this.page.locator(`[data-test="${formItem.name}"]`);
  }

  public async fillInputItem(formItem: FormItem): Promise<void> {
    const inputItem = await this.getFormItems(formItem);
    await inputItem.fill(formItem.answer);
  }

  public async fillTextareaItem(formItem: FormItem): Promise<void> {
    const textAreaItem = await this.getFormItems(formItem);
    await textAreaItem.fill(formItem.answer);
  }

  public async selectDropdownOption(formItem: FormItem): Promise<void> {
    const dropdownItem = await this.getFormItems(formItem);
    await dropdownItem.click();
    await dropdownItem.selectOption(formItem.answer);
  }

  public async fillContactForm(formItems: FormItem[]): Promise<void> {
    for (const formItem of formItems) {
      if (formItem.type === "input" && formItem.answer) {
        await this.fillInputItem(formItem);
      } else if (formItem.type === "select" && formItem.answer) {
        await this.selectDropdownOption(formItem);
      } else if (formItem.type === "textarea" && formItem.answer) {
        await this.fillTextareaItem(formItem);
      }
    }
  }

  public async submitForm() {
    await this.contactFormSubmitButton.click();
  }

  public async assertThankYouMessageExists() {
    await expect(this.thankYouMessage).toBeVisible();
  }
}
