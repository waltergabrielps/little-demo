import test from "@lib/BaseTest";
import { WebActions } from "@lib/WebActions";
import { SearchPage } from "@pages/SearchPage";

test.describe("Host pairs tab Tests", () => {
  // Header of Project
  test(`Host pairs tab`, async ({ homePage, searchPage }) => {
    await test.step("Navigate to URL of Home", async () => {
      await homePage.navigateToURL();
    });
    await test.step("The user search by Host pairs with test.com", async () => {
      await homePage.searchByWord("All", "test.com");
    });
    await test.step("The user sees in the Data list an element called 'Host pairs'", async () => {
      await searchPage.checkIsDisplayedInDataTab("Host Pairs");
    });
    await test.step("Checks the page size is 25", async () => {
      await searchPage.checksDataPageSize("Host Pairs", 25);
    });
    await test.step("Checks the pagination count is matching", async () => {
      await searchPage.checksPaginationIsMatching("Host Pairs");
    });
    await test.step("The user sees the next columns in the data tab", async () => {
      await searchPage.checksNextColumnsInDataTab([
        "Parent Hostname",
        "Child Hostname",
        "First Seen",
        "Last Seen",
        "Cause",
        "Tags"
      ]);
    });
    await test.step("Checks the download button", async () => {
      await searchPage.checksDownloadButton();
    });
    await test.step("Sorting by 'Last Seen' is 'descending' by default in 'Host pairs'", async () => {
      await searchPage.sortingByIsByDefault(
        "Last Seen",
        "descending",
        "Host Pairs"
      );
    });
    await test.step("Checks the sorting of columns", async () => {
      await searchPage.checksSortOfColumns(["First Seen", "Last Seen"]);
    });
    await test.step("The data in 'Parent Hostname' should link to a search for that one in 'Host pairs'", async () => {
      await searchPage.dataShouldLink("Parent Hostname", "Host Pairs");
    });
    await test.step("The user goes back", async () => {
      await searchPage.goBack();
    });
    await test.step("The data in 'Child Hostname' should link to a search for that one in 'Host pairs'", async () => {
      await searchPage.dataShouldLink("Child Hostname", "Host Pairs");
    });

  });
});
