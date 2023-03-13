import test from "@lib/BaseTest";

test.describe("Article Download Tests", () => {
    // Header of Project
    test(`Checks the Article Download`, async ({ homePage, articlePage}) => {
      await test.step("Navigate to URL of Home", async () => {
        await homePage.navigateToURL();
      });
      await test.step("The user picks a random article", async () => {
        await homePage.pickARandomArticle();
        });
        await test.step("Checks the article download button", async () => {
            await articlePage.checkDownloadButton();
        });
    });
  


});