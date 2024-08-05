import { test, expect } from "@playwright/test";
import { HomePage } from "../pages/homePage";
import { ContactPage, FormItem } from "../pages/contactPage";

const formItems: FormItem[] = [
  {
    name: "first-name",
    type: "input",
    answer: "Test",
  },
  {
    name: "last-name",
    type: "input",
    answer: "Test",
  },
  {
    name: "email",
    type: "input",
    answer: "test@test.com",
  },
  {
    name: "subject",
    type: "select",
    answer: "Customer service",
  },
  {
    name: "message",
    type: "textarea",
    answer:
      "Hello, this is a test and I just want to make sure I can type here",
  },
];

test.describe("Contact form can be submitted", () => {
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.navigateTo("https://practicesoftwaretesting.com");
  });

  test("should fill contact form and submit", async ({ page }) => {
    await homePage.navigateToContactPage();
    const contactPage = new ContactPage(page);
    await contactPage.assertIsCurrentPage();
    await contactPage.fillContactForm(formItems);
    await contactPage.submitForm();
    await contactPage.assertThankYouMessageExists();
  });
});
