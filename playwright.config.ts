import type { PlaywrightTestConfig } from "@playwright/test";
import { devices } from "@playwright/test";
import { testConfig } from "./testConfig";

const ENV = process.env.ENV;
if (!ENV || ![`ppe`, `prod`].includes(ENV)) {
  console.log(
    `Please provide a correct environment value like "ENV=ppe|prod npx playwright test"`
  );
  process.exit();
}

/**
 * See https://playwright.dev/docs/test-configuration.
 */
const config: PlaywrightTestConfig = {
  testDir: "./tests",
  /* Maximum time one test can run for. */
  timeout: 240 * 1000,
  expect: {
    /**
     * Maximum time expect() should wait for the condition to be met.
     * For example in `await expect(locator).toHaveText();`
     */
    timeout: 10000,
  },
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [[`./CustomReporterConfig.ts`], [`experimental-allure-playwright`], [`html`, { outputFolder: 'html-report', open: 'never' }]],
    //Global Setup to run before all tests
    globalSetup: `./utils/global-setup`,

    //Global Teardown to run after all tests
    globalTeardown: `./utils/global-teardown`,
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Maximum time each action such as `click()` can take. Defaults to 0 (no limit). */
    actionTimeout: 0,
    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: 'http://localhost:3000',

    //Picks Base Url based on User input
    baseURL: testConfig[process.env.ENV],

    //Browser Mode
    headless: true,
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    // trace: "on-first-retry",
    trace: "retain-on-failure",
    /* Store state */
    storageState: testConfig[process.env.ENV] === testConfig['ppe'] ? 'preProductionLoggedInState.json' : 'productionLoggedInState.json',
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: "chromium",
      use: {
        channel: "chrome",
        baseURL: testConfig[process.env.ENV],
        ...devices["Desktop Chrome"],
        headless: true,
        viewport: { width: 1500, height: 730 },
        ignoreHTTPSErrors: true,
        acceptDownloads: true,
        screenshot: `only-on-failure`,
        video: `retain-on-failure`,
        trace: `retain-on-failure`,
        contextOptions: {
          permissions: ['clipboard-read', 'clipboard-write'],
        },
        launchOptions: {
          slowMo: 0,
        },
      },
    },
    {
      name: "firefox",
      use: {
        baseURL: testConfig[process.env.ENV],
        ...devices["Desktop Firefox"],
        headless: true,
        viewport: { width: 1500, height: 730 },
        ignoreHTTPSErrors: true,
        acceptDownloads: true,
        screenshot: `only-on-failure`,
        video: `retain-on-failure`,
        trace: `retain-on-failure`,
        launchOptions: {
          slowMo: 0,
        },
      },
    },

    {
      name: `Edge`,
      use: {
        browserName: `chromium`,
        channel: `msedge`,
        baseURL: testConfig[process.env.ENV],
        headless: true,
        viewport: { width: 1500, height: 730 },
        ignoreHTTPSErrors: true,
        acceptDownloads: true,
        screenshot: `only-on-failure`,
        video: `retain-on-failure`,
        trace: `retain-on-failure`,
        contextOptions: {
          permissions: ['clipboard-read', 'clipboard-write'],
        },
        launchOptions: {
          slowMo: 0,
        },
      },
    },

    // {
    //   name: 'webkit',
    //   baseURL: testConfig[process.env.ENV],
    //   use: {
    //     ...devices['Desktop Safari'],
    //   },
    // },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: {
    //     ...devices['Pixel 5'],
    //   },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: {
    //     ...devices['iPhone 12'],
    //   },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: {
    //     channel: 'msedge',
    //   },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: {
    //     channel: 'chrome',
    //   },
    // },
  ],

  /* Folder for test artifacts such as screenshots, videos, traces, etc. */
  // outputDir: 'test-results/',

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   port: 3000,
  // },
};

export default config;
