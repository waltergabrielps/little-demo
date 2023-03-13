import test from "@lib/BaseTest";
const list = [
  "All",
  "Remote Access",
  "Data Store",
  "Server",
  "Email Server",
  "Network Device",
  "Building Control System",
  "Internet of Things",
  "Other Services",
  "Filtered Ports",
];
test.describe("Services tab Tests", () => {
  test(`Services tab`, async ({ homePage, searchPage }) => {
    await test.step("Navigate to URL of Home", async () => {
      await homePage.navigateToURL();
    });
    await test.step("The user search by All with 162.19.75.40", async () => {
      await homePage.searchByWord("All", "162.19.75.40");
    });
    await test.step("The user clicks on the Data tab", async () => {
      await searchPage.clicksOnTabSpan("Data");
    });
    await test.step("The user sees in the Data list an element called 'Services'", async () => {
      await searchPage.checksButtonStartsWithNameDisplayed("Services");
    });
    await test.step("the user clicks on the 'Services' Tab", async () => {
      await searchPage.clicksOnTab("Services");
    });
    await test.step("Sees the next tabs under services tab", async () => {
      await searchPage.checksButtonsByArrayNamesDisplayed(list);
    });
    await test.step("Sees the count of the parent matches the total count", async () => {
      await searchPage.checksCountOfParentMatchTotal("Services", list);
    });
    await test.step("Sorting by 'Name' is 'ascending' by default in 'Projects'", async () => {
      await searchPage.checksDisabledTabs(list);
    });
  });

  test(`User do not see the Services Tab searching a Domain`, async ({ homePage, searchPage }) => {
    await test.step("Navigate to URL of Home", async () => {
      await homePage.navigateToURL();
    });
    await test.step("The user search by All with google.com", async () => {
      await homePage.searchByWord("All", "google.com");
    });
    await test.step("The user clicks on the Data tab", async () => {
      await searchPage.clicksOnTabSpan("Data");
    });
    await test.step("The user sees in the Data list an element called 'Services'", async () => {
      await searchPage.checksDivByNameIsNotDisplayed("Services");
    });
  });
});
