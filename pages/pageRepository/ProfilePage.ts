import { WebActions } from "@lib/WebActions";
import { ProfilePageObjects } from "@objects/ProfilePageObjects";
import Project from "@model/Project";
import type { Page } from "@playwright/test";
import Constants from "@utils/Constants";
import Utils from "@utils/Utils";
import CustomReporterConfig from "../../CustomReporterConfig";
import { testConfig } from "../../testConfig";

let webActions: WebActions;

export class ProfilePage extends ProfilePageObjects {
  readonly page: Page;

  constructor(page: Page) {
    super();
    this.page = page;
    webActions = new WebActions(this.page);
  }

  async clickOnTheTab(name: string){
    await webActions.verifyElementIsDisplayed(ProfilePage.getButtonByName(name));
    await webActions.clickElement(ProfilePage.getButtonByName(name))
  }

  async checkTheNumberOnItem(name: string): Promise<void>{
    await webActions.verifyElementIsDisplayed(ProfilePage.getButtonByName(name));
    const total = parseInt(await webActions.getCountOfButtonTab(name, "name"));
    await webActions.verifyElementIsDisplayed(ProfilePage.DETAILS_LIST_ROW);
    const totalRows = await webActions.getCount(ProfilePage.DETAILS_LIST_ROW);
    await webActions.expectToBeEqual(total, totalRows);
  }
  
  async sortByColumn(name: string){
    await webActions.verifyElementIsDisplayed(ProfilePage.getLocatorColumnByTitle(name));
    const column = this.page.locator(ProfilePage.getLocatorColumnByTitle(name));
    const typeSort = column.locator(ProfilePage.ICON_SORT);
    await webActions.expectToBeTrue(await typeSort.isVisible(), "The icon isn't visible");
    const typeSortAttribute = await typeSort.getAttribute("data-icon-name");
    await webActions.expectToBeStrictEqual("SortUp", typeSortAttribute, "The text isn't equal");
    await webActions.clickElement(ProfilePage.getLocatorColumnByTitle(name));
    const columnTwo = this.page.locator(ProfilePage.getLocatorColumnByTitle(name))
    const typeSortTwo = await columnTwo.locator(ProfilePage.ICON_SORT).getAttribute("data-icon-name")
    await webActions.expectToBeStrictEqual("SortDown", typeSortTwo, "The text isn't equal");
    // Reset order 
    await webActions.clickElement(ProfilePage.getLocatorColumnByTitle(name));


  }

  async navigateToURL(): Promise<void> {
    await webActions.navigateToURL("/intel-profiles/");
  }
  async pickARandomProfile(): Promise<void> {
    await webActions.waitNetwork("/api/intel-profiles", 200);
    await webActions.verifyElementIsDisplayed(ProfilePage.DETAILS_LIST);
    const list = await this.page
      .locator(ProfilePage.PROFILE_TITLE)
      .allTextContents();
    CustomReporterConfig.consoleLog("LISTT", list);
    const index = Utils.getRandomNumber(list.length);
    await webActions.clickElementAtIndex(ProfilePage.PROFILE_TITLE, index);
  }
  async clicksOnIndicatorsTab(): Promise<void> {
    await webActions.verifyElementIsDisplayed(ProfilePage.INDICATORS_TAB);
    await webActions.clickElement(ProfilePage.INDICATORS_TAB);
  }
  async checksLabelsAndValuesFromIndicatorsTab(): Promise<void> {
    // Checks label names
    await webActions.verifyArrayIsEqual(
      ProfilePage.LABEL_NAMES,
      Constants.PROFILE_INDICATORS_LABELS
    );
    // Checks that values are numbers
    const array = await this.page
      .locator(ProfilePage.LABEL_VALUES)
      .allTextContents();
    // Remove first value because are texts
    const arrayNumbers = array.splice(1, array.length);
    arrayNumbers.forEach(async (element) => {
      await webActions.isInteger(element);
    });
  }
  async checksDownloadButton() {
    await webActions.verifyElementIsDisplayed(ProfilePage.DOWNLOAD_ICON);
    await webActions.checksDownload(ProfilePage.DOWNLOAD_ICON);
  }
  async checksTheCollumns(collumns: string[]): Promise<void> {
    collumns.forEach(async (col) => {
      await webActions.verifyElementIsDisplayed(
        ProfilePage.getLocatorColumnByTitle(col)
      );
    });
  }
  async checksTheCollumnsAreDate(collumns: string[]): Promise<void> {
    collumns.forEach(async (col) => {
      const dates = await this.page
        .locator(Utils.getCellsOfColumn(col))
        .allTextContents();
      for (let date of dates) {
        if (date != "-") {
          await webActions.isDate(date);
        }
      }
    });
  }
  async checksTheCollumnSource(): Promise<void> {
    const cells = this.page.locator(Utils.getCellsOfColumn("Osint"));
    const values = await cells.allTextContents();
    let i = 0;
    for (let value of values) {
      await webActions.inArray(value, Constants.PROFILE_SOURCE)
      if (value === Constants.PROFILE_SOURCE[0]) {
        await webActions.veirfyIfLocatorIsLink(cells.nth(i));
      }
      i++;
    }
  }
  async checkBodyDescriptions():Promise<void>{
    await webActions.verifyElementIsDisplayed(ProfilePage.HEADER_IMG_ICON);
    await webActions.verifyElementIsDisplayed(ProfilePage.DETAILS_HEADER_DATE);
    await webActions.verifyElementIsDisplayed(ProfilePage.DETAILS_HEADER_LABEL);
    await webActions.verifyElementIsDisplayed(ProfilePage.DETAILS_TITLE);
    await webActions.verifyElementIsDisplayed(ProfilePage.DETAILS_TAB_DESCRIPTION);
    await webActions.verifyElementIsDisplayed(ProfilePage.DETAILS_TAB_TTPS);
    await webActions.verifyElementIsDisplayed(ProfilePage.INDICATORS_TAB);
    await webActions.verifyElementIsDisplayed(ProfilePage.DETAILS_TEXT);
    await webActions.verifyElementIsDisplayed(ProfilePage.DETAILS_SECTIONS);
  }

  async checkTheTextDescription(): Promise<void>{
    await webActions.verifyElementIsDisplayed(ProfilePage.PAGE_HEADER_TITLE);   
    await webActions.verifyElementIsDisplayed(ProfilePage.PAGE_HEADER_DESCRIPTION);
    await webActions.verifyElementTextContain(ProfilePage.PAGE_HEADER_TITLE, "Intel Profiles");   
    await webActions.verifyElementTextContain(ProfilePage.PAGE_HEADER_DESCRIPTION, "We use automated discovery and continuous scanning across worldwide infrastructure to map and monitor threats and threat actors. Rapidly identify adversary-threat infrastructure for actionable indicators and TTPs drawn directly from threat infrastructure, including history, distribution, trends, and guided insights from our threat researchers. Identify adversary-threat infrastructure—from a single threat actor to thousands.");    
  }

  async checkTheColumList(name: string): Promise<void>{
    await webActions.verifyElementIsDisplayed(ProfilePage.getLocatorColumnByTitle(name));
  }
}
