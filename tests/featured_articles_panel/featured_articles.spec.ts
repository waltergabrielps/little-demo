import test from "@lib/BaseTest";

test.describe("User sees the most recent featured articles", () => {

    test(`User should see most recent featured articles.`, async ({homePage}) => {
        await test.step("Navigate to the URL", async () => {
            await homePage.navigateToURL();
        });

        await test.step("The number of feature articles is 4", async()=>{
            await homePage.theNumberOfFeatureArticlesIs(4); 
        });  
    });

    test(`All featured articles are loaded properly`, async ({homePage}) => {
        await test.step("Navigate to the URL", async () => {
            await homePage.navigateToURL();
        });
        await test.step("all the articles are loaded properly", async()=>{
            await homePage.allTheFeatureArticlesAreLoadedProperly(); 
        }); 
    });

})