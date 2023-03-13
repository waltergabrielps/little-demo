import test from "@lib/BaseTest";
import * as util from "util";

test.describe("Profiles Sorting", () => {
    /**
     * TODO: review the AC or the task 
     * Task: https://msazure.visualstudio.com/RiskIQ/_workitems/edit/16509255
     */
    test(`Checks the Profiles Sorting`, async ({ homePage, profilePage }) => {
        const itemsTags = ["Threat actors", "Tool", "Backdoor"];
        //const itemsColumns = ["Profile", "Sponsored States", "Targets", "Defender TI Indicators"];
        const itemsColumns = ["Profile"];
        await test.step("Navigate to URL of Home", async () => {
            await homePage.navigateToURL();
        });
        await test.step("The user click on Projects button", async () => {
            await homePage.theUserClickOnTheProjectButton("Profiles");
        });
        for(const item of itemsTags){
            await test.step(util.format("The user click on tab %s", item), async()=>{
                await profilePage.clickOnTheTab(item);
            })
            for(const column of itemsColumns){
                await test.step(util.format("The user sort by colum %s", column), async()=>{
                    await profilePage.sortByColumn(column);
                })
             }
        }
    })

});