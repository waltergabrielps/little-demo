import { WebActions } from "@lib/WebActions";
import { Page } from "@playwright/test";
import { HomePageObjects } from "@objects/HomePageObjects";
import AppContext from "@utils/AppContext";
import Utils from "@utils/Utils";
import { ProjectsPage } from "./ProjectsPage";
import { SearchPage } from "./SearchPage";

let webActions: WebActions;

export class HomePage extends HomePageObjects {
  readonly page: Page;

  constructor(page: Page) {
    super();
    this.page = page;
    webActions = new WebActions(this.page);
  }

  async navigateToURL(): Promise<void> {
    await webActions.navigateToURL(`/`);
  }
  async searchByWord(
    item: string,
    search: string,
    subItem?: string
  ): Promise<void> {
    AppContext.setSearchWord(search);
    await webActions.clickElement(HomePage.SEARCH_BAR);
    await webActions.clickElement(HomePage.getTargetOfItemName(item));
    if (subItem) {
      await webActions.clickElement(HomePage.getTargetOfItemName(subItem));
    }
    await webActions.enterElementText(HomePage.SEARCH_INPUT, search);
    await webActions.locatorKeyPress(HomePage.SEARCH_INPUT, "Enter");
    await webActions.verifyElementIsDisplayed(SearchPage.SEARCH_HEADING);
    await this.page.waitForLoadState();
  }

  async clickOnSearch(): Promise<void> {
    await webActions.verifyElementIsDisplayed(HomePage.SEARCH_INPUT); 
    await webActions.clickElement(HomePage.SEARCH_INPUT); 
  }

  async checkAllSearchItems(rows: Map<string, string[]>): Promise<void> {
    webActions.verifyElementIsDisplayed(HomePage.HOME_SEARCH_BAR);
    webActions.clickElement(HomePage.HOME_SEARCH_BAR);
    for (let [item, subItems] of rows) {
      // Checking Items
      const itemTarget = HomePage.getTargetOfItemName(item);
      await webActions.verifyElementIsDisplayed(itemTarget);
      // Checking SubItems
      if (subItems.length > 0) {
        await webActions.clickElement(HomePage.getTargetOfItemName(item));
        subItems.forEach(async (value) => {
          await webActions.verifyElementIsDisplayed(
            HomePage.getTargetOfItemName(value)
          );
        });
      }
    }
  }

  async pickARandomArticle(): Promise<void> {
    await webActions.verifyElementIsDisplayed(HomePage.ARTICLE_LIST_TITLES);
    const list = await this.page.locator(HomePage.ARTICLE_LIST_TITLES).allTextContents();
    const index = Utils.getRandomNumber(list.length);
    await webActions.clickElementAtIndex(HomePage.ARTICLE_LIST_TITLES, index)
  }

  async theNumberOfArticlesIs(number: number): Promise<void>{
    await webActions.verifyElementIsDisplayed(HomePage.ARTICLE_LIST);
    const sizeArticles = await webActions.getCount(HomePage.ARTICLE_LIST);
    await webActions.expectToBeValueNumber(number, sizeArticles, "The number of articles displayed")
  }

  async theNumberOfFeatureArticlesIs(number: number): Promise<void>{
    await webActions.verifyElementIsDisplayed(HomePage.FEATURED_ARTICLE_LIST);
    const sizeArticles = await webActions.getCount(HomePage.FEATURED_ARTICLE_LIST);
    await webActions.expectToBeValueNumber(number, sizeArticles, "The number of feature articles displayed")
  }

  async allTheArticlesAreLoadedProperly(): Promise<void>{
    await webActions.verifyElementIsDisplayed(HomePage.ARTICLE_LIST);
    const sizeArticles = await webActions.getCount(HomePage.ARTICLE_LIST);
    for (let i = 0;  i< sizeArticles; i++  ){
      const article = this.page.locator(HomePage.ARTICLE_LIST).nth(i);
      await webActions.verifyToBeVisibleByLocator(article.locator(HomePage.ARTICLE_DATE));
      await webActions.verifyToBeVisibleByLocator(article.locator(HomePage.ARTICLE_TITLE));
      await webActions.verifyToBeVisibleByLocator(article.locator(HomePage.DESCRIPTION));
      await webActions.verifyToBeVisibleByLocator(article.locator(HomePage.ARTICLE_INDICATORS));
      await webActions.verifyToBeVisibleByLocator(article.locator(HomePage.ARTICLE_TAGS).nth(0));
    }
  }

  async allTheFeatureArticlesAreLoadedProperly(): Promise<void>{
    await webActions.verifyElementIsDisplayed(HomePage.FEATURED_ARTICLE_LIST);
    const sizeArticles = await webActions.getCount(HomePage.FEATURED_ARTICLE_LIST);
    for (let i = 0;  i< sizeArticles; i++  ){
      const article = this.page.locator(HomePage.FEATURED_ARTICLE_LIST).nth(i);
      await webActions.verifyToBeVisibleByLocator(article.locator(HomePage.FEATURE_TITLE));
      await webActions.verifyToBeVisibleByLocator(article.locator(HomePage.FEATURE_INDICATORS));
      await webActions.verifyToBeVisibleByLocator(article.locator(HomePage.FEATURE_TAGS).nth(0));
    }
  }

  async areTheArrowsWorkingProperly(): Promise<void>{
    await webActions.verifyElementIsDisplayed(HomePage.ARTICLE_LIST);
    await webActions.verifyElementIsDisplayed(HomePage.ARTICLE_NEXT_PAGE);
    await webActions.verifyElementIsDisplayed(HomePage.ARTICLE_PREVIOS_PAGE);
    let isNextPageEnable:boolean = await this.page.locator(HomePage.ARTICLE_NEXT_PAGE).getAttribute("aria-disabled") === null;
    let isPreviousPageEnable:boolean = await this.page.locator(HomePage.ARTICLE_PREVIOS_PAGE).getAttribute("aria-disabled") === null;
    if(!isPreviousPageEnable){
      const total:number = Number.parseInt((await this.page.locator(HomePage.ARTICLE_PAGINATION).textContent()).toString());
      while(isNextPageEnable){
        await webActions.verifyElementIsDisplayed(HomePage.ARTICLE_LIST);
        const nextPage = this.page.locator(HomePage.ARTICLE_NEXT_PAGE);
        const propertyAriaDisabled:string = await nextPage.getAttribute("aria-disabled");
        isNextPageEnable = !(propertyAriaDisabled !== null && propertyAriaDisabled === "true");
        await webActions.clickElement(HomePage.CHEVRON_DOWN_PAGE);
        await webActions.verifyElementIsDisplayed(HomePage.LIST_OF_ITEMS);
        const lastItem = this.page.locator(HomePage.LIST_OF_ITEMS).nth(-1);
        const lastItemNumber:number = await this.getLastPageOfPagination();
        if(total === lastItemNumber && isNextPageEnable){
          break;
        }
        await webActions.clickLocator(lastItem);
      } 

    }
  } 

  async getLastPageOfPagination(): Promise<number> {
    const paginationText = await this.page.locator(HomePage.ARTICLE_PAGINATION).textContent();
    return Number.parseInt(paginationText.substring(paginationText.indexOf("-") + 1 , paginationText.indexOf("o")).trim());
  }

  async isTotalDisplayed(): Promise<void> {
    await webActions.verifyElementIsDisplayed(HomePage.ARTICLE_LIST);
    const total:number = await this.getTotalCountOfPagination(await webActions.getText(HomePage.ARTICLE_PAGINATION));
    await webActions.expectToBeGreaterThan(total, 0);
  }

  async getTotalCountOfPagination(paginationSizeText:string): Promise<number>{
    const indexOf = paginationSizeText.indexOf("o");
    const totalCount = Number.parseInt(paginationSizeText.substring(indexOf + 2).replaceAll(",", "").trim());
    return totalCount;
  }

  async isPaginationJumpingToTheNextAndThePriorPages(total:number): Promise<void>{
    await this.page.reload();
    await webActions.verifyElementIsDisplayed(HomePage.ARTICLE_LIST);
    await webActions.clickElement(HomePage.CHEVRON_DOWN_PAGE);
    await webActions.verifyElementIsDisplayed(HomePage.LIST_OF_ITEMS);
    const lastOfNextItems = this.page.locator(HomePage.LIST_OF_ITEMS).nth(-1);
    const pageNumberNextItems:number = Number.parseInt((await lastOfNextItems.textContent()).split("\\.")[0]);
    await webActions.expectToBeStrictEqual(pageNumberNextItems, (1+total));
    await lastOfNextItems.click();
    await webActions.verifyElementIsDisplayed(HomePage.ARTICLE_LIST);
    await webActions.clickElement(HomePage.CHEVRON_DOWN_PAGE);
    await webActions.verifyElementIsDisplayed(HomePage.LIST_OF_ITEMS);
    const firstOfPriorItems = this.page.locator(HomePage.LIST_OF_ITEMS).nth(0);
    const pageNumberPriorItems:number = Number.parseInt((await firstOfPriorItems.textContent()).split("\\.")[0]);
    await webActions.expectToBeStrictEqual(pageNumberPriorItems, 1);
    const lastOfNextItems1 = this.page.locator(HomePage.LIST_OF_ITEMS).nth(-1);
    const pageNumberNextItems1:number = Number.parseInt((await lastOfNextItems1.textContent()).split("\\.")[0]);
    await webActions.expectToBeStrictEqual(pageNumberNextItems1, (1+(total*2)));
  } 

  async theUserGoToAnArticle(): Promise<void>{
    await webActions.verifyElementIsDisplayed(HomePage.ARTICLE_LIST);
    await webActions.clickOnRandomLocator(HomePage.ARTICLE_LIST);
  }

  async areArticlesImagesLoadedInSeconds(milisecond: number): Promise<void>{
      await webActions.verifyElementIsDisplayed(HomePage.FEATURED_ARTICLE_LIST);
      await webActions.verifyElementIsDisplayed(HomePage.FEATURE_IMAGEN, milisecond);
  }

  async theUserClickOnTheProjectButton(title: string): Promise<void>{
    await webActions.verifyElementIsDisplayed(HomePage.iconByTitle(title));
    await webActions.clickElement(HomePage.iconByTitle(title));
  }

}
