import test from "@lib/BaseTest";
import { WebActions } from "@lib/WebActions";
import { SearchPage } from "@pages/SearchPage";

test.describe("Trackers Tests", () => {
  // Header of Project
  test(`Trackers on Hosts`, async ({ homePage, searchPage }) => {
    await test.step("Navigate to URL of Home", async () => {
      await homePage.navigateToURL();
    });
    await test.step("The user search by Trackers with google.com", async () => {
      await homePage.searchByWord("Trackers", "google.com");
    });
    await test.step("The user sees in the Data list an element called 'Trackers on Hosts'", async () => {
      await searchPage.checksDivByNameDisplayed("Trackers on Hosts");
    });
    await test.step("Checks the page size is 25", async () => {
      await searchPage.checksPageSize("Trackers on Hosts", 25);
    });
    await test.step("Checks the pagination count is matching", async () => {
      await searchPage.checksPaginationIsMatching("Trackers on Hosts");
    });
    await test.step("The user sees the next columns in the data tab", async () => {
      await searchPage.checksNextColumnsInDataTab([
        "Focus",
        "First Seen",
        "Last Seen",
        "Tags",
        ]);
    });
    await test.step("Checks the download button", async () => {
      await searchPage.checksDownloadButton();
    });
    await test.step("Sorting by 'Last Seen' is 'descending' by default in 'Trackers on Hosts'", async () => {
      await searchPage.sortingByIsByDefault(
        "Last Seen",
        "descending",
        "Trackers on Hosts"
      );
    });
    await test.step("Checks the sorting of columns", async () => {
      await searchPage.checksSortOfColumns(["First Seen", "Last Seen"]);
    });
  });
});
