import test from "@lib/BaseTest";
import * as util from "util";

test.describe("Project list download", () => {
    test(`User see the button download`, async ({ homePage, projectsPage, searchPage }) => {
        const itemsProjects = ["Team Projects", "My Projects", "Shared Projects"];
        await test.step("Navigate to URL of Home", async () => {
            await homePage.navigateToURL();
        });
        await test.step("The user click on Projects button", async () => {
            await homePage.theUserClickOnTheProjectButton("Projects");
        });
        for(const item of itemsProjects){
            await test.step(util.format("user see the button download in the project type %s", item), async()=>{
                await projectsPage.clickOnDiv(item); 
                await projectsPage.theUserSeeTheButtonDownloadInTheProjectType(); 
            })
        }    
    })
})