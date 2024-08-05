import { Locator, Page } from "@playwright/test";
import { BasePage } from "./basePage";
import { expect } from "playwright/test";

export class FilterItem {
  name: string;
}

export class ProductItem {
  name: string;
}

export class HomePage extends BasePage {
  private mainHeader: Locator;
  private sideFilters: Locator;
  private searchInput: Locator;
  private searchButton: Locator;
  private contactLink: Locator;
  private categoriesDropdown: Locator;
  private filterByCategoryMenu: Locator;
  private noResultsFoundMessage: Locator;
  private homeNavLink: Locator;

  constructor(page: Page) {
    super(page);

    this.mainHeader = page.getByRole("link", {
      name: "Practice Software Testing -",
    });
    this.sideFilters = page.locator('[data-test="filters"]');
    this.searchInput = page.locator('[data-test="search-query"]');
    this.searchButton = page.locator('[data-test="search-submit"]');
    this.contactLink = page.locator('[data-test="nav-contact"]');
    this.categoriesDropdown = page.locator('[data-test="nav-categories"]');
    this.filterByCategoryMenu = page.getByRole("checkbox", { name: "Hammer" });
    this.noResultsFoundMessage = page.locator('[data-test="no-results"]');
    this.homeNavLink = page.locator('[data-test="nav-home"]');
  }

  public async goto() {
    await this.page.goto("https://practicesoftwaretesting.com");
  }

  public async assertIsCurrentPage(options?: { timeout: number }) {
    await expect(this.mainHeader).toBeVisible();
  }

  public async assertFilterExists(filterItem: FilterItem) {
    const filterLocator = this.page
      .locator(".grid-title")
      .getByText(filterItem.name);
    await expect(filterLocator).toBeVisible();
  }

  private async getProductName(): Promise<Locator> {
    return this.page.locator('[data-test="product-name"]');
  }

  public async assertProductNamesContainKeywords(
    nameContainsKeyword: string | string[]
  ) {
    const keywords =
      typeof nameContainsKeyword === "string"
        ? [nameContainsKeyword]
        : nameContainsKeyword;
    const productNames = await this.getProductName();
    const count = await productNames.count();

    for (let i = 0; i < count; i++) {
      const name = await productNames.nth(i).innerText();
      const titleContainsKeyword = keywords.some((keyword) =>
        name.toLowerCase().includes(keyword.toLowerCase())
      );
      await expect(titleContainsKeyword).toBe(true);
    }
  }

  public async removeFilters() {
    await this.homeNavLink.click();
  }

  public async assertNoProductsAreFound() {
    await expect(this.noResultsFoundMessage).toBeVisible();
  }

  public async assertAllFiltersArePresent(filterItems: FilterItem[]) {
    for (const filterItem of filterItems) {
      await this.assertFilterExists(filterItem);
    }
  }

  public async assertFiltersAreVisible(options?: { timeout: number }) {
    await expect(this.mainHeader).toBeVisible();
  }

  public async searchItem(item: string) {
    await this.searchInput.fill(item);
    await this.searchButton.click();
  }

  public async getDropdownItem(category: string) {
    return this.page.locator(`[data-test="nav-${category}"]`);
  }

  public async filterByCategory(category: string) {
    await this.categoriesDropdown.click();
    const dropdownItem = await this.getDropdownItem(category);
    await dropdownItem.click();
  }

  public async filterByCategoryInMenu() {
    await this.filterByCategoryMenu.click();
  }

  public async navigateToContactPage() {
    await this.contactLink.click();
  }
}
