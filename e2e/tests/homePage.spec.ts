import { test, expect } from "@playwright/test";
import { FilterItem, HomePage } from "../pages/homePage";

const filterItems: FilterItem[] = [
  {
    name: "Sort",
  },
  {
    name: "Price Range",
  },
  {
    name: "Filters",
  },
  {
    name: "Search",
  },
];

const categoryFilterItems: FilterItem[] = [
  {
    name: "Sort",
  },
  {
    name: "Filters",
  },
];

const nameContainsFilteredWord = ["Hammer", "Pliers"];
const nameContainsSearchedWord = ["Pliers"];

test.describe("Homepage functionality should work as expected", () => {
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.navigateTo("https://practicesoftwaretesting.com");
  });

  test("should load homepage and header and filters should be visible", async ({
    page,
  }) => {
    await homePage.assertIsCurrentPage();
    await homePage.assertAllFiltersArePresent(filterItems);
  });

  test("user should be able to filter by category ", async ({ page }) => {
    await homePage.filterByCategory("hand-tools");
    await homePage.assertProductNamesContainKeywords(nameContainsFilteredWord);
    await homePage.assertAllFiltersArePresent(categoryFilterItems);
  });

  test("user should be able to search for a specific product ", async ({
    page,
  }) => {
    await homePage.searchItem("Pliers");
    await homePage.assertProductNamesContainKeywords(nameContainsSearchedWord);
  });

  test("User searches for specific item and applies a filter for a completely different item and no result is returned ", async ({
    page,
  }) => {
    await homePage.searchItem("Pliers");
    await homePage.filterByCategoryInMenu();
    await homePage.assertNoProductsAreFound();
  });
});
