import test from "@lib/BaseTest";
import { WebActions } from "@lib/WebActions";
import { SearchPage } from "@pages/SearchPage";

test.describe("Trackers tab Tests", () => {
  // Header of Project
  test(`Trackers tab`, async ({ homePage, searchPage }) => {
    await test.step("Navigate to URL of Home", async () => {
      await homePage.navigateToURL();
    });
    await test.step("The user search by Trackers with google.com", async () => {
      await homePage.searchByWord("All", "google.com");
    });
    await test.step("The user sees in the Data list an element called 'Trackers'", async () => {
      await searchPage.checkIsDisplayedInDataTab("Trackers");
    });
    await test.step("Checks the page size is 25", async () => {
      await searchPage.checksDataPageSize("Trackers", 25);
    });
    await test.step("Checks the pagination count is matching", async () => {
      await searchPage.checksPaginationIsMatching("Trackers");
    });
    await test.step("The user sees the next columns in the data tab", async () => {
      await searchPage.checksNextColumnsInDataTab([
        "Hostname",
        "First Seen",
        "Last Seen",
        "Type",
        "Value",
        "Tags"
        ]);
    });
    await test.step("Checks the download button", async () => {
      await searchPage.checksDownloadButton();
    });
    await test.step("Sorting by 'Last Seen' is 'descending' by default in 'Trackers'", async () => {
      await searchPage.sortingByIsByDefault(
        "Last Seen",
        "descending",
        "Trackers"
      );
    });
    await test.step("Checks the sorting of columns", async () => {
      await searchPage.checksSortOfColumns(["First Seen", "Last Seen"]);
    });
    await test.step("The data in 'Hostname' should link to a search for that one in 'Trackers'", async () => {
      await searchPage.dataShouldLink("Hostname", "Trackers");
    });
    await test.step("The user goes back", async () => {
      await searchPage.goBack();
    });
    await test.step("The data in 'Hostname' should link to a search for that one in 'Trackers'", async () => {
      await searchPage.dataShouldLink("Hostname", "Trackers");
    });
   
  });
});
