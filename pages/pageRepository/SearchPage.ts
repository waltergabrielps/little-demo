import { WebActions } from "@lib/WebActions";
import { SearchPageObjects } from "@objects/SearchPageObjects";
import { expect, Page } from "@playwright/test";
import AppContext from "@utils/AppContext";
import Constants from "@utils/Constants";
import Utils from "@utils/Utils";
import CustomReporterConfig from "../../CustomReporterConfig";
import { ArticlePage } from "./ArticlePage";

let webActions: WebActions;

export class SearchPage extends SearchPageObjects {
  readonly page: Page;

  constructor(page: Page) {
    super();
    this.page = page;
    webActions = new WebActions(this.page);
  }

  async theUserAddNewTag(tag: string) {
    await webActions.clickElement(SearchPage.EDIT_TAGS);
    await webActions.verifyElementIsDisplayed(SearchPage.INPUT_TAGS);
    await webActions.verifyElementIsDisplayed(SearchPage.SAVE_TAGS);
    await webActions.verifyElementIsDisplayed(SearchPage.INPUT_TAGS);
    await webActions.clickElement(SearchPage.INPUT_TAGS);
    await webActions.typeElementText(SearchPage.INPUT_TAGS, tag);
    await webActions.keyPress(SearchPage.INPUT_TAGS, "Enter");
    await webActions.clickElement(SearchPage.SAVE_TAGS);
  }

  async verifyTagCreated(tag: string) {
    await webActions.verifyToBeVisible(SearchPage.getDivWithTag(tag));
  }

  async theUserDeleteTag(): Promise<string> {
    let nameTags: string = "";
    await webActions.clickElement(SearchPage.EDIT_TAGS);
    if (await this.page.locator(SearchPage.DELELTE_TAGS).isVisible()) {
      const size = await this.page.locator(SearchPage.DELELTE_TAGS).count();
      if (size > 0) {
        await webActions.verifyElementIsDisplayed(SearchPage.DELELTE_TAGS);
        await webActions.verifyElementIsDisplayed(SearchPage.SAVE_TAGS);
        const random = Utils.getRandomNumber(size - 1);
        const deleteTag = this.page
          .locator(SearchPage.DELELTE_TAGS)
          .nth(random);
        nameTags = await deleteTag.locator("//..//span").nth(0).textContent();
        await deleteTag.click();
        await webActions.clickElement(SearchPage.SAVE_TAGS);
      }
    }
    return nameTags;
  }

  async verifyTagDelete(tag: string) {
    if (tag.length > 0) {
      await webActions.verifyToBeNotVisible(SearchPage.getDivWithTag(tag));
    }
  }

  async verifyNotSeeEditTag() {
    await webActions.verifyToBeNotVisible(SearchPage.EDIT_TAGS);
  }
  async checksDivByNameDisplayed(tab: string) {
    await webActions.verifyToBeVisible(Utils.getDivByName(tab));
  }
  async checksButtonStartsWithNameDisplayed(tab: string) {
    await webActions.verifyToBeVisible(Utils.getButtonStartsWithName(tab));
  }
  async checksDivByNameIsNotDisplayed(tab: string) {
    await webActions.verifyToBeNotVisible(Utils.getDivByName(tab));
  }
  async checksButtonsByArrayNamesDisplayed(tabs: string[]) {
    for (let tab of tabs) {
      await webActions.verifyToBeVisible(Utils.getButtonStartsWithName(tab));
    }
  }

  async checksPageSize(
    tab: string,
    pageSize: number,
    locator: string = SearchPage.DETAILS_ROW_FIELDS
  ) {
    const countOfTab = await webActions.getCountOfTab(tab);
    const countOfTabNumber = Utils.getFullNumber(countOfTab);
    if (countOfTabNumber == 0) {
      return;
    }
    // Wait until the render of the item list is complete
    await webActions.verifyElementIsDisplayed(locator);
    await webActions.scrollElementToEnd(locator);
    const rowFieldsCount = (await this.page.locator(locator).allTextContents())
      .length;

    if (countOfTabNumber < pageSize) {
      expect(rowFieldsCount).toEqual(countOfTabNumber);
      return;
    }
    expect(rowFieldsCount === pageSize);
  }

  async checksPageSizeButton(
    tab: string,
    pageSize: number,
    locator: string = SearchPage.DETAILS_ROW_FIELDS
  ) {
    const countOfTab = await webActions.getCountOfButtonTab(tab);
    const countOfTabNumber = Utils.getFullNumber(countOfTab);
    if (countOfTabNumber == 0) {
      return;
    }
    // Wait until the render of the item list is complete
    await webActions.verifyElementIsDisplayed(locator);
    await webActions.scrollElementToEnd(locator);

    if (countOfTabNumber < pageSize) {
      await this.page
        .locator(locator)
        .nth(countOfTabNumber - 1)
        .waitFor({ state: "visible", timeout: 3000 });
      const rowFieldsCount = (
        await this.page.locator(locator).allTextContents()
      ).length;

      expect(rowFieldsCount).toEqual(countOfTabNumber);
      return;
    }
    await this.page
      .locator(locator)
      .nth(pageSize - 1)
      .waitFor({ state: "visible", timeout: 3000 });
    const rowFieldsCount = (await this.page.locator(locator).allTextContents())
      .length;

    expect(rowFieldsCount).toEqual(pageSize);
  }

  async checksPaginationIsMatching(tab: string) {
    const count = await webActions.getCountOfTab(tab);
    const countOfTabNumber = Utils.getFullNumber(count);
    if (countOfTabNumber > 0) {
      await this.isEqualToSizeFromPagingComponent(
        SearchPage.PAGINATION_COMPONENT,
        count
      );
    }
    // Failing due to BUG 15340970
    if (countOfTabNumber == 0) {
      this.isEmptyStatusMessageLoadedProperly(tab);
    }
  }

  async isEqualToSizeFromPagingComponent(paging: string, size: number) {
    const paginationSizeText = Utils.getTotalFromPagination(
      await this.page.locator(paging).textContent()
    );
    const totalCount = Utils.getRoughNumber(paginationSizeText);

    expect(size == totalCount).toBe(true);
  }

  async isEmptyStatusMessageLoadedProperly(tab: string) {
    const textToSearch = tab.split(" ")[0].toLowerCase();
    await webActions.verifyElementIsDisplayed(Utils.getDivByName(textToSearch));
    expect(
      (await this.page
        .locator(Utils.getDivByName(textToSearch))
        .textContent()) === `No ${textToSearch} found`
    ).toBe(true);
  }
  async checksNextColumnsInDataTab(columns: string[]) {
    await webActions.verifyArrayIsEqual(SearchPage.DETAILS_COLUMNS, columns);
  }
  async checksDownloadButton() {
    await webActions.verifyElementIsDisplayed(SearchPage.DOWNLOAD_ICON);
    await webActions.checksDownload(SearchPage.DOWNLOAD_ICON);
  }
  async dataShouldLink(column: string, tab: string) {
    const countOfTab = await webActions.getCountOfTab(tab);
    const countOfTabNumber = Utils.getFullNumber(countOfTab);
    if (countOfTabNumber > 0) {
      await this.isDataOfColumnSearchingForThatData(column);
    }
  }
  async isDataOfColumnSearchingForThatData(column: string) {
    CustomReporterConfig.consoleLog("column : ", column);

    const cells = SearchPage.getCellsOfColumn(column);
    await webActions.verifyElementIsDisplayed(cells);
    const list = await this.page.locator(cells).allTextContents();
    const index = Utils.getRandomNumber(list.length);
    await webActions.clickElementAtIndex(cells, index);
    await webActions.verifyElementIsDisplayed(SearchPage.SEARCH_HEADING);
    const searchHeading = await webActions.getText(SearchPage.SEARCH_HEADING);
    expect(searchHeading.trim()).toEqual(list[index]);
  }

  async goBack() {
    await this.page.goBack({ waitUntil: "commit" });
  }

  async sortingByIsByDefault(column: string, order: string, tab: string) {
    const countOfTab = await webActions.getCountOfTab(tab);

    if (countOfTab > 0) {
      CustomReporterConfig.consoleLog("ORDER", order)
      expect(await this.isColumnOrderByDefault(column, order)).toBe(true);
    }
  }
  async sortingByTitleIsByDefault(order: string, tab: string) {
    const countOfTab = await webActions.getCountOfTab(tab);

    if (countOfTab > 0) {
      expect(await this.isTitleOrderByDefault(order)).toBe(true);
    }
  }

  async isColumnOrderByDefault(column: string, order: string) {
    await webActions.verifyElementIsDisplayed(
      SearchPage.getArrowIconOnColumn(column, order)
    );
    const cells = SearchPage.getCellsOfColumn(column);

    const list = await this.page.locator(cells).allTextContents();
    let current = list[0];
    for (let i = 1; i < list.length; i++) {
      if (Utils.isColumnDate(column)) {
        const date = new Date(list[i]);
        const currentDate = new Date(current);
        if (date > currentDate) {
          return false;
        }
      } else {
        if (list[i] > current) {
          return false;
        }
      }
      current = list[i];
    }
    return true;
  }
  async isTitleOrderByDefault(order: string) {
    await webActions.verifyElementIsDisplayed(SearchPage.TITLE);

    const list = await this.page.locator(SearchPage.TITLE).allTextContents();
    let current = list[0];
    for (let i = 1; i < list.length; i++) {
      if (order === Constants.ASCENDING) {
        if (current.toLowerCase() > list[i].toLowerCase()) {
          return false;
        }
        current = list[i];
      } else {
        if (current < list[i]) {
          return false;
        }
        current = list[i];
      }
    }
    return true;
  }

  async checksSortOfColumns(columns: string[]) {
    for (let column of columns) {
      const columnHeader = SearchPage.getHeaderOfColumn(column);
      await webActions.clickElement(columnHeader);
      await webActions.verifyElementIsDisplayed(
        SearchPage.getArrowIconOnColumn(column, "ascending")
      );
      await webActions.clickElement(columnHeader);
      await webActions.verifyElementIsDisplayed(
        SearchPage.getArrowIconOnColumn(column, "descending")
      );
    }
  }
  async clicksOnTab(tab: string) {
    await webActions.clickElement(SearchPage.getTabByName(tab));
  }
  async clicksOnIntelligenceTab(tab: string) {
    await webActions.clickElement(SearchPage.getDivByName(tab));
  }
  async clicksOnTabSpan(tab: string) {
    await webActions.clickElement(SearchPage.getTargetByContent(tab));
  }
  async theUserAttemptsToAddArtifacts(waitForReponse: boolean): Promise<void> {
    const project = AppContext.getCurrentProject();
    await this.theUserClickOnInAddProject();
    if (waitForReponse) {
      // Wait Network
      await Promise.all([
        this.page.waitForResponse(
          (resp) => {
            return resp.url().includes("/api/project") && resp.status() === 200;
          },
          { timeout: 13000 }
        ),
      ]);
    }
    await webActions.verifyElementIsDisplayed(SearchPage.SELECTED_ITEM);
    const artifact = this.page.locator(SearchPage.SELECTED_PROJECT_ITEM);
    let isFound = false;
    let i = 43;
    do {
      await artifact.evaluate((e) => (e.scrollTop = i));
      isFound = await this.page
        .locator(
          SearchPage.getOptionOnArtifactsByProjectName(project.getProjectName())
        )
        .isVisible();
      i += 43;
    } while (!isFound);
    await webActions.clickElement(
      SearchPage.getOptionOnArtifactsByProjectName(project.getProjectName())
    );
  }

  async checksPopularItemsOnFilters(
    tabs: string[],
    size: number,
    tab: string
  ): Promise<void> {
    const countOfTab = await webActions.getCountOfTab(tab);
    if (countOfTab > 0) {
      await webActions.verifyElementIsDisplayed(SearchPage.FILTERS_LIST);
      await webActions.verifyArrayIsEqual(SearchPage.FILTERS_LIST, tabs);
      let i = 0;
      for (let tab of tabs) {
        await webActions.clickElementAtIndex(SearchPage.FILTERS_LIST, i);
        expect(
          (
            await this.page
              .locator(SearchPage.LIST_ITEM_POPULAR)
              .allTextContents()
          ).length
        ).toBeLessThanOrEqual(size);
        i++;
      }
    }
  }

  async theUserClickOnInAddProjectWithNew(): Promise<void> {
    await this.theUserClickOnInAddProject();
    await webActions.verifyElementIsDisplayed(SearchPage.ADD_NEW_PROJECT);
    await webActions.clickElement(SearchPage.ADD_NEW_PROJECT);
  }

  async theUserClickOnInAddProject(): Promise<void> {
    await webActions.verifyElementIsDisplayed(
      SearchPage.getButtonAddToProject("Add to project")
    );
    await webActions.clickElement(
      SearchPage.getButtonAddToProject("Add to project")
    );
  }

  async isIntelligenceItemLoadedProperly(tab: string): Promise<void> {
    const countOfTab = await webActions.getCountOfTab(tab);
    if (countOfTab === 0) {
      expect(
        await this.page.locator(SearchPage.MAIN_PANEL).textContent()
      ).toEqual("No data to display");
    } else {
      await webActions.verifyElementIsDisplayed(SearchPage.TITLE);
      await webActions.verifyElementIsDisplayed(SearchPage.DESCRIPTION);
      await webActions.verifyElementIsDisplayed(SearchPage.ARTIFACT_COUNT);
      if ("Articles" === tab) {
        await webActions.verifyElementIsDisplayed(SearchPage.CREATION_DATE);
        await webActions.verifyElementIsDisplayed(SearchPage.TAGS_ARTICLES);
        await webActions.clickElement(SearchPage.TITLE);
        await webActions.verifyElementIsDisplayed(
          ArticlePage.HEADER_ARTICLE_TAGS
        );
      } else {
        await webActions.verifyElementIsDisplayed(SearchPage.CREATED_BY_NAME);
        await webActions.verifyElementIsDisplayed(SearchPage.CREATED_BY_VALUE);
        await webActions.verifyElementIsDisplayed(SearchPage.TAGS);
        await webActions.clickElement(SearchPage.TITLE);
        await webActions.verifyElementIsDisplayed(SearchPage.DETAILS_LIST);
      }
    }
  }

  async theUserSeeTheCardItemsCalled(name: string): Promise<void> {
    await webActions.verifyElementIsDisplayed(SearchPage.getDivByName(name));
  }

  async theUserSeeAllCardExpandedByDefault(): Promise<void> {
    await webActions.verifyElementIsDisplayed(SearchPage.SUMMARY_CARD_LIST);
    const summaryCardList = this.page.locator(SearchPage.SUMMARY_CARD_LIST);
    const sizeCarList = await summaryCardList.count();
    for (let i = 0; i < sizeCarList; i++) {
      await webActions.verifyToBeVisibleByLocator(
        summaryCardList.nth(i).locator(SearchPage.ICON_BUTTON_DOW)
      );
      await webActions.verifyToBeVisibleByLocator(
        summaryCardList.nth(i).locator(SearchPage.CARD_CONTENT)
      );
    }
  }

  async checksTheNumberOfArticlesFoundIs(
    name: string,
    count: number
  ): Promise<void> {
    const articlesCard = this.page.locator(SearchPage.getDivByName(name));
    const totalArticles = await articlesCard
      .locator(SearchPage.ARTICLES_LIST)
      .count();
    await webActions.expectToBeGreaterThanOrEqual(totalArticles, count);
  }

  async checksReputationHeader(): Promise<void> {
    await webActions.verifyElementIsDisplayed(SearchPage.SEVERITY_COLUMN);
    await webActions.verifyElementIsDisplayed(SearchPage.RULE_COLUMN);
    await webActions.verifyElementIsDisplayed(SearchPage.DESCRIPTION_COLUMN);
    await webActions.verifyElementIsDisplayed(SearchPage.SEVERITY_CARD);

    const re = /\bScore : \d+\b/;
    const found = re.test(
      await this.page.locator(SearchPage.SCORE_CARD).textContent()
    );
    expect(found).toBe(true);
  }

  async checksReputationBody(): Promise<void> {
    await webActions.verifyElementIsDisplayed(SearchPage.SEVERITY_COLUMN);
    await webActions.verifyElementIsDisplayed(SearchPage.RULE_COLUMN);
    await webActions.verifyElementIsDisplayed(SearchPage.DESCRIPTION_COLUMN);
    await webActions.verifyElementIsDisplayed(SearchPage.SEVERITY_CARD);
    await webActions.expectToBeStrictEqual(
      await webActions.getText(SearchPage.SEVERITY_COLUMN),
      "Severity"
    );
    await webActions.expectToBeStrictEqual(
      await webActions.getText(SearchPage.RULE_COLUMN),
      "Rule"
    );
    await webActions.expectToBeStrictEqual(
      await webActions.getText(SearchPage.DESCRIPTION_COLUMN),
      "Description"
    );
    const size = await webActions.getCount(SearchPage.SEVERITY_GRIDCELL);
    for (let i = 0; i < size; i++) {
      await webActions.verifyToBeVisibleByLocator(
        this.page.locator(SearchPage.SEVERITY_GRIDCELL).nth(i)
      );
      await webActions.verifyToBeVisibleByLocator(
        this.page.locator(SearchPage.RULE_GRIDCELL).nth(i)
      );
      await webActions.verifyToBeVisibleByLocator(
        this.page.locator(SearchPage.DESCRIPTION_GRIDCELL).nth(i)
      );
    }
  }

  async checksReputationScore(): Promise<void> {
    await webActions.verifyElementIsDisplayed(SearchPage.SEVERITY_COLUMN);
    await webActions.verifyElementIsDisplayed(SearchPage.RULE_COLUMN);
    await webActions.verifyElementIsDisplayed(SearchPage.DESCRIPTION_COLUMN);

    // Check Score types and format
    const scoreText = await this.page
      .locator(SearchPage.SCORE_CARD)
      .textContent();
    const score = Utils.getScoring(scoreText);
    switch (score) {
      case Constants.REPUTATION.MALICIOUS:
        expect(
          await webActions.getFillColor(SearchPage.CIRCLE_SEVERITY_MALICIOUS)
        ).toEqual(Constants.REPUTATION_COLOR.MALICIOUS);
        break;
      case Constants.REPUTATION.SUSPICIOUS:
        expect(
          await webActions.getFillColor(SearchPage.CIRCLE_SEVERITY_SUSPICIOUS)
        ).toEqual(Constants.REPUTATION_COLOR.SUSPICIOUS);
        break;
      case Constants.REPUTATION.NEUTRAL:
        expect(
          await webActions.getFillColor(SearchPage.CIRCLE_SEVERITY_NEUTRAL)
        ).toEqual(Constants.REPUTATION_COLOR.NEUTRAL);
        break;
      case Constants.REPUTATION.UNKNOWN:
        expect(
          await webActions.getFillColor(SearchPage.CIRCLE_SEVERITY_UNKNOWN)
        ).toEqual(Constants.REPUTATION_COLOR.UNKNOWN);
        break;
    }
  }
  async checksCountOfParentMatchTotal(
    parent: string,
    children: string[]
  ): Promise<void> {
    const countOfTab = parseInt(await webActions.getCountOfButtonTab(parent));
    let count = 0;
    for (let child of children) {
      if (child !== "All") {
        count += parseInt(await webActions.getCountOfButtonTab(child));
      }
    }
    expect(count).toEqual(countOfTab);
  }
  async checksDisabledTabs(children: string[]): Promise<void> {
    let count = 0;
    for (let child of children) {
      count = parseInt(await webActions.getCountOfButtonTab(child));
      if (count === 0) {
        expect(
          await this.page.locator(SearchPage.getTabByName(child)).isDisabled()
        ).toBe(true);
      }
    }
  }
  async isTypeCommaSeparated(): Promise<void> {
    expect(await webActions.isCommaSeparated(SearchPage.TYPE_COLUMN)).toBe(
      true
    );
  }

  async checkIsDisplayedDnsInDataTab(tab: string) {
    await webActions.clickElement(SearchPage.DATA_TAB);
  }

  async checksPaginationButtonIsMatching(tab: string) {
    const count = await webActions.getCountOfButtonTab(tab);
    if (count > 0) {
      await this.isEqualToSizeFromPagingComponent(
        SearchPage.PAGINATION_COMPONENT,
        count
      );
    }
    // Failing due to BUG 15340970
    if (count == 0) {
      this.isEmptyStatusMessageLoadedProperly(tab);
    }
  }

  async dnsSortingIsByDefault(column: string, order: string, tab: string) {
    const count = await webActions.getCountOfButtonTab(tab);

    if (count > 0) {
      expect(await this.isColumnOrderByDefault(column, order)).toBe(true);
    }
  }

  async checkIsDisplayedInDataTab(tab: string) {
    await webActions.clickElement(SearchPage.DATA_TAB);
    await webActions.verifyToBeVisible(Utils.getDivByName(tab));
  }

  async checksDataPageSize(tab: string, pageSize: number) {
    await webActions.clickElement(Utils.getDivByName(tab));

    const countOfTab = Utils.getFullNumber(await webActions.getCountOfTab(tab));
    if (countOfTab == 0) {
      return;
    }
    // Wait until the render of the item list is complete
    await webActions.verifyElementIsDisplayed(SearchPage.DETAILS_ROW_FIELDS);
    await webActions.scrollElementToEnd(SearchPage.DETAILS_ROW_FIELDS);
    const rowFieldsCount = (
      await this.page.locator(SearchPage.DETAILS_ROW_FIELDS).allTextContents()
    ).length;

    if (countOfTab < pageSize) {
      expect(rowFieldsCount).toBe(countOfTab);
      return;
    }
    expect(rowFieldsCount === pageSize);
  }

  async _sortingByIsByDefault(column: string, order: string, tab: string) {
    const countOfTab = await webActions.getCountOfButtonTab(tab);

    if (countOfTab > 0) {
      expect(await this.isColumnOrderByDefault(column, order)).toBe(true);
    }
  }

  async dataNotShouldLink(column: string, tab: string) {
    const countOfTab = await webActions.getCountOfTab(tab);
    if (countOfTab > 0) {
      await this.isDataOfColumnNotSearchingForThatData(column);
    }
  }
  async isDataOfColumnNotSearchingForThatData(column: string) {
    const columnKey = SearchPage.getStringKeyOfColumn(column);
    const cells = `//div[@data-automation-key=\"${columnKey}\"]`;
    await webActions.verifyElementIsDisplayed(cells);
    const list = await this.page.locator(cells).allTextContents();
    const index = Utils.getRandomNumber(list.length);
    await webActions.isNotClickable(cells, index);
  }
}
