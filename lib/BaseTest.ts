import { CveArticlePage } from "@pages/CveArticlePage";
import { HomePage } from "@pages/HomePage";
import { ArticlePage } from "@pages/ArticlePage";
import { LoginPage } from "@pages/LoginPage";
import { ProjectsPage } from "@pages/ProjectsPage";
import { ProfilePage } from "@pages/ProfilePage";
import { SearchPage } from "@pages/SearchPage";
import { UnauthorizedPage } from "@pages/UnauthorizedPage";
import { test as baseTest } from "@playwright/test";

const test = baseTest.extend<{
  loginPage: LoginPage;
  projectsPage: ProjectsPage;
  profilePage: ProfilePage;
  searchPage: SearchPage;
  cveArticlePage: CveArticlePage;
  homePage: HomePage;
  unauthorizedPage: UnauthorizedPage;
  articlePage: ArticlePage
}>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
  articlePage: async ({ page }, use) => {
    await use(new ArticlePage(page));
  },
  projectsPage: async ({ page }, use) => {
    await use(new ProjectsPage(page));
  },
  profilePage: async ({ page }, use) => {
    await use(new ProfilePage(page));
  },
  searchPage: async ({ page }, use) => {
    await use(new SearchPage(page));
  },
  cveArticlePage: async ({ page }, use) => {
    await use(new CveArticlePage(page));
  },
  unauthorizedPage: async ({ page }, use) => {
    await use(new UnauthorizedPage(page));
  },
});

export default test;
