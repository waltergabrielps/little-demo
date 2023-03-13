import test from "@lib/BaseTest";


test.describe("Host dns tab Tests", () => {
  test(`Hosts dns tab`, async ({ homePage, searchPage }) => {
    await test.step("Navigate to URL of Home", async () => {
      await homePage.navigateToURL();
    });
    await test.step("The user search by All with riskiq.net", async () => {
      await homePage.searchByWord("All", "riskiq.net");
    });
    await test.step("The user clicks on data tab", async () => {
      await searchPage.clicksOnTabSpan("Data");
    });
    await test.step("The user clicks on the 'DNS' Tab", async () => {
      await searchPage.clicksOnTab("DNS");
    });
    await test.step("Checks the page size is 25", async () => {
      await searchPage.checksPageSizeButton("DNS", 25);
    });
    await test.step("Checks the pagination count is matching", async () => {
      await searchPage.checksPaginationButtonIsMatching("DNS");
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
    await test.step("Sorting by 'Last Seen' is 'descending' by default in 'Hosts Dns Tab'", async () => {
      await searchPage._sortingByIsByDefault(
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
