import test from "@lib/BaseTest";
import { WebActions } from "@lib/WebActions";
import { SearchPage } from "@pages/SearchPage";

test.describe("Whois Registrars Tests", () => {
  test(`Whois Registrars`, async ({ homePage, searchPage }) => {
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
    await test.step("the user clicks on the 'Registrars' Tab", async () => {
      await searchPage.clicksOnTab("Registrars");
    });
    await test.step("The user sees the next columns in the data tab", async () => {
      await searchPage.checksNextColumnsInDataTab([
        "Value",
        "First Seen",
        "Last Seen",
      ]);
    });
    await test.step("The data in 'Value' should not link to a search for that one in 'Whois Registrars'", async () => {
      await searchPage.dataNotShouldLink("Value", "Registrars");
    });
   
  });
});
