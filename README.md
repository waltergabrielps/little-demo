Defender TI UI smoke test 
===
## Information
- Title:  `Defender TI UI smoke test`
- Authors:  `MINDATA`
- Repo: [https://msazure.visualstudio.com/RiskIQ/_git/playwright-ti-e2e-test]()
- Project type: [Playwright](https://playwright.dev/) 

## Install & Dependence
- [node](https://nodejs.org/en/download/)
- [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)

## Getting Started 🚀

After clone the project you must to install:

- [Playwright](https://playwright.dev/docs/intro#installing-playwright)

- Installing Playwright in the root folder:
  ```
  npm init playwright@latest
  ```

- Run all suite:
  ```
  ENV=ppe npx playwright test --workers 5 --retries 2 
  ```  

- Run specific test:
  ```
  ENV=ppe npx playwright test –g "test name" --retries 2  
  ```   
`You can specify environment (ppe or prod), workers (number of workers for parallel test) and retries (number of retries for failed test)`

After run the tc you must to open the report:

- Open Html report:
  ```
  npx playwright show-report html-report  
  ```   
- Open the Allure report:
  ```
  npx allure generate allure-results --clean && npx allure open 
  ```     

## Directory Hierarchy
```
|—— .pipelines
|—— allure-report
|—— allure-results
|—— html-report
|—— lib
    |——BaseTest.ts
    |——WebActions.ts
|——logs
    |——info.log
|——node_modules
|——pages
    |——objectRepository
    |——pageRepository
|——test-results
|——tests
    |——accessible_search_page
    |——article_download
    |——article_panel
    |——articles_header
    |——articles_indicators_tab
    |——cve_articles
    |——featured_articles_panel
    |——happy_path
    |——project_add_artifact
    |——project_history_tab
    |——projects_filters
    |——projects-list-download
    |——search_summary_add_edit_tags
    |——unauthorized
    |——login.spec.ts
    |——projects.spec.ts
    |——test.spec.ts
|——utils
    |——AppContext.ts
    |——global-setup.ts
    |——global-teardown.ts
|——.gitignore
|——preProductionLoggedInState.json
|——CustomReporterConfig.ts
|——notLoggedInState.json
|——package-lock.json
|——package.json
|——playwright.config.ts
|——productionLoggedInState.json
|——README.md
|——testConfig.ts
|——tsconfig.json