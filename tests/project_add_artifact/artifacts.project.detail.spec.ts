import test from "@lib/BaseTest";

test.describe("Artifacts Tests", () => {
  // Creation of Project
  //test.use({storageState:"notLoggedInState.json"})
  test(`Create an Artifact from the project detail view`, async ({
    projectsPage,
  }) => {
    await test.step("Navigate to URL of Projects", async () => {
      await projectsPage.navigateToURL();
    });
    await test.step("The user clicks on a random project and sets information", async () => {
      await projectsPage.clickOnRandomProject();
      await projectsPage.setProjectInformation();
    });
    await test.step("The user checks the add artifact dialog composition", async () => {
          await projectsPage.checksTheArtifactDialogIsLoadedProperly();
    });
    await test.step("The user checks the add artifact dialog function", async () => {
        await projectsPage.checksTheArtifactDialogIsWorkingProperly();
  });
    await test.step("The user creates an artifact from the project detail view", async () => {
      await projectsPage.createArtifact();
    });
  });

  test(`Delete artifact from project detail view`, async ({ projectsPage }) => {
    await test.step("Navigate to URL of Projects", async () => {
      await projectsPage.navigateToURL();
    });
    await test.step("The user clicks on a random project and sets information", async () => {
      await projectsPage.clickOnRandomProject();
      await projectsPage.setProjectInformation();
    });
    await test.step("The user Deletes an Artifact correctly", async () => {
      await projectsPage.deleteArtifactFromDetails();
    });
  });
});
