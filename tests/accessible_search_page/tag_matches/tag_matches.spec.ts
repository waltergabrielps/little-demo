import test from "@lib/BaseTest";

test.describe("Tags Tests", () => {
  // Header of Project
  test(`Tag Matches`, async ({ homePage, searchPage }) => {
    await test.step("Navigate to URL of Home", async () => {
      await homePage.navigateToURL();
    });
    await test.step("The user search by Tag with test", async () => {
      await homePage.searchByWord("Tag", "test");
    });
    await test.step("The user sees in the Data list an element called 'Tag Matches'", async () => {
      await searchPage.checksDivByNameDisplayed("Tag Matches");
    });
    await test.step("The user clicks on the 'Tag Matches' Tab", async () => {
      await searchPage.clicksOnTab("Tag Matches");
    });
    await test.step("Checks the page size is 25", async () => {
      await searchPage.checksPageSize("Tag Matches", 25);
    });
    await test.step("Checks the pagination count is matching", async () => {
      await searchPage.checksPaginationIsMatching("Tag Matches");
    });
    await test.step("The user sees the next columns in the data tab", async () => {
      await searchPage.checksNextColumnsInDataTab([
        "Focus",
        "Tags",
      ]);
    });
    await test.step("Checks the download button", async () => {
      await searchPage.checksDownloadButton();
    });
    await test.step("The data in 'Focus' should link to a search for that one in 'Tag Matches'", async () => {
      await searchPage.dataShouldLink("Focus", "Tag Matches");
    });
  });
});
