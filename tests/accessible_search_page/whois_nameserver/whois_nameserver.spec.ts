import test from "@lib/BaseTest";

test.describe("Whois Tests", () => {
  test(`Whois Nameserver`, async ({ homePage, searchPage }) => {
    await test.step("Navigate to URL of Home", async () => {
      await homePage.navigateToURL();
    });
    await test.step("The user search by All with google.com", async () => {
      await homePage.searchByWord("All", "google.com");
    });
    await test.step("The user clicks on the Data tab", async () => {
      await searchPage.clicksOnTabSpan("Data");
    });
    await test.step("the user clicks on the 'Whois' Tab", async () => {
      await searchPage.clicksOnTab("Whois");
    });
    await test.step("the user clicks on the 'Nameservers' Tab", async () => {
      await searchPage.clicksOnTab("Nameservers");
    });
    await test.step("The user sees the next columns in the data tab", async () => {
      await searchPage.checksNextColumnsInDataTab([
        "Value",
        "First Seen",
        "Last Seen",
      ]);
    });
    await test.step("The data in 'Value' should link to a search for that one in 'Whois on IPs'", async () => {
      await searchPage.dataShouldLink("Value", "Nameservers");
    });
  });
});
