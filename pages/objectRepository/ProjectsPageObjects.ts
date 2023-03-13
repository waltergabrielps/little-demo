import * as util from "util";


export class ProjectsPageObjects {
  // LEFT PANEL
  protected static TITLE = '[data-qa="page-title"]';
  protected static ICON_ADD = '[data-icon-name="Add"]';
  protected static NAVIGATION = '[role="navigation"]';

  // RIGHT PANEL
  protected static TITLE_RIGHT_PANEL = '[data-qa="section-row"] [data-qa="h2"]';
  protected static DESCRIPTION =
    '[data-qa="section-row"] [data-qa="paragraph"]';
  protected static COMMAND_BAR = '[data-qa="command-bar"]';
  protected static TABLE = '[data-automationid="DetailsList"]';
  protected static TOTAL_PROJECTS_LIST = "[class*='ms-Button-label']";

  protected static PRIVACY = `[name='visibility']`;
  protected static DROPDOWN_OPTION = `[class*="ms-Dropdown-optionText"]`;
  protected static NAME_PROJECT = `[name='name']`;
  protected static DESCRIPTION_PROJECT = `[name='description']`;
  protected static TAGS_FIELD = `//input[@id="picker-tags"]`;
  protected static FIRST_OPTION = `[role='option'] [data-automationid='splitbuttonprimary']`;
  protected static SAVE_BUTTON = `[class*='ms-Dialog-actionsRight'] [class*='ms-Dialog-action'] [class*='ms-Button--primary']`;
  protected static CANCEL_BUTTON = `[class*='ms-Dialog-actionsRight'] [class*='ms-Dialog-action'] [class*='ms-Button--default']`;
  protected static NEXT_PAGE = `[aria-label="Next Page"]`;
  protected static DETAILS_ROW_CELL = `[data-automationid="DetailsRowCell"]`;
  protected static PROJECT_TITLE = `//h1`;
  protected static ERROR_MESSAGE = `[data-automation-id="error-message"]`;
  protected static ERROR_MESSAGE_2 = `[data-qa="errorMessage"]`;
  // DIALOG
  protected static DIALOG_TITLE = `[class*="ms-Dialog-title"]`;
  protected static PRIVACY_LABEL = '//label[contains(text(), "Privacy")]';
  protected static PRIVACY_FIELD =
    '//div[@data-qa="form-input" and @name="visibility"]';
  protected static NAME_LABEL = '//label[contains(text(), "Name")]';
  protected static NAME_FIELD = '//input[@name="name"]';
  protected static DESCRIPTION_LABEL =
    '//label[contains(text(), "Description")]';
  protected static DESCRIPTION_FIELD =
    '//textarea[@data-qa="form-input" and @name="description"]';
  protected static TAGS_LABEL = '//label[contains(text(), "Tags")]';

  protected static NAME_PROJECTS_LIST = '//div[@data-automation-key="name"]/a';
  protected static DELETE_PROJECTS =
    '[data-automation-key="actions"] [data-qa="icon-button"]';
  protected static DELETE_PROJECT_HEADER = '[data-icon-name="Delete"]';
  protected static EDIT_PROJECT_BUTTON = `[aria-label="Edit Project"]`;
  protected static DESCRIPTION_VALUE = `//h3[contains(text(), "Description")]/following-sibling::div`;
  protected static PRIVACY_VALUE = `//div[@data-qa="stack"]/div[@data-qa="item"][1]/div[@data-qa="value"]`;
  protected static ITEMS_VALUES = `[data-qa="value"]`;
  protected static TAGS_VALUE = `//div[@data-qa="section-column"]//div[starts-with(@class, "ms-StackItem sc-bdVaJa")]`;
  protected static TAGS_VALUE_DIALOG = '//span[starts-with(@class, "ms-TagItem")]';
  protected static PRIVACY_DROPDOWN = `[name="visibility"]`;
  protected static BREADCRUMB = `[data-qa="breadcrumb"]`;
  protected static LIST_CELL = `[data-automationid="DetailsList"] [data-automationid="ListCell"]`;
  protected static PT_LINK = `[data-qa="pt-link"]`;
  protected static LINK = `[data-qa="link"]`;
  protected static SECTION_NO_ARTIFACTS = `//div[@data-qa="section" and contains(text(), "No Artifacts found")]`;
  protected static ARTIFACT_INPUTS = `[data-qa="form-input"]`;
  protected static ARTIFACT_TYPE_LABEL = `//label[contains(text(), "Artifact Type")]`;
  protected static ARTIFACT_TYPE_VALUE = `[name="artifactType"]`;
  protected static ARTIFACT_NAME_LABEL = `//label[contains(text(), "Artifact Name")]`;
  protected static ARTIFACT_NAME_VALUE = `[name="artifactName"]`;
  protected static ARTIFACT_TAGS_LABEL = `//label[contains(text(), "Tags")]`;
  protected static ARTIFACT_TAGS_VALUE = `[id="picker-tags"]`;
  protected static ARTIFACT_OPTIONS = `[role="option"]`;
  protected static ADD_ARTIFACT_BUTTON = `//span[contains(text(), "Add Artifact")]`;
  protected static SKELETON = `[class*="ms-Shimmer-container"]`;
  protected static DIV_MODAL = `.ms-Modal`;
  protected static DOWNLOAD_BUTTON = `[data-icon-name="Download"]`;

  // DETAILS HEADER
  protected static CREATION_DATE_LABEL = `//div[@data-qa="stack"]/div[@data-qa="item"][2]/div[@data-qa="name"]`;
  protected static CREATION_DATE_HEADER =
    '//div[@data-qa="stack"]/div[@data-qa="item"][2]/div[@data-qa="value"]';
  protected static PROJECT_NAME_HEADER = '[data-qa="h1"]';
  protected static PROJECT_STATE_HEADER =
    '//div[contains(text(), "Active") or contains(text(), "Inactive")]';
  protected static VISIBILITY_LABEL_HEADER =
    '//div[@data-qa="stack"]/div[@data-qa="item"][1]/div[@data-qa="name"]';
  protected static CREATED_BY_LABEL_HEADER =
    '//div[@data-qa="stack"]/div[@data-qa="item"][3]/div[@data-qa="name"]';
  protected static CREATED_BY_VALUE_HEADER =
    '//div[@data-qa="stack"]/div[@data-qa="item"][3]/div[@data-qa="value"]';
  protected static TAGS_ITEMS =
    '//div[@data-qa="stack"]/div[@data-qa="stack-item"]';
  protected static DESCRIPTION_LABEL_HEADER =
    '//h3[contains(text(), "Description")]';
  protected static DESCRIPTION_VALUES_HEADER =
    '//h3[contains(text(), "Description")]/following-sibling::div';
  protected static ITEM_LABELS = '[data-qa="item"] [data-qa="name"]';
  protected static PAGINATION = `//span[@data-automationid="splitbuttonprimary"]//span[contains(text(), "of")]`;
  protected static LINK_NAME_PROJECTS_LIST =
    '[data-automation-key="name"] [data-qa="link"]';
  protected static SIDE_BAR_CONTENT = `[data-qa="sideBarContent"]`;
  protected static MENU_ITEM_BOX = `[role="menuitemcheckbox"]`;
  protected static SPINNER = `[data-qa="spinnerWrapper"]`;
  protected static DELETE_FILTERS = `[data-icon-name="Cancel"]`;
  protected static NAME_COLUMN = `[data-item-key="name"]`;
  protected static ARTIFACTS_COLUMN = `[data-item-key="artifact_ct"]`;
  protected static CREATOR_COLUMN = `[data-item-key="creator"]`;
  protected static DATE_COLUMN = `[data-item-key="created"]`;
  protected static TAGS_COLUMN = `[data-item-key="tags"]`;
  protected static ARROW_SORT_DOWN = `[data-icon-name="SortDown"]`;
  protected static ARROW_SORT_UP = `[data-icon-name="SortUp"]`;
  protected static BUTTON_CONFIRM = `.ms-Dialog-action .ms-Button--primary`;
  protected static LIST_ARTIFACTS = `[data-automationid="DetailsRowFields"]`;

  public static getOptionTargetByVisibility(visibility: string) {
    let text = "Accessible to anyone on my Team";
    if (visibility === "Analyst") {
      text = "Accessible only to me";
    }
    return `//span[contains(text(), "${text}")]`;
  }
  public static getArtifactLinkByName(name: string) {
    return `//a[@data-qa="pt-link" and contains(text(),"${name}")]`;
  }
  public static getFilterByName(name: string) {
    return `//button[@role='menuitem']//span[contains(text(), '${name}')]//..//..//i[@data-icon-name="ChevronDown"]`;
  }
  public static getNameList() {
    return `[data-automation-key="name"] [data-qa="link"]`;
  }
  public static getProjectByName(name: string){
    return util.format('xpath=//a[text()="%s"]', name);
  }

  public static getDeleteButtonByProjectName(name: string){
    return util.format("[title=\"Delete Project : %s\"]", name)  
  }

  public static getColumnByName(name: string) {
    switch (name) {
      case "Name":
        return this.NAME_COLUMN;
      case "Artifacts":
        return this.ARTIFACTS_COLUMN;
      case "Created By":
        return this.CREATOR_COLUMN;
      case "Date":
        return this.DATE_COLUMN;
      case "Tags":
        return this.TAGS_COLUMN;
    }
  }

  public static getTabByName(name: string){
    return util.format("//button[starts-with(@name, '%s')]", name);
  }


  public static getHistoryColumnByName(name: string){
    return util.format("//span[contains(@class, 'ms-DetailsHeader-cel') and text() = '%s']", name);
  }
}
