import { WebActions } from "@lib/WebActions";
import { CveArticlePage } from "@pages/CveArticlePage";
import Constants from "@utils/Constants";

export class CveArticlePageObjects {
  protected static PRIORITY_ICON = '[data-qa="severity"]';
  protected static PRIORITY_SCORE_CVE =
    '//div[@data-qa="severity"]/parent::div';
  protected static CIRCLE_SEVERITY_UNKNOWN = '[data-qa="unknown"]';
  protected static CIRCLE_SEVERITY_NEUTRAL = '[data-qa="low"]';
  protected static CIRCLE_SEVERITY_SUSPICIOUS = '[data-qa="medium"]';
  protected static CIRCLE_SEVERITY_MALICIOUS = '[data-qa="high"]';
  protected static CVE_TAB = '//span[contains(@class, "ms-Pivot-text")]';
  protected static PAGINATION = "//span[contains(text(), 'of ')]";
  protected static NO_DATA = '[data-qa="no-data-text"]';
  protected static CVE_LABELS = '[data-qa="name"]';
  protected static CVE_VALUES = '[data-qa="value"]';
  protected static CONTENT_HEADER = '[data-qa="content-header"]';
  protected static SUB_HEADER = '[data-qa="secondaryTextBlock"]';
  protected static CARD_TITLES = '[data-qa="cveSidebarCard"] [data-qa="card-title"]';
  protected static INTELLIGENCE_LIST_ITEMS = '[data-qa="intelligenceListItem"]';
  protected static EXPLOIT_LINKS = '//li[@data-qa="exploitsListItem"]//a';

  // Functions
  public static getHeaderTitleByWord(word: string) {
    return `//h1[@data-qa="cve-title" and contains(text(), "${word}")]`;
  }

  public static getScoringLevel(scoreText: string) {
    // Critical, High, Medium, Low
    return scoreText.replace(/[\d.]/g, "").trim();
  }
  public static getScoringLevelByScoreNumber(scoreText: string) {
    const number = scoreText.replace(/(\\D+)(?!.)/g, "");
    const score = parseFloat(number);
    if (score >= 75) {
      return Constants.REPUTATION_LEVEL.MALICIOUS;
    } else if (score >= 50) {
      return Constants.REPUTATION_LEVEL.SUSPICIOUS;
    } else if (score >= 25) {
      return Constants.REPUTATION_LEVEL.NEUTRAL;
    }
    return Constants.REPUTATION_LEVEL.UNKNOWN;
  }

  public static getScoreNumber(scoreText: string) {
    return parseInt(scoreText.replace(/(\\D+)(?!.)/g, ""));
  }

  public static getScoringIconByScoreLevel(scoreLevel: string) {
    switch (scoreLevel) {
      case Constants.REPUTATION.MALICIOUS:
      case Constants.REPUTATION_LEVEL.MALICIOUS:
        return CveArticlePage.CIRCLE_SEVERITY_MALICIOUS;
      case Constants.REPUTATION.SUSPICIOUS:
      case Constants.REPUTATION_LEVEL.SUSPICIOUS:
        return CveArticlePage.CIRCLE_SEVERITY_SUSPICIOUS;
      case Constants.REPUTATION.NEUTRAL:
      case Constants.REPUTATION_LEVEL.NEUTRAL:
        return CveArticlePage.CIRCLE_SEVERITY_NEUTRAL;
      case Constants.REPUTATION.UNKNOWN:
      case Constants.REPUTATION_LEVEL.UNKNOWN:
        return CveArticlePage.CIRCLE_SEVERITY_UNKNOWN;
    }
  }
  public static getScoringColorByScoreLevel(scoreLevel: string) {
    switch (scoreLevel) {
      case Constants.REPUTATION.MALICIOUS:
      case Constants.REPUTATION_LEVEL.MALICIOUS:
        return Constants.REPUTATION_COLOR.MALICIOUS;
      case Constants.REPUTATION.SUSPICIOUS:
      case Constants.REPUTATION_LEVEL.SUSPICIOUS:
        return Constants.REPUTATION_COLOR.SUSPICIOUS;
      case Constants.REPUTATION.NEUTRAL:
      case Constants.REPUTATION_LEVEL.NEUTRAL:
        return Constants.REPUTATION_COLOR.NEUTRAL;
      case Constants.REPUTATION.UNKNOWN:
      case Constants.REPUTATION_LEVEL.UNKNOWN:
        return Constants.REPUTATION_COLOR.UNKNOWN;
    }
  }

  public static getTabByName(tab: string) {
    return `//button[starts-with(@data-content, '${tab}')]`;
  }
}
