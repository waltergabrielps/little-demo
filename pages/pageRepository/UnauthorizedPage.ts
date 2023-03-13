import { WebActions } from "@lib/WebActions";
import { Page } from "@playwright/test";
import { HomePageObjects } from "@objects/HomePageObjects";
import AppContext from "@utils/AppContext";
import { UnauthorizedPageObjects } from "@objects/UnauthorizedPageObjects";

let webActions: WebActions;

export class UnauthorizedPage extends UnauthorizedPageObjects {
  readonly page: Page;

  constructor(page: Page) {
    super();
    this.page = page;
    webActions = new WebActions(this.page);
  }

  async navigateToURL(): Promise<void> {
    await webActions.navigateToURL(`/unauthorized`);
  }
  async isMessageProperlyLoaded(): Promise<void> {
    await webActions.verifyElementText(UnauthorizedPageObjects.MESSAGE_TITLE, "We need a bit more information");
  }
  async isEmailToMessageProperlyLoaded(): Promise<void> {
    await webActions.verifyElementTextContain(UnauthorizedPageObjects.PARAGRAPH, "Please email");
    await webActions.veirfyIfIsMailToLink(UnauthorizedPage.MAIL_LINK)
  }
  
}
