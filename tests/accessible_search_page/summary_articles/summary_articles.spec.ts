import test from "@lib/BaseTest";
import { WebActions } from "@lib/WebActions";
import { SearchPage } from "@pages/SearchPage";

test.describe("Summary card articles exact search", () => {
    // Save new project
    test(`Licenced user looks for an exact search`, async ({ homePage, searchPage}) => {
        await test.step("Navigate to URL of Home", async () => {
            await homePage.navigateToURL();
        });
        await test.step("The user search by All with integral.hacking101.net", async () => {
            await homePage.clickOnSearch();
            await homePage.searchByWord("All", "integral.hacking101.net");
        });
        await test.step("The user see the card items called Articles", async () => {
            await searchPage.theUserSeeTheCardItemsCalled("Articles");
        });
        await test.step("checks the number of Articles found is 1 in summary card", async () => {
            await searchPage.checksTheNumberOfArticlesFoundIs("Articles", 1);
        });

    })        
})