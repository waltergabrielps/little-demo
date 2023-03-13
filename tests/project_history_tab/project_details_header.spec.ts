import test from "@lib/BaseTest";
import * as util from "util";

test.describe("Project History tab", () => {

    test(`Checks the Project History tab`, async ({ homePage, projectsPage, searchPage }) => {
        const itemsColums = ["Date", "Action", "By User", "Description"];
        await test.step("Navigate to URL of Home", async () => {
            await homePage.navigateToURL();
        });
        await test.step("The user click on Projects button", async () => {
            await homePage.theUserClickOnTheProjectButton("Projects");
        });
        await test.step("The user clicks on a random project", async () => {
            await projectsPage.clickOnRandomProject();
        });
        await test.step("the user clicks on the History Project Tab", async()=>{
            await projectsPage.theUserClicksOnTheTab("History");
        });
        for(const item of itemsColums){
            await test.step(util.format("the table Should contains Columns %s on Project Details", item), async()=>{
                await projectsPage.theTableShouldContainsColumns(item);
            });
        }
        /*
        TODO: 
        * review the step for bug 
        * https://msazure.visualstudio.com/RiskIQ/_workitems/edit/16526861 
        */
        /*await test.step("Sorting by 'Date' is 'descending' by default", async () => {
            await searchPage.sortingByIsByDefault(
              "Date",
              "descending",
              "History"
            );
        });*/
    })
})