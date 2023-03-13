import { FullConfig } from "@playwright/test";
import rimraf from "rimraf";


async function globalSetup(config: FullConfig) {
  
    await new Promise(resolve => {
        rimraf(`./allure-results`, resolve);
    });
 
}
export default globalSetup;
