import test from "@lib/BaseTest";
import * as util from "util";

test.describe("Profiles List", () => {
    test(`Checks the Cyber Threat Profiles`, async ({ homePage, profilePage }) => {
        const itemsTags = ["Threat actors", "Tool", "Backdoor"];
        const itemsColumns = ["Profile", "Sponsored States", "Targets", "Defender TI Indicators"];
        await test.step("Navigate to URL of Home", async () => {
            await homePage.navigateToURL();
        });
        await test.step("The user click on Projects button", async () => {
            await homePage.theUserClickOnTheProjectButton("Profiles");
        });
        await test.step("The user check the title and the text description", async () => {
            await profilePage.checkTheTextDescription();
        });
        for(const item of itemsTags){
            await test.step(util.format("The user click on tab %s", item), async()=>{
                await profilePage.clickOnTheTab(item);
                await profilePage.checkTheNumberOnItem(item);
            })
            for(const column of itemsColumns){
                await test.step(util.format("The user check the colum %s", column), async()=>{
                    await profilePage.checkTheColumList(column);
                })
             }
        }
    })

})