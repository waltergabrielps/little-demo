import test from "@lib/BaseTest";

test.describe("Profile Tests", () => {
    // Header of Project
    test(`Checks Profile Indicators`, async ({ homePage, profilePage}) => {
      await test.step("Navigate to URL of Home", async () => {
        await profilePage.navigateToURL();
      });
      await test.step("The user picks a random profile", async () => {
        await profilePage.pickARandomProfile();
        });
         await test.step("Clicks on the indicators tab", async () => {
            await profilePage.clicksOnIndicatorsTab();
        });
         await test.step("Checks labels and Values on Indicators tab", async () => {
            await profilePage.checksLabelsAndValuesFromIndicatorsTab();
        });
         await test.step("Checks the download button", async () => {
            await profilePage.checksDownloadButton();
        });
        await test.step("The user see the columns of Indicators tab called", async () => {
          await profilePage.checksTheCollumns([
            "Type",
            "Artifact",
            "First Seen",
            "Last Seen",
            "Source",
          ]);
        });
        await test.step("The user checks the values of the columns are Date", async () => {
          await profilePage.checksTheCollumnsAreDate([
            "First Seen",
            "Last Seen",
          ]);
        });
        await test.step("The user checks the Column Source", async () => {
          await profilePage.checksTheCollumnSource();
        });
    });
  


});