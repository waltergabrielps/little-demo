import test from "@lib/BaseTest";
import * as util from "util";


test.describe("Search Summary add/edit tags", () => {
    const searchIpDomain = ["8.8.8.8", "passivetotal.org",];

    test(`The user add a tag`, async ({homePage, searchPage,}) => {
        for(const search of searchIpDomain){
            let tag = util.format("E2EAutomationTag%s", Date.now());
            await test.step("Navigate to the URL", async () => {
                await homePage.navigateToURL();
            });
            await test.step(util.format("The user search by All with %s", search), async () => {
                await homePage.searchByWord("All", search);
            });
            await test.step("The user add a new tag", async () => {
                await searchPage.theUserAddNewTag(tag);
            });
            await test.step("The user should see the tag created", async () => {
                await searchPage.verifyTagCreated(tag);
            });
        }
    });

    test(`The user delete a tag`, async ({homePage, searchPage,}) => {
        for(const search of searchIpDomain){
            let sizeTag:string = "";
            await test.step("Navigate to the URL", async () => {
                await homePage.navigateToURL();
            });
            await test.step(util.format("The user search by All with %s", search), async () => {
                await homePage.searchByWord("All", search);
            });
            await test.step("The user delete a tag", async () => {
                sizeTag = await searchPage.theUserDeleteTag();
            });
            await test.step("The user not should see the tag deleted", async () => {
                await searchPage.verifyTagDelete(sizeTag);
            });
        }
    });

    test(`The user not see the edit tag option`, async ({homePage, searchPage,}) => {
            await test.step("Navigate to the URL", async () => {
                await homePage.navigateToURL();
            });
            await test.step("The user search by All with CVE-2020-14882", async () => {
                await homePage.searchByWord("All", "CVE-2020-14882");
            });
            await test.step("The user should not see the edit tads", async () => {
                await searchPage.verifyNotSeeEditTag();
            });
    });
});     