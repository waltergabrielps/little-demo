import test from "@lib/BaseTest";

test.describe("Article Header Tests", () => {
    // Header of Project
    test(`Checks the article header`, async ({ homePage, articlePage}) => {
      await test.step("Navigate to URL of Home", async () => {
        await homePage.navigateToURL();
      });
      await test.step("The user picks a random article", async () => {
        await homePage.pickARandomArticle();
      });
      await test.step("Checks the article header elements", async () => {
        await articlePage.checkHeaderArticleElements();
      });
    });
  


});