import Constants from "./Constants";
import fs from "fs";
import CustomReporterConfig from "../CustomReporterConfig";

class Utils {
  static genRandonString(length: number) {
    let chars =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let charLength = chars.length;
    let result = "";
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * charLength));
    }
    return result;
  }

  static randomIntFromInterval(min, max) {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  static getRandomNumber(max: number) {
    return Math.floor(Math.random() * max);
  }

  static getRandomNumberInRange(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  static getLocatorByName = (name: string) => {
    return `text=${name}`;
  };
  static getDivByName = (name: string) => {
    return `//div[contains(text(), "${name}")]`;
  };
  static getButtonStartsWithName = (name: string) => {
    return `//button[starts-with(@title, "${name}")]`;
  };
  static getButtonStartsWith = (name: string) => {
    return `//button[starts-with(@name, "${name}")]`;
  };
  static getNumberFromText = (text: string) => {
    return parseInt(text.replace(/[^0-9.]/g, ""));
  };
  static getTotalFromPagination = (text: string) => {
    const count = text.substring(text.indexOf("of") + 2).replace(/,/g, "");
    return parseInt(count);
  };
  static getPageSizeFromText = (text: string) => {
    const index = text.indexOf("of") - 2;
    const count = text
      .substring(index, index + 2)
      .replace(",", "")
      .trim();
    return parseInt(count);
  };
  static areListEquals = (a: string[], b: string[]) => {
    return JSON.stringify(a) === JSON.stringify(b);
  };
  static getRandomDomainNotInList = (list: string[]) => {
    const domains = Constants.COMMON_DOMAINS.filter(
      (element) => !list.includes(element)
    );
    if (domains.length > 0) {
      const index = this.getRandomNumber(domains.length);
      return domains[index];
    } else {
      return this.genRandonString(5) + ".com";
    }
  };

  static getHeaderFromCSVFile(path: string) {
    return (
      fs
        .readFileSync(path)
        .toString()
        // Get the header
        .split("\n")[0]
        .split(",")
        .map((col: string) => col.trim())
    );
  }

  static getTotalCountOfPagination(paginationSizeText: string) {
    const indexOf = paginationSizeText.indexOf("o");
    const totalCount = parseInt(
      paginationSizeText
        .substring(indexOf + 2)
        .replace(/,/g, "")
        .trim()
    );
    return totalCount;
  }
  static isColumnDate(column: string) {
    if (
      column.includes("Date") ||
      column.includes("First Seen") ||
      column.includes("Last Seen")
    ) {
      return true;
    }
    return false;
  }
  static isInClickableColumns(column: string) {
    return Constants.CLICKABLE_COLUMNS.includes(column);
  }
  static getTargetByContent(name: string) {
    return `[data-content="${name}"]`;
  }
  static getScoring(scoreText: string) {
    const number = scoreText.replace(/[^0-9$.]/g, "");
    const score = parseFloat(number);
    if (score >= 75) {
      return Constants.REPUTATION.MALICIOUS;
    } else if (score >= 50) {
      return Constants.REPUTATION.SUSPICIOUS;
    } else if (score >= 25) {
      return Constants.REPUTATION.NEUTRAL;
    }
    return Constants.REPUTATION.UNKNOWN;
  }

  public static getCellsOfColumn(column: string) {
    const columnKey = this.getStringKeyOfColumn(column);
    if (Utils.isInClickableColumns(column)) {
      return `//div[@data-automation-key=\"${columnKey}\"]/a`;
    } else {
      return `//div[@data-automation-key=\"${columnKey}\"]`;
    }
  }

  public static getStringKeyOfColumn(column: string) {
    const columnArray = column.split(" ");
    let key = columnArray[0].toLowerCase();
    if (columnArray.length > 1) {
      key += columnArray[1];
    }
    return key;
  }
  /* Takes numbers and parses to have for example "K" or "M" abbreviation. */
  public static getRoughNumber(number: number) {
    if (number >= 1000000000) return (number / 1000000000).toFixed(1) + "B";
    else if (number >= 1000000) return (number / 1000000).toFixed(1) + "M";
    else if (number >= 1000) return (number / 1000).toFixed(1) + "K";
    else return number;
  }

  /* Takes numbers with, for example "K" or "M" abbreviation and returns a multiplied value. */
  public static getFullNumber(value: string) {
    const multiplier = value.match(/M$|K$|B$|P$/g);
    if (multiplier === null) {
      return parseInt(value);
    }
    switch (multiplier[0]) {
      case "K":
        return parseInt(value) * 1000;
      case "M":
        return parseInt(value) * 1000000;
      case "B":
        return parseInt(value) * 1000000000000;
      case "P":
        return parseInt(value) * 1000000000000;
    }
  }
}

export default Utils;
