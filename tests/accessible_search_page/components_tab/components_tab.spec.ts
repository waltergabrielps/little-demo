import test from "@lib/BaseTest";
import Constants from "@utils/Constants";

test.describe("Components Tests", () => {
  // Header of Project
  test(`Components Tab`, async ({ homePage, searchPage }) => {
    await test.step("Navigate to URL of Home", async () => {
      await homePage.navigateToURL();
    });
    await test.step("The user search by Components with google.com", async () => {
      await homePage.searchByWord("All", "google.com");
    });
    await test.step("The user clicks on the Data tab", async () => {
      await searchPage.clicksOnTabSpan("Data");
    });
    await test.step("The user sees in the Data list an element called 'Components'", async () => {
      await searchPage.checksDivByNameDisplayed("Components");
    });
    await test.step("the user clicks on the 'Components' Tab", async () => {
      await searchPage.clicksOnTab("Components");
    });
    await test.step("Checks the page size is 25", async () => {
      await searchPage.checksPageSize("Components", 25);
    });
    await test.step("Checks the pagination count is matching", async () => {
      await searchPage.checksPaginationIsMatching("Components");
    });
    await test.step("The user sees the next columns in the data tab", async () => {
      await searchPage.checksNextColumnsInDataTab([
        "Hostname",
        "First Seen",
        "Last Seen",
        "Type",
        "Name + Version",
        "Tags",
      ]);
    });
    await test.step("Checks the download button", async () => {
      await searchPage.checksDownloadButton();
    });
    await test.step("Sorting by 'Last Seen' is 'descending' by default in 'Components'", async () => {
      await searchPage.sortingByIsByDefault(
        "Last Seen",
        "descending",
        "Components"
      );
    });``
    await test.step("Checks the sorting of columns", async () => {
      await searchPage.checksSortOfColumns(["First Seen", "Last Seen"]);
    });
    await test.step("checks the filters have at most 10 popular items in 'Components'", async () => {
      await searchPage.checksPopularItemsOnFilters([
        "Name",
        "Hostname",
        "Type",
      ], Constants.FILTERS_POPULAR_ITEMS_LENGTH, "Components");
    });
    await test.step("The data in 'Hostname' should link to a search for that one in 'Components'", async () => {
      await searchPage.dataShouldLink("Hostname", "Components");
    });
  });
});
