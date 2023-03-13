import { WebActions } from "@lib/WebActions";
import { ArticlePageObjects } from "@objects/ArticlePageObjects";
import { expect, Page } from "@playwright/test";
import Constants from "@utils/Constants";
import Utils from "@utils/Utils";
import AllureReporter from "experimental-allure-playwright";
import { HomePage } from "./HomePage";
const fs = require("fs");

let webActions: WebActions;

export class ArticlePage extends ArticlePageObjects {
  readonly page: Page;

  constructor(page: Page) {
    super();
    this.page = page;
    webActions = new WebActions(this.page);
  }

  async checkHeaderArticleElements(): Promise<void> {
    await webActions.verifyElementIsDisplayed(HomePage.HOME_SIDE_BUTTON);
    await webActions.verifyElementIsDisplayed(ArticlePage.HEADER_ARTICLE_TITLE);
    await webActions.verifyElementIsDisplayed(ArticlePage.HEADER_ARTICLE_DATE);
    await webActions.verifyElementIsDisplayed(ArticlePage.HEADER_ARTICLE_SHARE);
    await webActions.verifyElementIsDisplayed(
      ArticlePage.HEADER_ARTICLE_DOWNLOAD
    );
    await webActions.verifyElementIsDisplayed(ArticlePage.HEADER_ARTICLE_TAGS);
  }

  async checkDownloadButton(): Promise<void> {
    await webActions.verifyElementIsDisplayed(
      ArticlePage.HEADER_ARTICLE_DOWNLOAD
    );
    const [download] = await Promise.all([
      // Start waiting for the download
      this.page.waitForEvent("download"),
      // Perform the action that initiates download
      await webActions.clickElement(ArticlePage.HEADER_ARTICLE_DOWNLOAD),
    ]);

    // Wait for the download process to complete
    const path = await download.path();

    // Reads the CSV file and saves it
    const header = Utils.getHeaderFromCSVFile(path)
    expect(header).toEqual(Constants.ARTICLE_COLUMNS);
  }

  async sharesIt(share: string): Promise<void> {
    await webActions.verifyElementIsDisplayed(ArticlePage.ARTICLE_SHARE);
    await webActions.clickElement(ArticlePage.ARTICLE_SHARE);
    const currentUrl = this.page.url();
    if (share === "email") {
      const escaped: string = decodeURIComponent((await this.page.locator(ArticlePage.ARTICLE_SHARE_MAIL).getAttribute("href")).substring(16));
      const articleTitle = await webActions.getText(ArticlePage.ARTICLE_TITLE);
      await webActions.expectToBeContain(escaped, articleTitle);
      await webActions.expectToBeContain(escaped, currentUrl);
    } else {
      await webActions.verifyElementIsDisplayed(ArticlePage.ARTICLE_SHARE_LINK);
      await webActions.clickElement(ArticlePage.ARTICLE_SHARE_LINK);
      await webActions.expectToBeContain(await this.page.evaluate("navigator.clipboard.readText()"), currentUrl);
    }
  }

  async theUserClicksTheHyperlink(): Promise<void> {
    const size = await webActions.getCount(ArticlePage.ARTICLE_HYPERLINK);
    const linkHref = this.page.locator(ArticlePage.ARTICLE_HYPERLINK).nth(Utils.getRandomNumber(size - 1));
    const url = await linkHref.getAttribute("href");
    let currentUrl = "";
    let isTargetPageDisable: boolean = await linkHref.getAttribute("target") === null;
    if (isTargetPageDisable) {
      await webActions.clickLocator(linkHref);
      this.page.waitForLoadState();
      currentUrl = this.page.url();
    } else {
      const [newPage] = await Promise.all([
        this.page.context().waitForEvent('page'),
        linkHref.click()
      ])
      await newPage.waitForLoadState();
    }
  }

  async isTheLatestArticleListAmountCorrect(number: number): Promise<void> {
    await webActions.verifyElementIsDisplayed(ArticlePage.LATEST_ARTICLES)
    const lastSizeArticles = await webActions.getCount(ArticlePage.LATEST_ARTICLES);
    await webActions.expectToBeStrictEqual(number, lastSizeArticles);
  }

  async isTheLatestArticleTitleCorrect(): Promise<void> {
    const sizeLastTitle = await webActions.getCount(ArticlePage.LATEST_ARTICLES_TITLES);
    const lastArticleTarget = this.page.locator(ArticlePage.LATEST_ARTICLES_TITLES).nth(Utils.getRandomNumber(sizeLastTitle - 1));
    const lastTitle = (await webActions.getTextLocator(lastArticleTarget)).trim();
    await webActions.clickLocator(lastArticleTarget);
    const articleTitle = await webActions.getText(ArticlePage.ARTICLE_TITLE);
    await webActions.expectToBeStrictEqual(lastTitle, articleTitle);
  }

  async isIndicatorTabDisplayed(indicator: String): Promise<void> {
    if (indicator === "Public indicators") {
      await webActions.verifyElementIsDisplayed(ArticlePage.ARTICLE_TAB_PUBLIC);
    } else {
      await webActions.verifyElementIsDisplayed(ArticlePage.ARTICLE_TAB_DEFENDER_TI);
    }
  }

  async isCountDisplayed(indicator: String): Promise<void> {
    var total: number;
    if (indicator === "Public indicators") {
      total = await this.getTotalCountOfPagination(await webActions.getText(ArticlePage.ARTICLE_TAB_PUBLIC));
      await webActions.expectToBeTrue(total >= 0, "Count is not displayed");
    } else {
      total = await this.getTotalCountOfPagination(await webActions.getText(ArticlePage.ARTICLE_TAB_DEFENDER_TI));
      await webActions.expectToBeTrue(total >= 0, "Count is not displayed");
    }
  }

  async isDisplayContentProperly(indicator: String): Promise<void> {
    var total: number;
    if (indicator === "Public indicators") {
      total = await this.getTotalCountOfPagination(await webActions.getText(ArticlePage.ARTICLE_TAB_PUBLIC));
      await webActions.clickElement(ArticlePage.ARTICLE_TAB_PUBLIC);
    } else {
      total = await this.getTotalCountOfPagination(await webActions.getText(ArticlePage.ARTICLE_TAB_DEFENDER_TI));
      await webActions.clickElement(ArticlePage.ARTICLE_TAB_DEFENDER_TI);
    }

    if (total === 0) {
      await webActions.verifyElementIsDisplayed(ArticlePage.ARTICLE_NO_INDICATOR);
    } else {
      await webActions.expectToBeGreaterThan(total, 0);
      await webActions.verifyElementIsDisplayed(ArticlePage.ARTICLE_INDICATOR_LIST_ITEM);
      const size = parseInt(await this.page.locator(ArticlePage.GRID_TABLE).getAttribute("aria-rowcount")) - 1;
      await webActions.expectToBeValueNumber(total, size, "The number of indicators displayed")
      await webActions.verifyElementIsDisplayed(ArticlePage.ARTICLE_INDICATOR_HEADER_TYPE);
      await webActions.verifyElementIsDisplayed(ArticlePage.ARTICLE_INDICATOR_HEADER_NAME);
    }
  }

  async getTotalCountOfPagination(indicatorCount: string): Promise<number> {
    const indexOf = indicatorCount.indexOf("(");
    const totalCount = Number.parseInt(indicatorCount.substring(indexOf + 1));
    return totalCount;
  }

  async checkTypeIsClickable(indicator: string): Promise<void> {
    const clickTypes = ["IP", "Domain", "Emails", "Whois Name Serves", "SSL Certificate SHA-1", "SHA-256 Hash"];

    if (indicator === "Public indicators") {
      await webActions.clickElement(ArticlePage.ARTICLE_TAB_PUBLIC);
    } else {
      await webActions.clickElement(ArticlePage.ARTICLE_TAB_DEFENDER_TI);
    }

    await webActions.verifyElementIsDisplayed(ArticlePage.ARTICLE_INDICATOR_LIST_ITEM);
    const types = await this.page.locator(ArticlePage.ARTICLE_INDICATOR_TYPE_LIST).allTextContents();
    const names = await this.page.locator(ArticlePage.ARTICLE_INDICATOR_NAME_LIST).allTextContents();

    types.forEach((type, index) => {
      let exist: boolean = clickTypes.includes(type);

      if (exist) {
        const name = this.page.locator(ArticlePage.ARTICLE_INDICATOR_NAME_LIST).nth(index);
        const url = name.getAttribute("href");
      }

    });
  }

  async theUserClicksTheIndicator(indicator: string): Promise<void> {
    var total: number;
    if (indicator === "Public indicators") {
      total = await this.getTotalCountOfPagination(await webActions.getText(ArticlePage.ARTICLE_TAB_PUBLIC));
      await webActions.clickElement(ArticlePage.ARTICLE_TAB_PUBLIC);
    } else {
      total = await this.getTotalCountOfPagination(await webActions.getText(ArticlePage.ARTICLE_TAB_DEFENDER_TI));
      await webActions.clickElement(ArticlePage.ARTICLE_TAB_DEFENDER_TI);
    }

    if (total === 0) {
      await webActions.verifyElementIsDisplayed(ArticlePage.ARTICLE_NO_INDICATOR);
    } else {
      await webActions.verifyElementIsDisplayed(ArticlePage.ARTICLE_INDICATOR_LIST_ITEM);
      const size = await webActions.getCount(ArticlePage.ARTICLE_INDICATOR_NAME_LIST);
      const linkHref = this.page.locator(ArticlePage.ARTICLE_INDICATOR_NAME_LIST).nth(Utils.getRandomNumber(size - 1));
      const url = await linkHref.getAttribute("href");
      let currentUrl = "";
      let isTargetPageDisable: boolean = await linkHref.getAttribute("target") === null;
      if (isTargetPageDisable) {
        await webActions.clickLocator(linkHref);
        this.page.waitForLoadState();
        currentUrl = this.page.url();
      } else {
        const [newPage] = await Promise.all([
          this.page.context().waitForEvent('page'),
          linkHref.click()
        ])
        await newPage.waitForLoadState();
        currentUrl = newPage.url();
      }
      await webActions.expectToBeContain(currentUrl, url);
    }
  }
}