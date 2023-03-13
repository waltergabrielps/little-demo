import { WebActions } from "@lib/WebActions";
import test, { expect, Page } from "@playwright/test";
import { CveArticlePageObjects } from "@objects/CveArticlePageObjects";
import AppContext from "@utils/AppContext";
import Utils from "@utils/Utils";
import Constants from "@utils/Constants";
import CustomReporterConfig from "../../CustomReporterConfig";

let webActions: WebActions;

export class CveArticlePage extends CveArticlePageObjects {
  readonly page: Page;

  constructor(page: Page) {
    super();
    this.page = page;
    webActions = new WebActions(this.page);
  }

  async navigateToURL(): Promise<void> {
    await webActions.navigateToURL(`/`);
  }
  async checksHeader(): Promise<void> {
    // CVE Name
    await webActions.verifyElementIsDisplayed(
      CveArticlePage.getHeaderTitleByWord(AppContext.getSearchWord())
    );
    // Priority Score
    const scoreText = await this.page.locator(CveArticlePage.CVE_VALUES).nth(0).textContent();;
    const level = CveArticlePage.getScoringLevel(scoreText);
    const scoreLevel = CveArticlePage.getScoringLevelByScoreNumber(scoreText);
    const score = CveArticlePage.getScoreNumber(scoreText);

    // Check Score level
    expect(level).toEqual(scoreLevel);

    // Check Score color
    const icon = CveArticlePage.getScoringIconByScoreLevel(level);
    const fillColor = await webActions.getFillColor(icon);
    const correspondingColor =
      CveArticlePage.getScoringColorByScoreLevel(level);
    expect(fillColor).toEqual(correspondingColor);

    // CVE_LABELS
    webActions.verifyArrayIsEqual(
      CveArticlePage.CVE_LABELS,
      Constants.CVE_LABELS
    );
    // CVSS 2
    const cvss2 = this.page
      .locator(CveArticlePage.CVE_VALUES)
      .nth(Constants.CVE_LABELS.indexOf("CVSS 2"));
    const textCvss2 = await cvss2.textContent();
    const scoreCvss2 = Utils.getNumberFromText(textCvss2);
    CustomReporterConfig.consoleLog("asdf", textCvss2)
    if (scoreCvss2 > 0) {
      const levelCvss2 = CveArticlePage.getScoringLevel(textCvss2);
      expect(Constants.LEVELS).toContain(levelCvss2);
    } else {
      expect(textCvss2).toContainEqual("No Score");
    }
    // CVSS 3
    const cvss3 = this.page
      .locator(CveArticlePage.CVE_VALUES)
      .nth(Constants.CVE_LABELS.indexOf("CVSS 3"));
    const textCvss3 = await cvss3.textContent();
    const scoreCvss3 = Utils.getNumberFromText(textCvss3);
    if (scoreCvss3 > 0) {
      const levelCvss3 = CveArticlePage.getScoringLevel(textCvss3);
      expect(Constants.LEVELS).toContain(levelCvss3);
    } else {
      expect(textCvss3).toContainEqual("No Score");
    }
  }
  async checksTheTabs(tabs: string[]): Promise<void> {
    await webActions.verifyArrayIsEqual(CveArticlePage.CVE_TAB, tabs);
  }
  async checksDescription(): Promise<void> {
    const description = await this.page
      .locator(CveArticlePage.CONTENT_HEADER)
      .nth(0)
      .textContent();
    const strategies = await this.page
      .locator(CveArticlePage.CONTENT_HEADER)
      .nth(1)
      .textContent();

    expect(description).toEqual("Description");

    await webActions.verifyElementText(
      CveArticlePage.SUB_HEADER,
      'This information is provided "as is". Microsoft recommends that you validate applicability before implementing in your own environment.'
    );

    expect(strategies).toEqual(
      "Mitigation strategies" ||
        "References (Advisories, Solutions, and Mitigation)"
    );
  }

  async navigateToTab(tab: string): Promise<void> {
    const tabElement = CveArticlePage.getTabByName(tab);
    await webActions.clickElement(tabElement);
  }

  async isThePaginationComponentMatching(tab: string): Promise<void> {
    const tabElement = CveArticlePage.getTabByName(tab);
    const text = await webActions.getText(tabElement);
    const count = Utils.getNumberFromText(text);
    if (count === 0) {
      await this.checkNoDataText(tab);
      return;
    }
    const pagination = await webActions.getText(CveArticlePage.PAGINATION);
    const countPagination = Utils.getTotalFromPagination(pagination);
    expect(count).toEqual(countPagination);
  }
  private async checkNoDataText(tab: string) {
    const noData = await webActions.getText(CveArticlePage.NO_DATA);
    const element = tab.split(" ")[1].toLowerCase();
    expect(noData).toEqual(`No ${element} to display`);
  }
  async checksTheRightPanel() {
    // Card Titles
    await webActions.verifyArrayContains(CveArticlePage.CARD_TITLES, Constants.CVE_TITLES_RIGHT)
    // Intelligence Items
    await webActions.verifyArrayIsEqual(CveArticlePage.INTELLIGENCE_LIST_ITEMS, Constants.INTELLIGENCE_LIST_ITEMS)
    // Exploit links
    await webActions.verifyElementIsDisplayed(CveArticlePage.EXPLOIT_LINKS);
  }

  async isThePageSize(size: number, tab: string): Promise<void> {
    // Total size of tab
    const tabElement = CveArticlePage.getTabByName(tab);
    const textTab = await webActions.getText(tabElement);
    const total = Utils.getNumberFromText(textTab);
    if (total === 0) {
      await this.checkNoDataText(tab);
      return;
    }
    // Pagination size
    const textPagination = await webActions.getText(CveArticlePage.PAGINATION);
    const countPagination = Utils.getPageSizeFromText(textPagination);
    if (total < size) {
      expect(countPagination).toEqual(total);
    } else {
      expect(countPagination).toEqual(size);
    }
  }
}
