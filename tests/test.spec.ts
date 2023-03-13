import { test } from "@playwright/test";
import { testConfig } from "../testConfig";

// eslint-disable-next-line playwright/no-skipped-test
// test("login", async ({ browser }) => {
//   const context = await browser.newContext({
//     storageState: "notLoggedInState.json",
//   });
//   const page = await context.newPage();
//   await page.goto(testConfig[process.env.ENV]);
//   // eslint-disable-next-line playwright/no-wait-for-timeout
//   await page.waitForTimeout(1000);
//   await page
//     .context()
//     .storageState({
//       path:
//         testConfig[process.env.ENV] === testConfig["ppe"]
//           ? "preProductionLoggedInState.json"
//           : "productionLoggedInState.json",
//     });
//   await browser.close();
// });
