import Utils from "@utils/Utils";
import * as util from "util";

export class SearchPageObjects {
  protected static EDIT_TAGS = '(//button[@role="menuitem"])[1]';
  protected static INPUT_TAGS = '[id="picker-tags"]';
  protected static SAVE_TAGS =
    '(//div[contains(@class,"ms-Dialog-actions")]//button)[1]';
  protected static CANCEL_TAGS =
    '(//div[contains(@class,"ms-Dialog-actions")]//button)[2]';
  protected static DELELTE_TAGS = '//div[@role="listitem"]//button';

  public static SEARCH_HEADING = "h1";
  protected static ADD_ARTIFACTS_BUTTON = '//i[@data-icon-name="FabricFolder"]';
  protected static SELECTED_PROJECT_ITEM =
    '[role="presentation"] [data-qa="listItem"]';
  protected static SELECTED_ITEM =
    '[role="presentation"] [data-qa="listItem"] [data-qa="iconWrapper"]';
  protected static SELECTED_ITEM_COUNT =
    '[role="presentation"] [data-qa="listItem"] [data-qa="wrapper"]';
  protected static DIV_CONTAINS_SELECTED =
    '//ul[contains(@class, "ms-ContextualMenu-list is-open")]';

  protected static LIST_ITEMS = '[role="listitem"]';
  protected static DETAILS_ROW_FIELDS =
    '[data-automationid="DetailsRowFields"]';
  protected static PAGINATION_COMPONENT = '//span[contains(text(), " of")]';
  protected static DETAILS_COLUMNS =
    '[data-automationid="ColumnsHeaderColumn"] [class*="cellName"]';
  public static DOWNLOAD_ICON = '[data-icon-name="Download"]';
  public static LIST_CELL = '[data-automationid="ListCell"]';
  public static FILTERS_LIST =
    '[data-qa="datalist-filters"] [data-automationid="splitbuttonprimary"]';
  public static LIST_ITEM_POPULAR = '//li[@role="presentation"]';
  public static ADD_NEW_PROJECT = '[data-qa="summarySearchText"]';

  public static TITLE = '[data-qa="h3"]';
  public static DESCRIPTION = '[data-qa="itemSummary"]';
  public static ARTIFACT_COUNT = '[data-qa="metaCount"]';
  public static CREATION_DATE = '[data-qa="metaAgo"]';
  public static TAGS_ARTICLES =
    "//div[@data-qa='compactItem']/div[@data-qa='stack']/div[@data-qa='wrapper']/div[@data-qa='value']//parent::div//following::div[2]";
  public static CREATED_BY_NAME = '[data-qa="compactItem"] [data-qa="name"]';
  public static CREATED_BY_VALUE =
    "//div[@data-qa='compactItem']/div[@data-qa='stack']/div[@data-qa='wrapper']/div[@data-qa='name']//following-sibling::div";
  public static TAGS =
    "//div[@data-qa='compactItem']/div[@data-qa='stack']/div[@data-qa='wrapper']/div[@data-qa='name']//parent::div//following::div[2]";
  public static DETAILS_LIST = '[data-automationid="DetailsList"]';
  public static MAIN_PANEL = "[data-qa=main]";

  public static ARTICLES_LIST = '//..//..//div[@data-qa="card-content"]';
  public static SUMMARY_CARD_LIST = '[data-qa="card"]';
  public static ICON_BUTTON_DOW = '[data-icon-name="ChevronDownMed"]';
  public static CARD_CONTENT = '[data-qa="card-content"]';

  public static SCORE_CARD =
    '//div[@data-qa="cardTitle"]//div[@data-qa="wrapper"]/following-sibling::strong';
  public static SEVERITY_COLUMN = '[data-item-key="severity"]';
  public static RULE_COLUMN = '[data-item-key="name"]';
  public static DESCRIPTION_COLUMN = '[data-item-key="description"]';
  public static SEVERITY_CARD =
    '[data-qa="card-content"] [data-item-key="severity"]';
  public static SEVERITY_GRIDCELL = '[data-automation-key="severity"]';   
  public static RULE_GRIDCELL = '[data-automation-key="name"]';   
  public static DESCRIPTION_GRIDCELL = '[data-automation-key="description"]';   

  public static CIRCLE_SEVERITY_UNKNOWN =
    '[data-qa="cardTitle"] [data-qa="unknown"]';
  public static CIRCLE_SEVERITY_NEUTRAL =
    '[data-qa="cardTitle"] [data-qa="low"]';
  public static CIRCLE_SEVERITY_SUSPICIOUS =
    '[data-qa="cardTitle"] [data-qa="medium"]';
  public static CIRCLE_SEVERITY_MALICIOUS =
    '[data-qa="cardTitle"] [data-qa="high"]';
  public static TYPE_COLUMN =
    '[data-automation-key="type"]';

  public static getDivWithTag(tag: string) {
    return util.format('//div[text()="%s"]', tag.toLocaleLowerCase());
  }

  public static getOptionOnArtifactsByProjectName(project: string): string {
    return util.format('//div[text()="%s"]', project);
  }

  public static getButtonAddToProject(name: string): string {
    return util.format('[aria-label="%s"]', name);
  }

  public static getCellsOfColumn(column: string) {
    const columnKey = this.getStringKeyOfColumn(column);
    if (Utils.isInClickableColumns(column)) {
      return `//div[@data-automation-key=\"${columnKey}\"]/a`;
    } else {
      return `//div[@data-automation-key=\"${columnKey}\"]`;
    }
  }

  public static getArrowIconOnColumn(column: string, order: string) {
    const columnKey = this.getStringKeyOfColumn(column);
    const orderKey = this.getStringKeyOfOrder(order);
    return `[data-item-key="${columnKey}"] [data-icon-name="${orderKey}"]`;
  }
  public static getStringKeyOfColumn(column: string) {
    const columnArray = column.split(" ");
    let key = columnArray[0].toLowerCase();
    if (columnArray.length > 1) {
      key += columnArray[1];
    }
    return key;
  }

  public static getStringKeyOfOrder(order: string) {
    if (order === "ascending") {
      return "SortUp";
    } else {
      return "SortDown";
    }
  }
  public static getHeaderOfColumn(column: string) {
    const columnKey = this.getStringKeyOfColumn(column);
    return `[data-item-key=\"${columnKey}\"]`;
  }
  public static getTabByName(name: string) {
    return Utils.getButtonStartsWithName(name);
  }
  public static getDivByName(name: string) {
    return Utils.getDivByName(name);
  }
  public static getTargetByContent(name: string) {
    return Utils.getTargetByContent(name);
  }

  protected static DATA_TAB = '//button[@data-content="Data"]';
  protected static DNS_TAB = '//*[@id="appContent"]/div[2]/div[4]/div[1]/div/nav/div[1]/div/ul/li[9]/div';
  protected static REVERSE_DNS_TAB = '//div[contains(text(), "Reverse DNS")]';
  

}
