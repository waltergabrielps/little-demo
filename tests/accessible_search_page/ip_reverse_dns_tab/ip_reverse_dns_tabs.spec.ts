import test from "@lib/BaseTest";
import { WebActions } from "@lib/WebActions";
import { SearchPage } from "@pages/SearchPage";

test.describe("Ip Reverse dns tab Tests", () => {
  test(`Ip Reverse dns tab`, async ({ homePage, searchPage }) => {
    await test.step("Navigate to URL of Home", async () => {
      await homePage.navigateToURL();
    });
    await test.step("The user search by All with 8.8.8.8", async () => {
      await homePage.searchByWord("All", "8.8.8.8");
    });
    await test.step("The user clicks on Data tab", async () => {
      await searchPage.clicksOnTabSpan("Data");
    });
    await test.step("The user clicks on tab 'Reverse DNS'", async () => {
      await searchPage.clicksOnTab(("Reverse DNS"));
    });
    await test.step("Checks the page size is 25", async () => {
      await searchPage.checksPageSizeButton("Reverse DNS", 25);
    });
    await test.step("Checks the pagination count is matching", async () => {
      await searchPage.checksPaginationIsMatching("Reverse DNS");
    });
    await test.step("The user sees the next columns in the data tab", async () => {
      await searchPage.checksNextColumnsInDataTab([
        "Value",
        "First Seen",
        "Last Seen",
        "Type",
        "Tags",
        ]);
    });
    await test.step("Checks the download button", async () => {
      await searchPage.checksDownloadButton();
    });
    await test.step("Sorting by 'Last Seen' is 'descending' by default in 'Ip Reverse Dns Tab'", async () => {
      await searchPage.sortingByIsByDefault(
        "Last Seen",
        "descending",
        "DNS"
      );
    });
    await test.step("Checks the sorting of columns", async () => {
      await searchPage.checksSortOfColumns(["First Seen", "Last Seen"]);
    });
  });
});
