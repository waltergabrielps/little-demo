export class ArticlePageObjects {
  protected static HEADER_ARTICLE_DATE =
    '[data-qa="date"]';
  protected static HEADER_ARTICLE_TITLE = '[data-qa="h1"]';
  public static HEADER_ARTICLE_TAGS = '[data-qa="articleTags"]';
  protected static HEADER_ARTICLE_SHARE = '[data-icon-name="ChevronDown"]';
  protected static HEADER_ARTICLE_DOWNLOAD = '[data-icon-name="Download"]';

  protected static ARTICLE_SHARE = '[data-icon-name="Share"]';
  protected static ARTICLE_SHARE_MAIL = '[href*="mailto:"]';
  protected static ARTICLE_SHARE_LINK = '[data-icon-name="Link"]';
  protected static ARTICLE_HYPERLINK = '[data-qa="markdownWrapper"] [data-qa="link"] ';
  protected static LATEST_ARTICLES = '[data-qa="sidebarSection"] [data-qa="stack"]';
  protected static ARTICLE_TITLE = '[data-qa="article"] [data-qa="h1"]';
  protected static ARTICLE_ACTION_BAR = '[data-qa="actionBar"]';
  protected static LATEST_ARTICLES_TITLES = '[data-qa="sidebarSection"] [data-qa="stack"] [class*="ms-StackItem sc-lhVmIH"]';

  protected static ARTICLE_TAB_PUBLIC = '[data-content*="Public Indicators"]';  
  protected static ARTICLE_TAB_DEFENDER_TI = '[data-content*="Defender TI Indicators"]';  
  protected static ARTICLE_NO_INDICATOR = "//span[contains(text(), 'No Indicators found.')]";
  protected static ARTICLE_INDICATOR_LIST_ITEM ='[data-automationid="ListCell"]';
  protected static GRID_TABLE ='[role="grid"]';
  protected static ARTICLE_INDICATOR_TYPE_LIST ='[data-automation-key="type"][data-automationid="DetailsRowCell"]';
  protected static ARTICLE_INDICATOR_NAME_LIST ='[data-automation-key="name"][data-automationid="DetailsRowCell"] > a';
  
  protected static ARTICLE_INDICATOR_HEADER_TYPE = '[data-item-key="type"]';
  protected static ARTICLE_INDICATOR_HEADER_NAME = '[data-item-key="name"]';
  protected static ARTICLE_SEARCH_SECTION = '[data-qa="section"]';
}
