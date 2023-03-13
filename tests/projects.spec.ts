import test from "@lib/BaseTest";
import AppContext from "@utils/AppContext";
import Utils from "@utils/Utils";

test.describe("Project Tests", () => {
  // Creation of Project
  //test.use({storageState:"notLoggedInState.json"})
  test(`Create project`, async ({ projectsPage }) => {
    await test.step("Navigate to URL of Projects", async () => {
      await projectsPage.navigateToURL();
    });
    await test.step("The user clicks on the add button and the  dialog is opened", async () => {
      await projectsPage.clickOnAddProjectButton();
    });
    await test.step("Creation of Project", async () => {
      await projectsPage.createProject();
    });
    await test.step("Verify that the Project Title is correct", async () => {
      await projectsPage.verifyProjectTitleContainsText();
    });
  });
  // Maximum characters on project creation
  test(`Checks the maximum of characters on project creation`, async ({
    projectsPage,
  }) => {
    await test.step("Navigate to URL of Projects", async () => {
      await projectsPage.navigateToURL();
    });
    await test.step("Checks the maximum characters on Name", async () => {
      await projectsPage.checksMaximumCharactersOnField("Name");
    });
    await test.step("Checks the maximum characters on Description", async () => {
      await projectsPage.checksMaximumCharactersOnField("Description");
    });
    await test.step("Checks the maximum characters on Tags", async () => {
      await projectsPage.checksMaximumCharactersOnField("Tags");
    });
  });

  // Project Dialog tests
  test(`Project Dialog test`, async ({ projectsPage }) => {
    await test.step("Navigate to URL of Projects", async () => {
      await projectsPage.navigateToURL();
    });
    await test.step("The user clicks on the add button and the  dialog is opened", async () => {
      await projectsPage.clickOnAddProjectButton();
    });
    await test.step("The dialog is loaded properly with the title 'New Project'", async () => {
      await projectsPage.checkDialogTitle("New Project");
    });
    await test.step("The cancel button works properly", async () => {
      await projectsPage.isCancelButtonWorkingProperly();
    });
    await test.step("The user clicks on the add button after checking the cancel button", async () => {
      await projectsPage.clickOnAddProjectButton();
    });
    await test.step("The mandatory fields indicate when they are not filled and also prevent the closing of the dialog", async () => {
      await projectsPage.areMandatoryFieldsWorkingProperly();
    });
    await test.step("Creation of Project", async () => {
      await projectsPage.createProject();
    });
    await test.step("The dialog closes when the project is saved and redirects to the detail view", async () => {
      await projectsPage.verifyProjectTitleContainsText();
    });
  });

  // Project Delete tests
  test(`Project Delete - Cancel Project Deletion`, async ({ projectsPage }) => {
    await test.step("Navigate to URL of Projects", async () => {
      await projectsPage.navigateToURL();
    });
    await test.step("The user clicks on My Projects", async () => {
      await projectsPage.clickOnDiv("My Projects");
    });
    await test.step("The user cancel project deletion", async () => {
      await projectsPage.deleteProject(false);
    });
    await test.step("Checks the project is not visible", async () => {
      await projectsPage.verifyToBeVisible(
        Utils.getLocatorByName(AppContext.getProjectName())
      );
    });
  });

  // Project Delete
  test(`Project Delete - Confirm Project Deletion`, async ({
    projectsPage,
  }) => {
    await test.step("Navigate to URL of Projects", async () => {
      await projectsPage.navigateToURL();
    });
    await test.step("The user clicks on My Projects", async () => {
      await projectsPage.clickOnDiv("My Projects");
    });
    await test.step("The user confirm project deletion", async () => {
      await projectsPage.deleteProject(true);
    });
    await test.step("Checks the project is not visible", async () => {
      await projectsPage.verifyToBeNotVisible(
        Utils.getLocatorByName(AppContext.getProjectName())
      );
    });
  });

  // Project Edit Dialog
  test(`Project Edit Dialog`, async ({ projectsPage }) => {
    await test.step("Navigate to URL of Projects", async () => {
      await projectsPage.navigateToURL();
    });
    await test.step("The user clicks on My Projects", async () => {
      await projectsPage.clickOnDiv("My Projects");
    });
    await test.step("The user clicks on a random project", async () => {
      await projectsPage.clickOnRandomProject();
      await projectsPage.setProjectInformation();
    });
    await test.step("The user clicks on the Edit Project Button", async () => {
      await projectsPage.clickOnEditButton();
    });
    await test.step("The dialog is loaded properly with the title 'Edit Project'", async () => {
      await projectsPage.checkProjectDialogStructure();
    });
    await test.step("The dialog is prefilled with the corresponding values", async () => {
      await projectsPage.isTheDialogPrefilledCorrectly();
    });
    await test.step("The user modifies the project", async () => {
      await projectsPage.modifyProjectValues("edited_");
    });
    await test.step("The user clicks on the Edit Project Button", async () => {
      await projectsPage.clickOnEditButton();
    });
    await test.step("The dialog closes when the project is saved and the values are updated", async () => {
      await projectsPage.isTheDialogPrefilledCorrectly();
    });
  });

  // Project Details Header
  test(`Project Details Header`, async ({ projectsPage }) => {
    await test.step("Navigate to URL of Projects", async () => {
      await projectsPage.navigateToURL();
    });
    await test.step("The user clicks on My Projects", async () => {
      await projectsPage.clickOnDiv("My Projects");
    });
    await test.step("The user clicks on a random project", async () => {
      await projectsPage.clickOnRandomProject();
      await projectsPage.setProjectInformation();
    });
    await test.step("The breadcrumb element is displayed properly", async () => {
      await projectsPage.isBreadcrumbDisplayedProperly();
    });
    await test.step("The edit button displays an edit pop up window on press", async () => {
      await projectsPage.clickOnEditButton();
      await projectsPage.isCancelButtonWorkingProperly();
    });
    await test.step("The delete button displays a confirmation pop up window on press", async () => {
      await projectsPage.isDeleteConfirmationWorkingProperly();
      await projectsPage.isCancelButtonWorkingProperly();
    });
    await test.step("The project details are loaded properly", async () => {
      await projectsPage.isProjectDetailsHeaderLoadedProperly();
    });
  });

  // Core Project List
  test(`Core Project List`, async ({ projectsPage }) => {
    await test.step("Navigate to URL of Projects", async () => {
      await projectsPage.navigateToURL();
    });
    await test.step("The left panel is loaded properly", async () => {
      await projectsPage.isLeftPanelLoadedProperly();
    });
    await test.step("The user has 3 types in left project panel", async () => {
      await projectsPage.areTypesLoadedProperly([
        "Team Projects",
        "My Projects",
        "Shared Projects",
      ]);
    });
    await test.step("The right panel is loaded properly", async () => {
      await projectsPage.isRightPanelLoadedProperly();
    });
  });

  test(`Core Project List Columns`, async ({ projectsPage }) => {

    await test.step("Navigate to URL of Projects", async () => {
      await projectsPage.navigateToURL();
    });

    await test.step("The user see the columns of Team Projects called", async () => {
      await projectsPage.checkTheCollumns([
        "Name",
        "Artifacts",
        "Created By",
        "Date",
        "Tags",
        "Actions",
      ]);
    });

    await test.step("The user clicks on My Projects", async () => {
      await projectsPage.clickOnDiv("My Projects");
    });

    await test.step("The user see the columns of My Projects called", async () => {
      await projectsPage.checkTheCollumns([
        "Name",
        "Artifacts",
        "Date",
        "Tags",
        "Actions",
      ]);
    });

    await test.step("The user clicks on Shared Projects", async () => {
      await projectsPage.clickOnDiv("Shared Projects");
    });

    await test.step("The user see the columns of Shared Projects called", async () => {
      await projectsPage.checkTheCollumns([
        "Name",
        "Artifacts",
        "Created By",
        "Date",
        "Tags",
        "Actions",
      ]);
    });

  });

  
  test(`Core Project Pagination match`, async ({ projectsPage }) => {
    await test.step("Navigate to URL of Projects", async () => {
      await projectsPage.navigateToURL();
    });
    await test.step("The user should see matching total count with the total items in the right panel on Team Projects", async () => {
      await projectsPage.isPaginationMatching("Team Projects")
    });
    await test.step("The user should see matching total count with the total items in the right panel on My Projects", async () => {
      await projectsPage.isPaginationMatching("My Projects")
    });
    await test.step("The user should see matching total count with the total items in the right panel on Shared Projects", async () => {
      await projectsPage.isPaginationMatching("Shared Projects")
    });
  });
  
  test(`Core Project Licenced user sees the link to description`, async ({ projectsPage }) => {
    await test.step("Navigate to URL of Projects", async () => {
      await projectsPage.navigateToURL();
    });
    await test.step("The user sees the link to description in names column of projects type", async () => {
      await projectsPage.areLinksToDetailInNameColumn("My Projects")
    });
  });
  
});
