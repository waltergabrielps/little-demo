import { WebActions } from "@lib/WebActions";
import { ProjectsPageObjects } from "@objects/ProjectsPageObjects";
import { expect, Page } from "@playwright/test";
import AppContext from "@utils/AppContext";
import Constants from "@utils/Constants";
import Utils from "@utils/Utils";
import Project from "@model/Project";


let webActions: WebActions;

export class ProjectsPage extends ProjectsPageObjects {
  readonly page: Page;

  constructor(page: Page) {
    super();
    this.page = page;
    webActions = new WebActions(this.page);
  }

  async navigateToURL(): Promise<void> {
    await webActions.navigateToURL(`/projects`);
  }

  async clickOnTab(tab: string): Promise<void> {
    await webActions.clickLocator(
      this.page.locator(Utils.getLocatorByName(tab))
    );
  }

  async clickOnDiv(tab: string): Promise<void> {
    await webActions.clickLocator(
      this.page.locator(Utils.getDivByName(tab))
    );
  }

  async selectsTab(tab: string): Promise<void> {
    await webActions.verifyElementIsDisplayed(ProjectsPage.SIDE_BAR_CONTENT);
    await this.clickOnTab(tab);
  }

  async checksVisibilityOfFilters(tabs: string[]): Promise<void> {
    await webActions.verifyElementIsDisplayed(ProjectsPage.SIDE_BAR_CONTENT);
    for (let tab of tabs) {
      await this.clickOnDiv(tab);
      const count = Utils.getNumberFromText(
        await this.page.locator(getLocatorTypeByTitle(tab)).textContent()
      );
      if (count === 0) {
        return;
      }
      switch (tab) {
        case Constants.PROJECT_TABS.TEAM:
          await webActions.verifyElementIsDisplayed(
            ProjectsPage.getFilterByName(Constants.PROJECT_FILTERS.CREATOR)
          );
          await webActions.verifyElementIsDisplayed(
            ProjectsPage.getFilterByName(Constants.PROJECT_FILTERS.TAGS)
          );
          break;
        case Constants.PROJECT_TABS.MY:
        case Constants.PROJECT_TABS.SHARED:
          await webActions.verifyElementIsDisplayed(
            ProjectsPage.getFilterByName(Constants.PROJECT_FILTERS.TAGS)
          );
          break;
      }
    }
  }

  async checkTheCollumns(collumns: string[]): Promise<void> {
    collumns.forEach(async (col) => {
      await webActions.verifyElementIsDisplayed(getLocatorCollumnByTitle(col));
    });
  }

  async clickOnRandomProject(): Promise<void> {
    await webActions.verifyElementIsDisplayed(ProjectsPage.NAME_PROJECTS_LIST);
    await webActions.clickOnRandomLocator(ProjectsPage.NAME_PROJECTS_LIST);
  }

  async setProjectInfoByData(): Promise<void>{
    const currentProject = new Project(
      AppContext.getProjectName(),
      AppContext.getProjectPrivacy(),
      AppContext.getProjectDescription(),
      AppContext.getProjectTags()
    );
    AppContext.setCurrentProject(currentProject);
  } 

  async setProjectInformation(): Promise<void> {
    const projectName = await this.page
      .locator(ProjectsPage.PROJECT_TITLE)
      .textContent();
    const description = await this.page
      .locator(ProjectsPage.DESCRIPTION_VALUE)
      .textContent();
    const privacy = await this.page
      .locator(ProjectsPage.ITEMS_VALUES)
      .nth(0)
      .textContent();
    const tagsText = (await this.page
      .locator(ProjectsPage.TAGS_VALUE)
      .nth(0)
      .isVisible())
      ? await this.page.locator(ProjectsPage.TAGS_VALUE).allTextContents()
      : [];

    // let tagsArray = [];
    // if (tagsText) {
    //   tagsArray = tagsText.split("\n");
    // }
    const currentProject = new Project(
      projectName,
      privacy,
      description,
      tagsText
    );
    AppContext.setCurrentProject(currentProject);
  }

  async theUserClicksOnTheTab(name:string): Promise<void>{
    await webActions.clickElement(ProjectsPage.getTabByName(name));
  }

  async theTableShouldContainsColumns(name:string): Promise<void>{
    await webActions.verifyToBeVisible(ProjectsPage.getHistoryColumnByName(name));
  }

  async clickOnEditButton(): Promise<void> {
    await webActions.clickLocator(
      this.page.locator(ProjectsPage.EDIT_PROJECT_BUTTON)
    );
    await webActions.verifyElementIsDisplayed(ProjectsPage.DIALOG_TITLE);
  }

  async isTheDialogPrefilledCorrectly(): Promise<void> {
    const project = AppContext.getCurrentProject();
    // NAME
    const name = await this.page.locator(ProjectsPage.NAME_FIELD).inputValue();

    expect(name).toEqual(project.getProjectName());
    // PRIVACY
    const privacyArray = (
      await this.page.locator(ProjectsPage.PRIVACY_FIELD).textContent()
    ).split(" ");
    const privacy = getVisibilityByWord(
      privacyArray[privacyArray.length - 1].split("\n")[0]
    );
    expect(privacy).toEqual(project.getPrivacy());
    // DESCRIPTION
    const description = await this.page
      .locator(ProjectsPage.DESCRIPTION_FIELD)
      .inputValue();
    expect(description).toEqual(project.getDescription());
    // TAGS
    const tags = await this.page
      .locator(ProjectsPage.TAGS_VALUE_DIALOG)
      .allTextContents();
    const currentTags = project.getTags();
    expect(tags).toEqual(currentTags);
  }

  async checkProjectDialogStructure(): Promise<void> {
    await webActions.verifyToBeVisible(ProjectsPage.DIALOG_TITLE);
    await webActions.verifyElementContainsText(
      ProjectsPage.DIALOG_TITLE,
      "Edit Project"
    );
    await webActions.verifyToBeVisible(ProjectsPage.PRIVACY_LABEL);
    await webActions.verifyToBeVisible(ProjectsPage.PRIVACY_FIELD);
    await webActions.verifyToBeVisible(ProjectsPage.NAME_LABEL);
    await webActions.verifyToBeVisible(ProjectsPage.NAME_FIELD);
    await webActions.verifyToBeVisible(ProjectsPage.DESCRIPTION_LABEL);
    await webActions.verifyToBeVisible(ProjectsPage.DESCRIPTION_FIELD);
    await webActions.verifyToBeVisible(ProjectsPage.TAGS_LABEL);
    await webActions.verifyToBeVisible(ProjectsPage.TAGS_FIELD);
    await webActions.verifyToBeVisible(ProjectsPage.SAVE_BUTTON);
    await webActions.verifyToBeVisible(ProjectsPage.CANCEL_BUTTON);
  }

  async clickOnCancelButton(): Promise<void> {
    await webActions.clickElement(ProjectsPage.CANCEL_BUTTON);
    await webActions.verifyElementIsNotDisplayed(ProjectsPage.CANCEL_BUTTON);
  }

  async verifyToBeVisible(locator: string): Promise<void> {
    await webActions.verifyToBeVisible(locator);
  }

  async verifyToBeNotVisible(locator: string): Promise<void> {
    await webActions.verifyToBeNotVisible(locator);
  }

  async verifyProjectTitleContainsText(): Promise<void> {
    await webActions.verifyElementContainsText(
      ProjectsPage.PROJECT_TITLE,
      AppContext.getProjectName()
    );
  }

  async addTagOfProject(tags: string[], waitForNetwork = false): Promise<void> {
    const project = AppContext.getCurrentProject();
    for (const tag of tags) {
      await webActions.verifyElementIsDisplayed(ProjectsPage.TAGS_FIELD);
      await webActions.clickElement(ProjectsPage.TAGS_FIELD);
      await webActions.typeElementText(ProjectsPage.TAGS_FIELD, tag);
      await webActions.locatorKeyPress(ProjectsPage.TAGS_FIELD, "Enter");
      project.tags = [...project.tags, tag];
    }
    await webActions.clickElement(ProjectsPage.SAVE_BUTTON);
    // Wait Network
    if (waitForNetwork) {
      await Promise.all([
        this.page.waitForResponse(
          (resp) => {
            return resp.url().includes("/api/project") && resp.status() === 200;
          },
          { timeout: 3000 }
        ),
      ]);
    }
  }

  async modifyProjectValues(modifier: string): Promise<void> {
    const project = AppContext.getCurrentProject();
    // Modify Name
    await webActions.typeElementText(ProjectsPage.NAME_FIELD, modifier);
    //Modify Privacy
    let privacy = "Team";
    if (project.privacy === "Team") {
      privacy = "Analyst";
    }
    await webActions.selectOptionFromDivDropdown(
      ProjectsPage.PRIVACY_DROPDOWN,
      ProjectsPage.getOptionTargetByVisibility(privacy)
    );
    // Modify Description
    await webActions.enterElementText(ProjectsPage.DESCRIPTION_FIELD, "");
    await webActions.enterElementText(
      ProjectsPage.DESCRIPTION_FIELD,
      modifier + project.description
    );
    // Modify Tags
    await webActions.clickElement(ProjectsPage.TAGS_FIELD);
    await webActions.typeElementText(ProjectsPage.TAGS_FIELD, modifier);
    await webActions.locatorKeyPress(ProjectsPage.TAGS_FIELD, "Enter");
    // Save context project
    project.projectName = modifier + project.projectName;
    project.description = modifier + project.description;
    project.privacy = privacy;
    project.tags = [...project.tags, modifier];
    AppContext.setCurrentProject(project);
    // Save
    await webActions.clickElement(ProjectsPage.SAVE_BUTTON);
    // Wait Network
    await Promise.all([
      this.page.waitForResponse(
        (resp) => {
          return resp.url().includes("/api/project") && resp.status() === 200;
        },
        { timeout: 3000 }
      ),
    ]);
  }

  async createProject(name?: string): Promise<void> {
    const nameProject = name?name:"test_mindata_";  
    AppContext.setProjectName(nameProject + Date.now());
    const description = AppContext.getProjectName() + " description";
    await webActions.clickElement(ProjectsPage.PRIVACY);
    const dropdown_option_me = this.page
      .locator(ProjectsPage.DROPDOWN_OPTION)
      .nth(1);
    await webActions.clickLocator(dropdown_option_me);
    await webActions.enterElementText(
      ProjectsPage.NAME_PROJECT,
      AppContext.getProjectName()
    );
    await webActions.enterElementText(
      ProjectsPage.DESCRIPTION_PROJECT,
      description
    );
    await webActions.enterElementText(ProjectsPage.TAGS_FIELD, "test");
    await webActions.keyPress(ProjectsPage.TAGS_FIELD, "Tab");
    await webActions.clickElement(ProjectsPage.SAVE_BUTTON);
    AppContext.setProjectDescription(description);
    AppContext.setProjectPrivacy("");
    AppContext.setProjectTags(["test"]);
    await Promise.all([
      this.page.waitForResponse(
        (resp) => {
          return resp.url().includes("/api/project") && resp.status() === 200;
        },
        { timeout: 2000 }
      ),
    ]);
  }

  async createProjectWithParams(
    nameParam?: string,
    descriptionParam?: string,
    tagsParam?: string[],
    waitForNetwork = false
  ): Promise<void> {
    const name = nameParam || "test_mindata_" + Date.now();
    AppContext.setProjectName(name);
    const description =
      descriptionParam || AppContext.getProjectName() + " description";
    const tags = tagsParam || ["test"];
    await webActions.clickElement(ProjectsPage.ICON_ADD);
    await webActions.clickElement(ProjectsPage.PRIVACY);
    await webActions.enterElementText(ProjectsPage.NAME_PROJECT, name);
    await webActions.enterElementText(
      ProjectsPage.DESCRIPTION_PROJECT,
      description
    );
    for (const tag of tags) {
      await webActions.verifyElementIsDisplayed(ProjectsPage.TAGS_FIELD);
      await webActions.clickElement(ProjectsPage.TAGS_FIELD);
      await webActions.typeElementText(ProjectsPage.TAGS_FIELD, tag);
      await webActions.locatorKeyPress(ProjectsPage.TAGS_FIELD, "Enter");
    }
    await webActions.clickElement(ProjectsPage.SAVE_BUTTON);
    // Wait Network
    if (waitForNetwork) {
      await Promise.all([
        this.page.waitForResponse(
          (resp) => {
            return resp.url().includes("/api/project") && resp.status() === 200;
          },
          { timeout: 3000 }
        ),
      ]);
    }
  }

  async uploadProjectWithParams(
    nameParam?: string,
    descriptionParam?: string,
    tagsParam?: string[]
  ): Promise<void> {
    const name = nameParam || "test_mindata_" + Date.now();
    AppContext.setProjectName(name);
    const description =
      descriptionParam || AppContext.getProjectName() + " description";
    const tags = tagsParam || ["test"];
    await webActions.clickElement(ProjectsPage.ICON_ADD);
    await webActions.clickElement(ProjectsPage.PRIVACY);
    await webActions.enterElementText(ProjectsPage.NAME_PROJECT, name);
    await webActions.enterElementText(
      ProjectsPage.DESCRIPTION_PROJECT,
      description
    );
    for (const tag of tags) {
      await webActions.verifyElementIsDisplayed(ProjectsPage.TAGS_FIELD);
      await webActions.clickElement(ProjectsPage.TAGS_FIELD);
      await webActions.typeElementText(ProjectsPage.TAGS_FIELD, tag);
      await webActions.locatorKeyPress(ProjectsPage.TAGS_FIELD, "Enter");
    }
  }

  async checksMaximumCharactersOnField(field: string): Promise<void> {
    const option = field.toLowerCase();
    let word = "";
    switch (option) {
      case "name":
        word = Utils.genRandonString(201);
        await this.createProjectWithParams(word);
        break;
      case "description":
        word = Utils.genRandonString(5001);
        await this.createProjectWithParams(null, word);
        break;
      case "tags":
        word = Utils.genRandonString(201);
        await this.uploadProjectWithParams(null, null, [word]);
        break;
    }
    // Verify that error is present
    await webActions.verifyEitherElementIsDisplayed(
      ProjectsPage.ERROR_MESSAGE,
      ProjectsPage.ERROR_MESSAGE_2
    );
    await webActions.clickElement(ProjectsPage.CANCEL_BUTTON);
  }

  async checkDialogTitle(title: string): Promise<void> {
    await webActions.verifyElementContainsText(
      ProjectsPage.DIALOG_TITLE,
      title
    );
    // Check fields
    await webActions.verifyToBeVisible(ProjectsPage.PRIVACY_LABEL);
    await webActions.verifyToBeVisible(ProjectsPage.PRIVACY_FIELD);
    await webActions.verifyToBeVisible(ProjectsPage.NAME_LABEL);
    await webActions.verifyToBeVisible(ProjectsPage.NAME_FIELD);
    await webActions.verifyToBeVisible(ProjectsPage.DESCRIPTION_LABEL);
    await webActions.verifyToBeVisible(ProjectsPage.DESCRIPTION_FIELD);
    await webActions.verifyToBeVisible(ProjectsPage.TAGS_LABEL);
    await webActions.verifyToBeVisible(ProjectsPage.TAGS_FIELD);
    await webActions.verifyToBeVisible(ProjectsPage.SAVE_BUTTON);
    await webActions.verifyToBeVisible(ProjectsPage.CANCEL_BUTTON);
  }

  async isCancelButtonWorkingProperly(): Promise<void> {
    await webActions.clickElement(ProjectsPage.CANCEL_BUTTON);
    await webActions.verifyToBeNotVisible(ProjectsPage.DIALOG_TITLE);
  }

  async isProjectDetailsHeaderLoadedProperly(): Promise<void> {
    const ITEM_LABELS = ["Privacy", "Created on", "Created by"];
    await webActions.verifyArrayIsEqual(ProjectsPage.ITEM_LABELS, ITEM_LABELS);
    await webActions.verifyElementIsDisplayed(ProjectsPage.PROJECT_NAME_HEADER);
    await webActions.verifyElementIsDisplayed(
      ProjectsPage.CREATION_DATE_HEADER
    );
    await webActions.verifyElementIsDisplayed(ProjectsPage.TAGS_ITEMS);
    await webActions.verifyElementIsDisplayed(
      ProjectsPage.CREATED_BY_VALUE_HEADER
    );
    await webActions.verifyElementIsDisplayed(
      ProjectsPage.DESCRIPTION_VALUES_HEADER
    );
    await webActions.verifyElementIsDisplayed(ProjectsPage.PRIVACY_VALUE);
    await webActions.verifyElementIsDisplayed(
      ProjectsPage.DELETE_PROJECT_HEADER
    );
  }

  async areMandatoryFieldsWorkingProperly(): Promise<void> {
    await webActions.enterElementText(ProjectsPage.NAME_FIELD, "");
    await webActions.clickElement(ProjectsPage.SAVE_BUTTON);
    await webActions.verifyElementContainsText(
      ProjectsPage.ERROR_MESSAGE,
      "Required"
    );
  }

  async clickOnAddProjectButton(): Promise<void> {
    await webActions.clickElement(ProjectsPage.ICON_ADD);
    await this.page.waitForSelector(ProjectsPage.DIALOG_TITLE, {
      timeout: Constants.ELEMENT_TIME_OUT,
    });
  }

  async isDeleteConfirmationWorkingProperly(): Promise<void> {
    await webActions.clickElement(ProjectsPage.DELETE_PROJECT_HEADER);
    await this.page.waitForSelector(ProjectsPage.DIALOG_TITLE, {
      timeout: Constants.ELEMENT_TIME_OUT,
    });
    expect(
      await this.page.locator(ProjectsPage.DIALOG_TITLE).textContent()
    ).toEqual("Confirm Delete Project");
  }

  async isLeftPanelLoadedProperly(): Promise<void> {
    await webActions.verifyElementIsDisplayed(ProjectsPage.ICON_ADD);
    await webActions.verifyElementIsDisplayed(ProjectsPage.TITLE);
    await webActions.verifyElementIsDisplayed(ProjectsPage.NAVIGATION);
  }

  async isRightPanelLoadedProperly(): Promise<void> {
    await webActions.verifyElementIsDisplayed(ProjectsPage.TITLE_RIGHT_PANEL);
    await webActions.verifyElementIsDisplayed(ProjectsPage.DESCRIPTION);
    await webActions.verifyElementIsDisplayed(ProjectsPage.COMMAND_BAR);
    await webActions.verifyElementIsDisplayed(ProjectsPage.TABLE);
  }

  async areTypesLoadedProperly(types: string[]): Promise<void> {
    types.forEach(async (type) => {
      await webActions.verifyElementIsDisplayed(getLocatorTypeByTitle(type));
    });
  }

  async areLinksToDetailInNameColumn(type: string): Promise<void> {
    await webActions.clickElement(getLocatorTypeByTitle(type));
    await webActions.verifyElementIsDisplayed(
      ProjectsPage.LINK_NAME_PROJECTS_LIST
    );
  }

  async isPaginationMatching(type: string): Promise<void> {
    await webActions.clickElement(getLocatorTypeByTitle(type));
    const count = Utils.getNumberFromText(
      await this.page.locator(getLocatorTypeByTitle(type)).textContent()
    );
    if (count === 0) {
      return;
    }
    // Wait for rows to load
    await webActions.verifyElementIsDisplayed(ProjectsPage.DETAILS_ROW_CELL);
    const countRightPanel = Utils.getTotalFromPagination(
      await this.page.locator(ProjectsPage.PAGINATION).textContent()
    );

    expect(count).toEqual(countRightPanel);
  }

  async deleteProject(confirm: boolean): Promise<void> {
    // Get Delete Icon List
    const iconsToDelete = await this.page.locator(ProjectsPage.DELETE_PROJECTS);
    // Get Project name List
    const projectsToDelete = await this.page.locator(
      ProjectsPage.NAME_PROJECTS_LIST
    );
    // Generate random index
    const index = Utils.getRandomNumber((await iconsToDelete.count()) - 1);
    // Set project name to verify later
    AppContext.setProjectName(await projectsToDelete.nth(index).textContent());
    // Click on delete icon of selected project
    await webActions.clickLocator(iconsToDelete.nth(index));
    // Not Delete
    if (!confirm) {
      await webActions.clickElement(ProjectsPage.CANCEL_BUTTON);
    } else {
      // Delete
      await webActions.clickElement(ProjectsPage.SAVE_BUTTON);
    }
  }

  async isBreadcrumbDisplayedProperly(): Promise<void> {
    await webActions.verifyElementIsDisplayed(ProjectsPage.BREADCRUMB);
    const breadcrumbText = await this.page
      .locator(ProjectsPage.BREADCRUMB)
      .textContent();
    const breadcrumbArray = breadcrumbText.split(/[^a-zA-Z0-9-_.]/);
    breadcrumbArray.forEach((element, index) => {
      switch (index) {
        case 0:
          expect(element).toEqual("HomeHome");
          break;
        case 1:
          expect(element).toEqual("ProjectsProjects");
          break;
        case 2:
          expect(element).toEqual(
            AppContext.getCurrentProject().getProjectName() +
              AppContext.getCurrentProject().getProjectName()
          );
          break;
      }
    });
  }
  async checksDeleteFilter(): Promise<void> {
    await this.addFilter(Constants.PROJECT_FILTERS.TAGS);
    await this.deleteFilters();
    await webActions.verifyElementIsNotDisplayed(ProjectsPage.DELETE_FILTERS);
  }
  async checksMultipleFilters(): Promise<void> {
    await this.addFilter(Constants.PROJECT_FILTERS.TAGS);
    await this.addFilter(Constants.PROJECT_FILTERS.CREATOR);
    await this.deleteFilters();
    await webActions.verifyElementIsNotDisplayed(ProjectsPage.DELETE_FILTERS);
  }
  async checksSortingOnFilteredList(): Promise<void> {
    await this.addFilter(Constants.PROJECT_FILTERS.TAGS);
    await this.sortBy("Name");
  }
  async sortBy(name: string): Promise<void> {
    let column = ProjectsPage.getColumnByName(name);
    let list = await this.page
      .locator(ProjectsPage.getNameList())
      .allTextContents();
    await webActions.clickElement(column);
    let list2 = await this.page
      .locator(ProjectsPage.getNameList())
      .allTextContents();
    await webActions.areListsInComplementaryOrder(list, list2);
  }

  async addFilter(name: string): Promise<void> {
    await webActions.waitNetwork("/api/project/search", 200);
    await webActions.verifyElementIsNotDisplayed(ProjectsPage.SPINNER);
    let filter = ProjectsPage.getFilterByName(name);
    await webActions.verifyElementIsDisplayed(filter);
    await webActions.clickLocator(this.page.locator(filter));
    await webActions.clickOnRandomLocator(ProjectsPage.MENU_ITEM_BOX);
  }

  async deleteFilters(): Promise<void> {
    await webActions.clickLocator(
      this.page.locator(ProjectsPage.DELETE_FILTERS)
    );
  }

  async deleteArtifactFromDetails(): Promise<void> {
    await webActions.verifyElementIsNotDisplayed(ProjectsPage.SKELETON);
    const count = await webActions.getCount(ProjectsPage.LINK);
    if (count === 0) {  
      await webActions.verifyElementIsDisplayed(
        ProjectsPage.SECTION_NO_ARTIFACTS
      );
      await webActions.verifyElementText(
        ProjectsPage.SECTION_NO_ARTIFACTS,
        "No Artifacts found"
      );
    } else {
      // LINK has 3 values at the beggining: home, profiles, profiles. So we start at position 2.
      const index = Utils.getRandomNumberInRange(2, count);
      const selectedName = await this.page
        .locator(ProjectsPage.LINK)
        .nth(index)
        .textContent();
      // DELETE PROCESS
      await webActions.clickElementAtIndex(ProjectsPage.DELETE_PROJECTS, index);
      await webActions.clickElement(ProjectsPage.SAVE_BUTTON);
      await webActions.waitNetwork("/api/artifact", 200);
      await webActions.verifyToBeNotVisible(
        ProjectsPage.getArtifactLinkByName(selectedName)
      );
    }
  }
  async checksTheArtifactDialogIsLoadedProperly(): Promise<void> {
    // Clicks on Add Artifact
    await webActions.clickElement(ProjectsPage.ADD_ARTIFACT_BUTTON);
    // Checks the form composition
    await webActions.verifyElementIsDisplayed(ProjectsPage.ARTIFACT_TYPE_LABEL);
    await webActions.clickLocator(
      this.page.locator(ProjectsPage.ARTIFACT_INPUTS).nth(0)
    );
    const options = await this.page
      .locator(ProjectsPage.ARTIFACT_OPTIONS)
      .allInnerTexts();
    await webActions.verifyArrayIsEqual(ProjectsPage.ARTIFACT_OPTIONS, [
      "Domain",
      "IP",
    ]);
    await webActions.verifyElementIsDisplayed(ProjectsPage.ARTIFACT_NAME_LABEL);
    await webActions.verifyElementIsDisplayed(ProjectsPage.ARTIFACT_NAME_VALUE);
    await webActions.verifyElementIsDisplayed(ProjectsPage.ARTIFACT_TAGS_LABEL);
    await webActions.verifyElementIsDisplayed(ProjectsPage.ARTIFACT_TAGS_VALUE);
    await webActions.verifyElementIsDisplayed(ProjectsPage.SAVE_BUTTON);
    await webActions.verifyElementIsDisplayed(ProjectsPage.CANCEL_BUTTON);
  }
  async checksTheArtifactDialogIsWorkingProperly(): Promise<void> {
    // Checks mandatory fields working properly
    await webActions.clickElement(ProjectsPage.SAVE_BUTTON);
    await webActions.verifyEitherElementIsDisplayed(
      ProjectsPage.ERROR_MESSAGE,
      ProjectsPage.ERROR_MESSAGE_2
    );
    // Checks Cancel button does not save values in the dialog
    await webActions.typeElementText(
      ProjectsPage.ARTIFACT_NAME_VALUE,
      "google.com"
    );
    await webActions.clickElement(ProjectsPage.CANCEL_BUTTON);
    await webActions.clickElement(ProjectsPage.ADD_ARTIFACT_BUTTON);
    const name = await webActions.getText(ProjectsPage.ARTIFACT_NAME_VALUE);
    expect(name).toEqual("");
  }
  async createArtifact(): Promise<void> {
    // Saves an Artifact  
    // Select Type
    await webActions.clickElement(ProjectsPage.ARTIFACT_TYPE_VALUE);
    const dropdown_option_domain = this.page
      .locator(ProjectsPage.DROPDOWN_OPTION)
      .nth(0);
    await webActions.clickLocator(dropdown_option_domain);
    // Modify Tags
    await webActions.clickElement(ProjectsPage.TAGS_FIELD);
    await webActions.typeElementText(ProjectsPage.TAGS_FIELD, "Test", 100);
    await webActions.locatorKeyPress(ProjectsPage.TAGS_FIELD, "Enter");
    // Modify Name
    const domain = Utils.getRandomDomainNotInList(
      await this.page.locator(ProjectsPage.LINK).allTextContents()
    );
    await webActions.typeElementText(
      ProjectsPage.ARTIFACT_NAME_VALUE,
      domain,
      100
    );
    // Save Artifact
    await webActions.clickElement(ProjectsPage.SAVE_BUTTON);
    await webActions.waitNetwork("/api/artifact", 200, 50000);
    // Wait for GET of Artifacts list
    await this.waitForArtifactList();
    await webActions.verifyElementOnList(ProjectsPage.LINK, domain);
  }

  async clickOnProjectByName(): Promise<void> {
    const project = AppContext.getCurrentProject();
    await webActions.verifyElementIsDisplayed(
      ProjectsPage.getProjectByName(project.getProjectName())
    );
    await webActions.clickElement(
      ProjectsPage.getProjectByName(project.getProjectName())
    );
  }

  async checkNumberOfArtifacts(): Promise<void> {
    await webActions.verifyElementIsDisplayed(ProjectsPage.LIST_ARTIFACTS);
    const numberOfArtifacts = await webActions.getCount(
      ProjectsPage.LIST_ARTIFACTS
    );
    await webActions.expectToBeGreaterThan(numberOfArtifacts, 0);
  }

  private async waitForArtifactList() {
    await webActions.waitNetwork("/api/artifact?project_id=", 200);
    await webActions.verifyElementIsNotDisplayed(ProjectsPage.SKELETON);
  }

  async theUserAttemptsToDeleteThatProject() {
    const project = AppContext.getCurrentProject();
    await webActions.verifyElementIsDisplayed(
      ProjectsPage.getDeleteButtonByProjectName(project.getProjectName())
    );
    await webActions.clickElement(
      ProjectsPage.getDeleteButtonByProjectName(project.getProjectName())
    );
    await webActions.verifyElementIsDisplayed(ProjectsPage.SAVE_BUTTON);
    await webActions.clickElement(ProjectsPage.SAVE_BUTTON);
    await webActions.verifyElementIsNotDisplayed(ProjectsPage.DIV_MODAL);
    await webActions.verifyElementIsDisplayed(ProjectsPage.TOTAL_PROJECTS_LIST);
    await webActions.verifyToBeNotVisible(
      ProjectsPage.getProjectByName(project.getProjectName())
    );
  }

  async theUserSeeTheButtonDownloadInTheProjectType(): Promise<void>{
      await webActions.verifyElementIsDisplayed(ProjectsPage.DOWNLOAD_BUTTON);
      const [download] = await Promise.all([
        // Start waiting for the download
        this.page.waitForEvent("download"),
        // Perform the action that initiates download
        await webActions.clickElement(ProjectsPage.DOWNLOAD_BUTTON),
      ]);
  
      // Wait for the download process to complete
      const path = await download.path();
  
      // Reads the CSV file and saves it
      const header = Utils.getHeaderFromCSVFile(path)
      expect(header).toEqual(Constants.PROJECT_COLUMNS);
  }

}

// Util Function

function getTargetByNameProject(name: string): string {
  return this.page.locator(`.//a[text()='${name}']`);
}

function getVisibilityByWord(word: string) {
  if (word.includes("me")) {
    return "Analyst";
  }
  return "Team";
}

function getLocatorTypeByTitle(title: string) {
  return `//div[contains(text(), "${title}")]`;
}
function getLocatorCollumnByTitle(title: string) {
  return `//span[contains(text(), "${title}")]`;
}
