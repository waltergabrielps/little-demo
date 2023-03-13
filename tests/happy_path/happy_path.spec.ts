import test from "@lib/BaseTest";
import * as util from "util";
import AppContext from "@utils/AppContext";

test.describe("Happy Path", () => {
    // Header of Project
    test(`User completes the happy path without errors`, async ({ homePage, projectsPage, searchPage}) => {
      await test.step("Navigate to URL of Home", async () => {
        await homePage.navigateToURL();
      });
      await test.step("The user sees the images of home articles loading in no more than 5 seconds", async () => {
        await homePage.areArticlesImagesLoadedInSeconds(5000);
      });
      await test.step("The user click on Projects button", async () => {
        await homePage.theUserClickOnTheProjectButton("Projects");
      });
      await test.step("The user create one project in My Projects section", async () => {
        await projectsPage.clickOnAddProjectButton();
        await projectsPage.createProject();
        await projectsPage.verifyProjectTitleContainsText();
        await projectsPage.setProjectInformation();
      });
      await test.step("The user clicks on the Edit Project Button", async () => {
        await projectsPage.clickOnEditButton();
        await projectsPage.checkProjectDialogStructure();
        await projectsPage.isTheDialogPrefilledCorrectly();
        await projectsPage.modifyProjectValues("1_edited_");
      });
      await test.step("the user attempts to add tags", async () => {
        let tags = [util.format("TagTest1%s", Date.now()), util.format("TagTest2%s", Date.now())];  
        await projectsPage.clickOnEditButton();
        await projectsPage.isTheDialogPrefilledCorrectly();
        await projectsPage.addTagOfProject(tags);
        await projectsPage.clickOnEditButton();
        await projectsPage.isTheDialogPrefilledCorrectly();
        await projectsPage.clickOnCancelButton();
      });
      await test.step("The user search by All with google.com", async () => {
        await homePage.clickOnSearch();
        await homePage.searchByWord("All", "google.com");
      });
      await test.step("The user attempts to add artifacts", async () => {
        await searchPage.theUserAttemptsToAddArtifacts(true);
        await homePage.theUserClickOnTheProjectButton("Projects");
        await projectsPage.clickOnDiv("My Projects"); 
        await projectsPage.clickOnProjectByName();
        await projectsPage.checkNumberOfArtifacts();
      });
      await test.step("the user attempts to delete that project", async () =>{
        await homePage.theUserClickOnTheProjectButton("Projects");
        await projectsPage.clickOnDiv("My Projects");  
        await projectsPage.theUserAttemptsToDeleteThatProject();
      });
    });
});