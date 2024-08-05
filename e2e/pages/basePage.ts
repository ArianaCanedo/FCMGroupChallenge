import { Locator, Page } from "@playwright/test";

export class BasePage {
  protected page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  public async navigateTo(url: string) {
    await this.page.goto("https://practicesoftwaretesting.com");
  }
}
