import test from "@lib/BaseTest";
import { WebActions } from "@lib/WebActions";
import { SearchPage } from "@pages/SearchPage";

test.describe("Intelligence tab Tests", () => {
  test(`Intelligence tab Projects`, async ({ homePage, searchPage }) => {
    await test.step("Navigate to URL of Home", async () => {
      await homePage.navigateToURL();
    });
    await test.step("The user search by All with google.com", async () => {
      await homePage.searchByWord("All", "google.com");
    });
    await test.step("The user clicks on the Data tab", async () => {
      await searchPage.clicksOnTabSpan("Data");
    });
    await test.step("The user clicks on the 'Projects' Tab under Intelligence section", async () => {
      await searchPage.clicksOnIntelligenceTab("Projects");
    });
    await test.step("The user sees in the Data list an element called 'Projects'", async () => {
      await searchPage.checksDivByNameDisplayed("Projects");
    });
    await test.step("Checks the page size is 5", async () => {
      await searchPage.checksPageSize("Projects", 5, SearchPage.TITLE);
    });
    await test.step("Checks the pagination count is matching", async () => {
      await searchPage.checksPaginationIsMatching("Projects");
    });
    await test.step("Sorting by 'Name' is 'ascending' by default in 'Projects'", async () => {
      await searchPage.sortingByTitleIsByDefault(
        "ascending",
        "Projects"
        );
      });
      await test.step("isIntelligenceItemLoadedProperly", async () => {
        await searchPage.isIntelligenceItemLoadedProperly("Projects");
      });
      
  });
  test(`Intelligence tab Articles`, async ({ homePage, searchPage }) => {
    await test.step("Navigate to URL of Home", async () => {
      await homePage.navigateToURL();
    });
    await test.step("The user search by All with google.com", async () => {
      await homePage.searchByWord("All", "google.com");
    });
    await test.step("The user clicks on the Data tab", async () => {
      await searchPage.clicksOnTabSpan("Data");
    });
    await test.step("the user clicks on the 'Articles' Tab under Intelligence section", async () => {
      await searchPage.clicksOnIntelligenceTab("Articles");
    });
    await test.step("The user sees in the Data list an element called 'Articles'", async () => {
      await searchPage.checksDivByNameDisplayed("Articles");
    });
    await test.step("Checks the page size is 5", async () => {
      await searchPage.checksPageSize("Articles", 5, SearchPage.TITLE);
    });
    await test.step("Checks the pagination count is matching", async () => {
      await searchPage.checksPaginationIsMatching("Articles");
    });
    await test.step("Sorting by 'Name' is 'ascending' by default in 'Articles'", async () => {
      await searchPage.sortingByTitleIsByDefault(
        "ascending",
        "Articles"
        );
      });
      await test.step("isIntelligenceItemLoadedProperly", async () => {
        await searchPage.isIntelligenceItemLoadedProperly("Articles");
      });
      
  });
});
