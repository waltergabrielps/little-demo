import test from "@lib/BaseTest";

// UNKNOWN IP
test.describe("Reputation Score Feature", () => {
  test("Reputation summary card with a Unknown IP", async ({ homePage, searchPage }) => {
    await test.step("Navigate to URL of Home", async () => {
      await homePage.navigateToURL();
    });
    await test.step("The user search by All with 8.8.8.8", async () => {
      await homePage.searchByWord("All", "8.8.8.8");
    });
    await test.step("The user see the card items called", async () => {
      await searchPage.checksDivByNameDisplayed("Reputation");
    });
    await test.step("Checks the reputation header", async () => {
      await searchPage.checksReputationHeader();
    });
    await test.step("Checks the reputation score", async () => {
      await searchPage.checksReputationScore();
    });  
  });

// SUSPICIOUS IP
  test("Reputation summary card with a Suspicious IP", async ({ homePage, searchPage }) => {
    await test.step("Navigate to URL of Home", async () => {
      await homePage.navigateToURL();
    });
    await test.step("The user search by All with 212.32.237.101", async () => {
      await homePage.searchByWord("All", "212.32.237.101");
    });
    await test.step("The user see the card items called", async () => {
      await searchPage.checksDivByNameDisplayed("Reputation");
    });
    await test.step("Checks the reputation header", async () => {
      await searchPage.checksReputationHeader();
    });
    await test.step("Checks the reputation score", async () => {
      await searchPage.checksReputationScore();
    });  
  });
  // MALICIOUS IP
  test("Reputation summary card with a Malicious IP", async ({ homePage, searchPage }) => {
    await test.step("Navigate to URL of Home", async () => {
      await homePage.navigateToURL();
    });
    await test.step("The user search by All with 108.62.118.232", async () => {
      await homePage.searchByWord("All", "108.62.118.232");
    });
    await test.step("The user see the card items called", async () => {
      await searchPage.checksDivByNameDisplayed("Reputation");
    });
    await test.step("Checks the reputation header", async () => {
      await searchPage.checksReputationHeader();
    });
    await test.step("Checks the reputation score", async () => {
      await searchPage.checksReputationScore();
    });  
  });
  // NEUTRAL IP
  test("Reputation summary card with a Neutral IP", async ({ homePage, searchPage }) => {
    await test.step("Navigate to URL of Home", async () => {
      await homePage.navigateToURL();
    });
    await test.step("The user search by All with 63.143.32.91", async () => {
      await homePage.searchByWord("All", "63.143.32.91");
    });
    await test.step("The user see the card items called", async () => {
      await searchPage.checksDivByNameDisplayed("Reputation");
    });
    await test.step("Checks the reputation header", async () => {
      await searchPage.checksReputationHeader();
    });
    await test.step("Checks the reputation score", async () => {
      await searchPage.checksReputationScore();
    });  
  });
});
