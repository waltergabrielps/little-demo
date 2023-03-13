import { WebActions } from "@lib/WebActions";
import { LoginPageObjects } from "@objects/LoginPageObjects";
import type { Page } from "@playwright/test";
import { testConfig } from "../../testConfig";

let webActions: WebActions;

export class LoginPage extends LoginPageObjects {
  readonly page: Page;

  constructor(page: Page) {
    super();
    this.page = page;
    webActions = new WebActions(this.page);
  }

  async navigateToURL(): Promise<void> {
    await webActions.navigateToURL(testConfig[process.env.ENV]);
  }

  async loginToApplication(): Promise<void> {
    const decipherPassword = await webActions.decipherPassword();
  }

  async storeState(fileName: string): Promise<void> {
    await this.page.context().storageState({ path: fileName });
  }
}
