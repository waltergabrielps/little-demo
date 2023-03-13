import test from "@lib/BaseTest";
import { ProjectsPageObjects } from "@objects/ProjectsPageObjects";
import { ProjectsPage } from "@pages/ProjectsPage";
import AppContext from "@utils/AppContext";
import Utils from "@utils/Utils";

// Test Filters on Projects page.
test.describe("Project Filters", () => {
  test(`Checks the project filters`, async ({ projectsPage }) => {
    await test.step("Navigate to URL of Projects", async () => {
      await projectsPage.navigateToURL();
    });
    await test.step("The filters should be visible in the top of the list in Team Projects Tab", async () => {
      await projectsPage.checksVisibilityOfFilters([
        "My Projects",
        "Team Projects",
        "Shared Projects",
      ]);
    });
    await test.step("The user selects Team Tab", async () => {
      await projectsPage.selectsTab("Team Projects")
    })
    await test.step("The user selects and removes a filter", async () => {
      await projectsPage.checksDeleteFilter();
    });
    await test.step("The user checks multiple filters", async () => {
      await projectsPage.checksMultipleFilters();
    });
    await test.step("Sorting action should be possible over the filtered list.", async () => {
      await projectsPage.checksSortingOnFilteredList();
    });
  });
});
