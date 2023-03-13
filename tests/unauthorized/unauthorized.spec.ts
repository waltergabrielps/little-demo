import test from "@lib/BaseTest";
import { WebActions } from "@lib/WebActions";

test.describe("Unauthorized Page Tests", () => {
  // eslint-disable-next-line playwright/no-skipped-test
  test(`Check Unauthorized Page`, async ({ unauthorizedPage }) => {
    await test.step("Navigate to the URL", async () => {
      await unauthorizedPage.navigateToURL();
    });
    await test.step("The user sees the message of unauthorized page", async () => {
        await unauthorizedPage.isMessageProperlyLoaded()
    })
    await test.step("The user sees mail to contact", async () => {
        await unauthorizedPage.isEmailToMessageProperlyLoaded()
    })
  });
});
