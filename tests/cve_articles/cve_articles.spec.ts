import test from "@lib/BaseTest";
import { ProjectsPageObjects } from "@objects/ProjectsPageObjects";
import { ProjectsPage } from "@pages/ProjectsPage";
import AppContext from "@utils/AppContext";
import Utils from "@utils/Utils";

test.describe("CVE Articles Tests", () => {
  // CVE Articles
  test(`The user sees the CVE Articles`, async ({
    homePage,
    cveArticlePage,
  }) => {
    await test.step("Navigate to the URL", async () => {
      await homePage.navigateToURL();
    });
    await test.step("The user search by All with CVE-2020-14882", async () => {
      await homePage.searchByWord("All", "CVE-2020-14882");
    });
    await test.step("The user checks the CVE Article Header", async () => {
      await cveArticlePage.checksHeader();
    });
    await test.step("The user see the tabs called", async () => {
      await cveArticlePage.checksTheTabs([
        "Description",
        "Affected components",
        "Related articles",
      ]);
    });
    await test.step("The user checks the description tab", async () => {
      await cveArticlePage.checksDescription();
    });
    await test.step("Checks the right Panel", async () => {
      await cveArticlePage.checksTheRightPanel();
    });
    await test.step("The user clicks on the 'Affected components' Tab", async () => {
      await cveArticlePage.navigateToTab("Affected components");
    });
    await test.step("Checks the count of pagination is matching in 'Affected components'", async () => {
      await cveArticlePage.isThePaginationComponentMatching(
        "Affected components"
      );
    });
    await test.step("Checks the page size is 10 in 'Affected components'", async () => {
      await cveArticlePage.isThePageSize(10, "Affected components");
    });
    await test.step("The user clicks on the 'Related articles' Tab", async () => {
      await cveArticlePage.navigateToTab("Related articles");
    });
    await test.step("Checks the page size is 5 in 'Related articles'", async () => {
      await cveArticlePage.isThePageSize(5, "Related articles");
    });
    await test.step("Checks the count of pagination is matching in 'Related articles'", async () => {
      await cveArticlePage.isThePaginationComponentMatching("Related articles");
    });
  });
});
