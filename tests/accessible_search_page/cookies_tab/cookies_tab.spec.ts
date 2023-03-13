import test from "@lib/BaseTest";
import { WebActions } from "@lib/WebActions";
import { SearchPage } from "@pages/SearchPage";

test.describe("Cookies Tests", () => {
  // Header of Project
  test(`Cookies Tab`, async ({ homePage, searchPage }) => {
    await test.step("Navigate to URL of Home", async () => {
      await homePage.navigateToURL();
    });
    await test.step("The user search by Cookies with google.com", async () => {
      await homePage.searchByWord("All", "google.com");
    });
    await test.step("The user clicks on the Data tab", async () => {
      await searchPage.clicksOnTabSpan("Data");
    });
    await test.step("The user sees in the Data list an element called 'Cookies'", async () => {
      await searchPage.checksDivByNameDisplayed("Cookies");
    });
    await test.step("the user clicks on the 'Cookies' Tab", async () => {
      await searchPage.clicksOnTab("Cookies");
    });
    await test.step("Checks the page size is 25", async () => {
      await searchPage.checksPageSize("Cookies", 25);
    });
    await test.step("Checks the pagination count is matching", async () => {
      await searchPage.checksPaginationIsMatching("Cookies");
    });
    await test.step("The user sees the next columns in the data tab", async () => {
      await searchPage.checksNextColumnsInDataTab([
        "Hostname",
        "First Seen",
        "Last Seen",
        "Name",
        "Domain",
        "Tags",
      ]);
    });
    await test.step("Checks the download button", async () => {
      await searchPage.checksDownloadButton();
    });
    await test.step("Sorting by 'Last Seen' is 'descending' by default in 'Cookies'", async () => {
      await searchPage.sortingByIsByDefault(
        "Last Seen",
        "descending",
        "Cookies"
      );
    });
    await test.step("Checks the sorting of columns", async () => {
      await searchPage.checksSortOfColumns(["First Seen", "Last Seen"]);
    });
    await test.step("The data in 'Hostname' should link to a search for that one in 'Cookies'", async () => {
      await searchPage.dataShouldLink("Hostname", "Cookies");
    });
  });
});
