import test from "@lib/BaseTest";

test.describe("Whois Tests", () => {
  test(`Whois History`, async ({ homePage, searchPage }) => {
    await test.step("Navigate to URL of Home", async () => {
      await homePage.navigateToURL();
    });

    await test.step("The user search by Whois Nameserver with google.com", async () => {
      await homePage.searchByWord("Whois", "google.com", "Nameserver");
    });
    await test.step("the user clicks on the 'Whois' Tab", async () => {
      await searchPage.clicksOnTab("Whois History");
    });
    await test.step("The user sees the next columns in the data tab", async () => {
      await searchPage.checksNextColumnsInDataTab([
        "Focus",
        "First Seen",
        "Last Seen",
        "Tags"
      ]);
    });
    await test.step("Checks the sorting of columns", async () => {
      await searchPage.checksSortOfColumns(["First Seen", "Last Seen"]);
    });
    await test.step("Checks the download button", async () => {
      await searchPage.checksDownloadButton();
    });
    await test.step("Sort by 'First Seen' or 'Last Seen'. 'Last Seen' descending as default", async () => {
      await searchPage.sortingByIsByDefault(
          "Last Seen",
          "descending",
          "Whois History"
      );
    });
    await test.step("The data in 'Focus' should link to a search for that one in 'Whois on IPs'", async () => {
      await searchPage.dataShouldLink("Focus", "Whois History");
    });
  });
});
