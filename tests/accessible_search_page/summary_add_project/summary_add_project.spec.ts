import test from "@lib/BaseTest";
import { WebActions } from "@lib/WebActions";
import { SearchPage } from "@pages/SearchPage";

test.describe("Search Summary add project", () => {
    // Save new project
    test(`Save new project`, async ({ homePage, searchPage,  projectsPage}) => {
        await test.step("Navigate to URL of Home", async () => {
            await homePage.navigateToURL();
        });
        await test.step("The user search by All with riskiq.net", async () => {
            await homePage.clickOnSearch();
            await homePage.searchByWord("All", "riskiq.net");
        });
        await test.step("the user click on in Add to project", async () => {
            await searchPage.theUserClickOnInAddProjectWithNew();
            await projectsPage.createProject("9_test_mindata_");
            await projectsPage.setProjectInfoByData();
            await searchPage.theUserClickOnInAddProject()
        });
        await test.step("The user attempts to add artifacts", async () => {
            await searchPage.theUserAttemptsToAddArtifacts(false);
            await homePage.theUserClickOnTheProjectButton("Projects");
            await projectsPage.clickOnTab("My Projects"); 
            await projectsPage.clickOnProjectByName();
            await projectsPage.checkNumberOfArtifacts();
          });
        await test.step("the user attempts to delete that project", async () =>{
            await homePage.theUserClickOnTheProjectButton("Projects");
            await projectsPage.clickOnTab("My Projects");  
            await projectsPage.theUserAttemptsToDeleteThatProject();
        });
    });  

    test(`Add to existing project`, async ({ homePage, searchPage,  projectsPage}) => {
        await test.step("Navigate to URL of Home", async () => {
            await homePage.navigateToURL();
        });
        await test.step("The user click on Projects button", async () => {
            await homePage.theUserClickOnTheProjectButton("Projects");
          });
          await test.step("The user create one project in My Projects section", async () => {
            await projectsPage.clickOnAddProjectButton();
            await projectsPage.createProject("9_test_mindata_");
            await projectsPage.verifyProjectTitleContainsText();
            await projectsPage.setProjectInformation();
          });
          await test.step("The user search by All with riskiq.net", async () => {
            await homePage.clickOnSearch();
            await homePage.searchByWord("All", "riskiq.net");
          });
          await test.step("The user attempts to add artifacts", async () => {
            await searchPage.theUserAttemptsToAddArtifacts(true);
            await homePage.theUserClickOnTheProjectButton("Projects");
            await projectsPage.clickOnTab("My Projects"); 
            await projectsPage.clickOnProjectByName();
            await projectsPage.checkNumberOfArtifacts();
          });
          await test.step("the user attempts to delete that project", async () =>{
            await homePage.theUserClickOnTheProjectButton("Projects");
            await projectsPage.clickOnTab("My Projects");  
            await projectsPage.theUserAttemptsToDeleteThatProject();
          });
        });
})