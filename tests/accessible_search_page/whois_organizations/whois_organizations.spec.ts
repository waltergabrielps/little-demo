import test from "@lib/BaseTest";
import { WebActions } from "@lib/WebActions";
import { SearchPage } from "@pages/SearchPage";

test.describe("Whois Organizations Tests", () => {
  test(`Whois Orgainzations`, async ({ homePage, searchPage }) => {
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
    await test.step("the user clicks on the 'Organizations' Tab", async () => {
      await searchPage.clicksOnTab("Organizations");
    });
    await test.step("The user sees the next columns in the data tab", async () => {
      await searchPage.checksNextColumnsInDataTab([
        "Value",
        "Type",
        "First Seen",
        "Last Seen",
      ]);
    });
    await test.step("The data in 'Value' should link to a search for that one in 'Whois Organizations'", async () => {
      await searchPage.dataShouldLink("Value", "Organizations");
    });
    await test.step("The user goes back", async () => {
      await searchPage.goBack();
    });
    await test.step("Data in Type should be comma separated list of contact types from whois record", async () => {
      await searchPage.isTypeCommaSeparated();
    });
   
  });
});
