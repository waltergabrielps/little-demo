import fs from "fs";
import * as CryptoJS from "crypto-js";
import type { ElementHandle, Locator, Page } from "@playwright/test";
import { BrowserContext, expect } from "@playwright/test";
import { Workbook } from "exceljs";
import { testConfig } from "../testConfig";
import Utils from "@utils/Utils";

import path from "path";
const waitForElement = testConfig.waitForElement;
const waitForNetwork = testConfig.waitForNetwork;

export class WebActions {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigateToURL(url: string) {
    await this.page.goto(url);
  }

  async decipherPassword(): Promise<string> {
    const key = `RISKIQ`;
    return "";
  }

  async waitForPageNavigation(event: string): Promise<void> {
    switch (event.toLowerCase()) {
      case `networkidle`:
        await this.page.waitForNavigation({
          waitUntil: `networkidle`,
          timeout: waitForElement,
        });
        break;
      case `load`:
        await this.page.waitForNavigation({
          waitUntil: `load`,
          timeout: waitForElement,
        });
        break;
      case `domcontentloaded`:
        await this.page.waitForNavigation({
          waitUntil: `domcontentloaded`,
          timeout: waitForElement,
        });
    }
  }

  async delay(time: number): Promise<void> {
    return new Promise(function (resolve) {
      setTimeout(resolve, time);
    });
  }

  async clickElement(locator: string): Promise<void> {
    await this.page.click(locator);
  }
  async clickElementAtIndex(locator: string, index: number): Promise<void> {
    await this.page.locator(locator).nth(index).click();
  }

  async clickElementHandleNode(locator: ElementHandle<Node>): Promise<void> {
    await locator.click();
  }

  async clickLocator(locator: Locator): Promise<void> {
    await locator.click();
  }
  async clickOnRandomLocator(locator: string): Promise<void> {
    const size = await this.page.locator(locator).count();
    const random = Utils.getRandomNumber(size - 1);
    await this.page.locator(locator).nth(random).click();
  }

  async clickElementJS(locator: string): Promise<void> {
    await this.page.$eval(locator, (element: HTMLElement) => element.click());
  }

  async waitNetwork(path: string, code: number, timeout = 5000): Promise<void> {
    // Wait Network
    await Promise.all([
      this.page.waitForResponse(
        (resp) => {
          return resp.url().includes(path) && resp.status() === code;
        },
        { timeout: timeout > waitForNetwork ? timeout : waitForNetwork }
      ),
    ]);
  }

  async boundingBoxClickElement(locator: string): Promise<void> {
    await this.delay(1000);
    const elementHandle = await this.page.$(locator);
    const box = await elementHandle.boundingBox();
    await this.page.mouse.click(box.x + box.width / 2, box.y + box.height / 2);
  }

  async enterElementText(locator: string, text: string): Promise<void> {
    await this.page.fill(locator, text);
  }
  async typeElementText(
    locator: string,
    text: string,
    delay?: number
  ): Promise<void> {
    await this.page.locator(locator).type(text, { delay: delay || 0 });
  }

  async dragAndDrop(
    dragElementLocator: string,
    dropElementLocator: string
  ): Promise<void> {
    await this.page.dragAndDrop(dragElementLocator, dropElementLocator);
  }

  async selectOptionFromDropdown(
    locator: string,
    option: string
  ): Promise<void> {
    const selectDropDownLocator = await this.page.$(locator);
    selectDropDownLocator.type(option);
  }

  async selectOptionFromDivDropdown(
    dropdown: string,
    option: string
  ): Promise<void> {
    await this.page.locator(dropdown).click();
    await this.page.locator(option).click();
  }

  async getTextFromWebElements(locator: string): Promise<string[]> {
    return this.page.$$eval(locator, (elements) =>
      elements.map((item) => item.textContent.trim())
    );
  }

  async downloadFile(locator: string): Promise<string> {
    const [download] = await Promise.all([
      this.page.waitForEvent(`download`),
      this.page.click(locator),
    ]);
    await download.saveAs(
      path.join(__dirname, `../Downloads`, download.suggestedFilename())
    );
    return download.suggestedFilename();
  }

  async keyPress(locator: string, key: string): Promise<void> {
    this.page.press(locator, key);
  }
  async locatorKeyPress(locator: string, key: string): Promise<void> {
    await this.page.locator(locator).press(key);
  }

  async readDataFromExcel(
    fileName: string,
    sheetName: string,
    rowNum: number,
    cellNum: number
  ): Promise<string> {
    const workbook = new Workbook();
    return workbook.xlsx.readFile(`./Downloads/${fileName}`).then(function () {
      const sheet = workbook.getWorksheet(sheetName);
      return sheet.getRow(rowNum).getCell(cellNum).toString();
    });
  }

  async readValuesFromTextFile(filePath: string): Promise<string> {
    return fs.readFileSync(`${filePath}`, `utf-8`);
  }

  async scrollElementToEnd(locator: string): Promise<void> {
    await this.verifyElementIsDisplayed(locator);
    await this.page.$eval(locator, (el) =>
      el.scrollIntoView({ behavior: "smooth", block: "end", inline: "end" })
    );
  }

  async writeDataIntoTextFile(
    filePath: number | fs.PathLike,
    data: string | NodeJS.ArrayBufferView
  ): Promise<void> {
    fs.writeFile(filePath, data, (error) => {
      if (error) throw error;
    });
  }

  async verifyElementText(locator: string, text: string): Promise<void> {
    const textValue = await this.page.textContent(locator);
    expect(textValue.trim()).toBe(text);
  }
  async verifyElementTextContain(locator: string, text: string): Promise<void> {
    const textValue = await this.page.textContent(locator);
    expect(textValue.trim()).toContain(text);
  }
  async veirfyIfIsMailToLink(locator: string): Promise<void> {
    const href = await this.page.locator(locator).getAttribute("href");
    expect(href).toContain("mailto:");
  }
  async veirfyIfIsLink(locator: string): Promise<void> {
    const href = await this.page.locator(locator).getAttribute("href");
    expect(href).not.toEqual(null);
  }
  async veirfyIfLocatorIsLink(locator: Locator): Promise<void> {
    const href = await locator.getAttribute("href");
    expect(href).not.toEqual(null);
  }

  async verifyNewWindowUrlAndClick(
    context: BrowserContext,
    newWindowLocator: string,
    urlText: string,
    clickOnNewWindowLocator: string
  ): Promise<void> {
    const [newPage] = await Promise.all([
      context.waitForEvent("page"),
      this.page.click(newWindowLocator),
    ]);
    await newPage.waitForLoadState();
    expect(newPage.url()).toContain(urlText);
    await newPage.click(clickOnNewWindowLocator);
    await newPage.close();
  }

  async verifyElementContainsText(
    locator: string,
    text: string
  ): Promise<void> {
    await expect(this.page.locator(locator)).toContainText(text);
  }

  async verifyJSElementValue(locator: string, text: string): Promise<void> {
    const textValue = await this.page.$eval(
      locator,
      (element: HTMLInputElement) => element.value
    );
    expect(textValue.trim()).toBe(text);
  }

  async verifyElementAttribute(
    locator: string,
    attribute: string,
    value: string
  ): Promise<void> {
    const textValue = await this.page.getAttribute(locator, attribute);
    expect(textValue.trim()).toBe(value);
  }

  async verifyElementIsDisplayed(
    locator: string,
    timeout?: number,
    errorMessage?: string
  ): Promise<void> {
    await this.page
      .waitForSelector(locator, {
        state: `visible`,
        timeout: timeout || waitForElement,
      })
      .catch(() => {
        throw new Error(`${errorMessage || ""}`);
      });
  }
  async verifyElementIsNotDisplayed(
    locator: string,
    errorMessage?: string
  ): Promise<void> {
    await this.page
      .waitForSelector(locator, { state: `detached`, timeout: waitForElement })
      .catch(() => {
        throw new Error(`${errorMessage || ""}`);
      });
  }

  async verifyEitherElementIsDisplayed(
    locator: string,
    locator2: string,
    errorMessage?: string
  ): Promise<void> {
    let visible = await this.page.isVisible(locator);
    if (!visible) {
      visible = await this.page.isVisible(locator2);
    }
    expect(visible, `${errorMessage}` || "Element was not visible").toBe(true);
  }

  async expectToBeTrue(status: boolean, errorMessage: string): Promise<void> {
    expect(status, `${errorMessage}`).toBe(true);
  }

  async expectToBeContain(
    text: string,
    containt: string,
    errorMessage?: string
  ) {
    expect(text, `${errorMessage}` || "The text was not Contain").toContain(
      containt
    );
  }

  async expectToBeStrictEqual(
    total: any,
    equal: any,
    errorMessage?: string
  ): Promise<void> {
    expect(total, `${errorMessage}` || "The total was not Equal").toStrictEqual(
      equal
    );
  }

  async expectToBeEqual(
    total: any,
    equal: any,
    errorMessage?: string
  ): Promise<void> {
    expect(total, `${errorMessage}` || "The total was not Equal").toEqual(
      equal
    );
  }

  async expectToBeNoEqual(
    total: number,
    equal: number,
    errorMessage?: string
  ): Promise<void> {
    expect(total, `${errorMessage}` || "The total was not Equal").not.toEqual(
      equal
    );
  }

  async expectToBeGreaterThan(
    total: number,
    greater: number,
    errorMessage?: string
  ): Promise<void> {
    expect(
      total,
      `${errorMessage}` || "The total was not Greater"
    ).toBeGreaterThan(greater);
  }

  async expectToBeGreaterThanOrEqual(
    total: number,
    greater: number,
    errorMessage?: string
  ): Promise<void> {
    expect(
      total,
      `${errorMessage}` || "The total was not Greater or Equal"
    ).toBeGreaterThanOrEqual(greater);
  }

  async expectToBeValue(
    expectedValue: string,
    actualValue: string,
    errorMessage: string
  ): Promise<void> {
    expect(expectedValue.trim(), `${errorMessage}`).toBe(actualValue);
  }

  async expectToBeValueNumber(
    expectedValue: number,
    actualValue: number,
    errorMessage: string
  ): Promise<void> {
    expect(expectedValue, `${errorMessage}`).toBe(actualValue);
  }

  async verifyToBeVisible(locator: string) {
    await expect(this.page.locator(locator)).toBeVisible();
  }

  async verifyToBeVisibleByLocator(locator: Locator) {
    await expect(locator).toBeVisible();
  }

  async verifyToBeContainLocator(componet: Locator, locator: Locator) {
    await expect(componet).toContain(locator);
  }

  async verifyToBeNotVisible(locator: string) {
    await expect(this.page.locator(locator)).not.toBeVisible();
  }
  async verifyArrayIsEqual(locator: string, array: string[]) {
    const texts = await this.page.locator(locator).allTextContents();
    expect(
      texts.map((text) => text.replace(/\([0-9]\)|[^aA-zZ\s0-9+]/g, "").trim())
    ).toEqual(array);
  }
  async verifyArrayContains(locator: string, array: string[]) {
    const texts = this.page.locator(locator);
    await expect(texts).toContainText(array);
  }
  async verifyElementOnList(locator: string, element: string) {
    const texts = await this.page.locator(locator).allTextContents();
    expect(texts.includes(element)).toBe(true);
  }
  async getText(locator: string) {
    return await this.page.locator(locator).textContent();
  }
  async getTextLocator(locator: Locator) {
    return await locator.textContent();
  }

  async getFillColor(locator: string) {
    const element = this.page.locator(locator);
    const fill = await element.evaluate((ele) => {
      return window.getComputedStyle(ele).getPropertyValue("fill");
    });
    return fill;
  }

  async getCount(locator: string) {
    return await this.page.locator(locator).count();
  }
  async areListsInComplementaryOrder(list1: string[], list2: string[]) {
    const listSorted = list1.sort();
    expect(Utils.areListEquals(listSorted, list2)).toBe(true);
  }

  async getCountOfTab(tab: string) {
    let counterText;
    do {
      counterText = await this.getCounterText(tab);
    } while (counterText === "...");
    return counterText;
  }
  async getCounterText(tab: string) {
    const counterText = await this.page
      .locator(Utils.getDivByName(tab))
      .textContent();
    return counterText
      .substring(counterText.indexOf("(") + 1, counterText.indexOf(")"))
      .replace("+", "");
  }
  async getCountOfButtonTab(tab: string, type?: string) {
    let counterText;
    do {
      counterText = await this.getButtonCounterText(tab, type);
    } while (counterText === "...");
    return counterText;
  }
  async getButtonCounterText(tab: string, type?: string) {
    const locator =
      type === "name"
        ? Utils.getButtonStartsWith(tab)
        : Utils.getButtonStartsWithName(tab);
    const counterText = await this.page.locator(locator).textContent();
    return counterText
      .substring(counterText.indexOf("(") + 1, counterText.indexOf(")"))
      .replace("+", "");
  }

  async checksDownload(element: string) {
    const [download] = await Promise.all([
      // Start waiting for the download
      this.page.waitForEvent("download"),
      // Perform the action that initiates download
      await this.clickElement(element),
    ]);

    // Wait for the download process to complete
    const path = await download.path();
    expect(path).not.toBe(null);
  }

  async isCommaSeparated(locator: string) {
    const items = await this.page.locator(locator).allTextContents();
    items.forEach((item) => {
      if (!item.includes(",")) {
        return false;
      }
    });
    return true;
  }

  async isNotClickable(locator: string, index: number): Promise<void> {
    const linkHref = this.page.locator(locator);
    const url = await linkHref.getAttribute("href");
    return expect(url).toEqual(null);
  }
  async isInteger(text: any): Promise<void> {
    return expect(!isNaN(parseFloat(text))).toEqual(true);
  }
  async isDate(date: any): Promise<void> {
    expect(
      /^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/.test(date)
    ).toEqual(true);
  }
  async inArray(value: any, array: string[]): Promise<void> {
    expect(array.includes(value)).toBe(true);
  }
}
