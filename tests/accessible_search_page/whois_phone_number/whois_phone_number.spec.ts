import test from "@lib/BaseTest";
import { WebActions } from "@lib/WebActions";
import { SearchPage } from "@pages/SearchPage";

test.describe("Whois Phone Numbers Tests", () => {
  test(`Whois Phone Numbers`, async ({ homePage, searchPage }) => {
    await test.step("Navigate to URL of Home", async () => {
      await homePage.navigateToURL();
    });
    await test.step("The user search by All with riskiq.net", async () => {
      await homePage.searchByWord("All", "riskiq.net");
    });
    await test.step("The user clicks on the Data tab", async () => {
      await searchPage.clicksOnTabSpan("Data");
    });
    await test.step("the user clicks on the 'Whois' Tab", async () => {
      await searchPage.clicksOnTab("Whois");
    });
    await test.step("the user clicks on the 'Phone Numbers' Tab", async () => {
      await searchPage.clicksOnTab("Phone Numbers");
    });
    await test.step("The user sees the next columns in the data tab", async () => {
      await searchPage.checksNextColumnsInDataTab([
        "Value",
        "Type",
        "First Seen",
        "Last Seen",
      ]);
    });
    await test.step("The data in 'Value' should link to a search for that one in 'Whois Phone Numbers'", async () => {
      await searchPage.dataShouldLink("Value", "Phone Numbers");
    });
    await test.step("The user goes back", async () => {
      await searchPage.goBack();
    });
    await test.step("Data in Type should be comma separated list of contact types from whois record", async () => {
      await searchPage.isTypeCommaSeparated();
    });
   
  });
});
