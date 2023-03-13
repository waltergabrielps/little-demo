import test from "@lib/BaseTest";
import { WebActions } from "@lib/WebActions";
import { SearchPage } from "@pages/SearchPage";
import * as util from "util";

test.describe("Summary card items", () => {
    test(`User see the search summary card items`, async ({ homePage, searchPage}) => {
        const itemsCards = ["Reputation", "Analyst Insights", "Articles", "Services", "Resolutions", "Certificates", "Projects"];
        await test.step("Navigate to URL of Home", async () => {
            await homePage.navigateToURL();
        });
        await test.step("The user search by All with 54.183.50.26", async () => {
            await homePage.clickOnSearch();
            await homePage.searchByWord("All", "54.183.50.26");
        });
        for(const item of itemsCards){
            await test.step(util.format("The user see the card items called %s", item), async () => {
                await searchPage.theUserSeeTheCardItemsCalled(item);
            });
        }   
        await test.step("The user see all card expanded by default", async () => {
            await searchPage.theUserSeeAllCardExpandedByDefault();
        });
    });     

    test(`User see the Reputation summary card`, async ({ homePage, searchPage}) => {
        await test.step("Navigate to URL of Home", async () => {
            await homePage.navigateToURL();
        });
        await test.step("The user search by All with 108.62.118.232", async () => {
            await homePage.clickOnSearch();
            await homePage.searchByWord("All", "108.62.118.232");
        });
        await test.step("The user see the card items called Reputation", async () => {
            await searchPage.theUserSeeTheCardItemsCalled("Reputation");
        });
        await test.step("Checks the reputation header", async () => {
            await searchPage.checksReputationHeader();
        });
        await test.step("Checks the reputation body", async () => {
            await searchPage.checksReputationBody();
        });
    });
    test(`User see Resolutions, Articles, Projects, Certificates and Hashes summary cards`, async ({ homePage, searchPage}) => {
        const itemsCards = ["Articles", "Resolutions", "Certificates", "Projects"];
        await test.step("Navigate to URL of Home", async () => {
            await homePage.navigateToURL();
        });
        await test.step("The user search by All with 108.62.118.232", async () => {
            await homePage.clickOnSearch();
            await homePage.searchByWord("All", "108.62.118.232");
        });
        for(const item of itemsCards){
            await test.step(util.format("The user see the card items called %s", item), async () => {
                await searchPage.theUserSeeTheCardItemsCalled(item);
            });
        }   
        await test.step("The user see all card expanded by default", async () => {
            await searchPage.theUserSeeAllCardExpandedByDefault();
        });
    });          

});