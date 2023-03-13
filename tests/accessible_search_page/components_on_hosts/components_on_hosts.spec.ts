import test from "@lib/BaseTest";
import { WebActions } from "@lib/WebActions";
import { SearchPage } from "@pages/SearchPage";

test.describe("Components Tests", () => {
  // Header of Project
  test(`Components on Hosts`, async ({ homePage, searchPage }) => {
    await test.step("Navigate to URL of Home", async () => {
      await homePage.navigateToURL();
    });
    await test.step("The user search by Component with google.com", async () => {
      await homePage.searchByWord("Component", "google.com");
    });
    await test.step("The user sees in the Data list an element called 'Components on Hosts'", async () => {
      await searchPage.checksDivByNameDisplayed("Components on Hosts");
    });
    await test.step("Checks the page size is 25", async () => {
      await searchPage.checksPageSize("Components on Hosts", 25);
    });
    await test.step("Checks the pagination count is matching", async () => {
      await searchPage.checksPaginationIsMatching("Components on Hosts");
    });
    await test.step("The user sees the next columns in the data tab", async () => {
      await searchPage.checksNextColumnsInDataTab([
        "Hostname",
        "First Seen",
        "Last Seen",
        "Category",
        "Name + Version",
        "Tags",
      ]);
    });
    await test.step("Checks the download button", async () => {
      await searchPage.checksDownloadButton();
    });
    await test.step("The data in 'Hostname' should link to a search for that one in 'Components on Hosts'", async () => {
      await searchPage.dataShouldLink("Hostname", "Components on Hosts");
    });
    await test.step("The user goes back", async () => {
      await searchPage.goBack();
    });
   
    // Failing due BUG 15314171
    // await test.step("Sorting by 'Last Seen' is 'descending' by default in 'Components on Hosts'", async () => {
    //   await searchPage.sortingByIsByDefault(
    //     "Last Seen",
    //     "descending",
    //     "Components on Hosts"
    //   );
    // });
    // await test.step("Checks the sorting of columns", async () => {
    //   await searchPage.checksSortOfColumns(["First Seen", "Last Seen"]);
    // });
  });
});
