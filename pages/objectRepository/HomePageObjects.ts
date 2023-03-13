import Utils from "@utils/Utils";
import * as util from "util";

export class HomePageObjects {
  protected static SEARCH_BAR = '[data-qa="search-bar-button-dropdown"]';
  protected static SEARCH_INPUT = '[data-qa="search-bar-box"]';
  protected static ARTICLE_LIST_TITLES = '[data-qa="card"] [data-qa="article-link"]';
  public static HOME_SIDE_BUTTON = "[tabindex='0'] .ms-TooltipHost";
  protected static HOME_SEARCH_BAR = '[data-qa="search-bar-button-dropdown"]';


  protected static FEATURED_ARTICLE_LIST = '[data-qa="featured-article-box"]';
  protected static ARTICLE_LIST = '[data-qa="card"]';
  
  
  protected static ARTICLE_TITLE = '[data-qa="h3"]';
  protected static ARTICLE_DATE = '[data-qa="metaAgo"]';
  protected static ARTICLE_INDICATORS = '[data-qa="metaIndicators"]';
  protected static DESCRIPTION = '[data-qa="itemSummary"]';
  protected static ARTICLE_TAGS = '[data-qa="stack"] [data-qa="stack-item"]';
  protected static ARTICLE_NEXT_PAGE = '[aria-label="Next Page"]';
  protected static ARTICLE_PREVIOS_PAGE = '[aria-label="Previous Page"]';
  protected static ARTICLE_PAGINATION = '(//button[@role="menuitem"]//span[@data-automationid="splitbuttonprimary"])[3]//span//span';
  protected static CHEVRON_DOWN_PAGE = '(//i[@data-icon-name="ChevronDown"])[2]';
  protected static LIST_OF_ITEMS = '//li[@role="presentation"]';


  protected static FEATURE_TITLE = '[data-qa="featured-title"]';
  protected static FEATURE_INDICATORS = '[data-qa="metaData"]';
  protected static FEATURE_TAGS = '[data-qa="metaWrapper"] [data-qa="stack"]';
  protected static FEATURE_IMAGEN = '[data-qa="featuredArticleImage"]';

  public static getTargetOfItemName(name: string) {
    return `//span[contains(text(), "${name}")]`;
  }

  public static iconByTitle(title: string) {
    return util.format("[aria-label='%s']", title);
  }
}
