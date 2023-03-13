class Constants {
  static ELEMENT_TIME_OUT = 3000;
  static FILTERS_POPULAR_ITEMS_LENGTH = 20;
  static ASCENDING = "ascending";
  static DESCENDING = "descending";
  static REPUTATION_LEVEL = {
    MALICIOUS: "High",
    SUSPICIOUS: "Medium",
    NEUTRAL: "Low",
    UNKNOWN: "Unknown",
  };

  static REPUTATION = {
    MALICIOUS: "MALICIOUS",
    SUSPICIOUS: "SUSPICIOUS",
    NEUTRAL: "NEUTRAL",
    UNKNOWN: "UNKNOWN",
  };
  
  static REPUTATION_COLOR = {
    MALICIOUS: "rgb(243, 77, 89)",
    SUSPICIOUS: "rgb(255, 117, 44)",
    NEUTRAL: "rgb(250, 224, 79)",
    UNKNOWN: "rgb(200, 198, 196)",
  };
  static PROJECT_TABS = {
    TEAM: "Team Projects",
    MY: "My Projects",
    SHARED: "Shared Projects",
  };
  static PROJECT_FILTERS = {
    TAGS: "Tags",
    CREATOR: "Created By",
  };
  
  static CVE_LABELS = ["Priority score", "CVSS 2", "CVSS 3", "Published"];
  static LEVELS = ["Critical","High", "Medium", "Low", "Unknown"];
  static CVE_TITLES_RIGHT = ["Intelligence", "Known exploits", "CWE"]
  static INTELLIGENCE_LIST_ITEMS = ["Exploit available", "Chatter observed", "Active exploitation observed"]
  static COMMON_DOMAINS = ["google.com", "riskiq.net", "test.com", "facebook.com", "youtube.com"]
  static ARTICLE_COLUMNS = ["\"type\"", "\"value\"", "\"source\""];
  static CLICKABLE_COLUMNS = ["Focus", "Hostname", "Parent hostname", "Child hostname", "Resolve", "Value", "Sha1", "Name"];
  static PROJECT_COLUMNS = ["\"name\"", "\"created By\"", "\"date\"", "\"artifacts\"", "\"tags\""];
  static PROFILE_INDICATORS_LABELS = ["Aliases","OSINT", "Defender TI Derived"];
  static PROFILE_SOURCE = ["OSINT", "Defender TI"];
}

export default Constants;
