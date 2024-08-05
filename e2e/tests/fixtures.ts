import { test as baseTest, expect } from "@playwright/test";
import { HomePage } from "../pages/homePage";
import { ContactPage } from "../pages/contactPage";

type Fixtures = {
  homePage: HomePage;
  contactPage: ContactPage;
};

const test = baseTest.extend<Fixtures>({
  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);
    await homePage.navigateTo("https://practicesoftwaretesting.com");
    await use(homePage);
  },
  contactPage: async ({ page }, use) => {
    const contactPage = new ContactPage(page);
    await contactPage.navigateTo("https://practicesoftwaretesting.com/contact");
    await use(contactPage);
  },
});

export { test, expect };
