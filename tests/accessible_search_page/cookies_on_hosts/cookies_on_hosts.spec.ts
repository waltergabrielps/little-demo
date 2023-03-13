import test from "@lib/BaseTest";
import { WebActions } from "@lib/WebActions";
import { SearchPage } from "@pages/SearchPage";

test.describe("Cookies Tests", () => {
  // Header of Project
  test(`Cookies on Hosts`, async ({ homePage, searchPage }) => {
    await test.step("Navigate to URL of Home", async () => {
      await homePage.navigateToURL();
    });
    await test.step("The user search by Cookies with google.com", async () => {
      await homePage.searchByWord("Cookie", "google.com", "Domain");
    });
    await test.step("The user sees in the Data list an element called 'Cookies on Hosts'", async () => {
      await searchPage.checksDivByNameDisplayed("Cookies on Hosts");
    });
    await test.step("Checks the page size is 25", async () => {
      await searchPage.checksPageSize("Cookies on Hosts", 25);
    });
    await test.step("Checks the pagination count is matching", async () => {
      await searchPage.checksPaginationIsMatching("Cookies on Hosts");
    });
    await test.step("The user sees the next columns in the data tab", async () => {
      await searchPage.checksNextColumnsInDataTab([
        "Hostname",
        "Name",
        "First Seen",
        "Last Seen",
        "Tags",
        ]);
    });
    // await test.step("Checks the download button", async () => {
    //   await searchPage.checksDownloadButton();
    // });
    await test.step("Sorting by 'Last Seen' is 'descending' by default in 'Cookies on Hosts'", async () => {
      await searchPage.sortingByIsByDefault(
        "Last Seen",
        "descending",
        "Cookies on Hosts"
      );
    });
    await test.step("Checks the sorting of columns", async () => {
      await searchPage.checksSortOfColumns(["First Seen", "Last Seen"]);
    });
    await test.step("The data in 'Hostname' should link to a search for that one in 'Cookies on Hosts'", async () => {
      await searchPage.dataShouldLink("Hostname", "Cookies on Hosts");
    });
    await test.step("The user goes back", async () => {
      await searchPage.goBack();
    });
    await test.step("The data in 'Name' should link to a search for that one in 'Cookies on Hosts'", async () => {
      await searchPage.dataShouldLink("Name", "Cookies on Hosts");
    });
   
  });
});
