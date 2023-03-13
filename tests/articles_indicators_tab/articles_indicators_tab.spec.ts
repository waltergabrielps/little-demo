import test from "@lib/BaseTest";

test.describe("Articles Indicators Tab Tests", () => {

    test(`Check the user see the public indicators tab`, async ({homePage, articlePage}) => {
        await test.step("Navigate to the URL", async () => {
            await homePage.navigateToURL();
        });
        await test.step("the user goes inside an article", async()=>{
            await homePage.theUserGoToAnArticle(); 
        }); 
        await test.step("the user see the public indicators tab", async()=>{
            await articlePage.isIndicatorTabDisplayed("Public indicators"); 
        });
    });

    test(`Check the user see the  defender ti indicators tab`, async ({homePage, articlePage}) => {
        await test.step("Navigate to the URL", async () => {
            await homePage.navigateToURL();
        });
        await test.step("the user goes inside an article", async()=>{
            await homePage.theUserGoToAnArticle(); 
        }); 
        await test.step("the user see the public indicators tab", async()=>{
            await articlePage.isIndicatorTabDisplayed("Defender TI indicators"); 
        });
    });

    test(`Check Public indicators tab header shows a count of the number of indicators`, async ({homePage, articlePage}) => {
        await test.step("Navigate to the URL", async () => {
            await homePage.navigateToURL();
        });
        await test.step("the user goes inside an article", async()=>{
            await homePage.theUserGoToAnArticle(); 
        }); 
        await test.step("Public indicators tab header shows a count of the number of indicators", async()=>{
            await articlePage.isCountDisplayed("Public indicators");  
        });
    });

    test(`Check Defender TI indicators tab header shows a count of the number of indicators`, async ({homePage, articlePage}) => {
        await test.step("Navigate to the URL", async () => {
            await homePage.navigateToURL();
        });
        await test.step("the user goes inside an article", async()=>{
            await homePage.theUserGoToAnArticle(); 
        }); 
        await test.step("Defender TI tab header shows a count of the number of indicators", async()=>{
            await articlePage.isCountDisplayed("Defender TI Indicators");  
        });
    });

    test(`Check Public indicators tab should display the content properly`, async ({homePage, articlePage}) => {
        await test.step("Navigate to the URL", async () => {
            await homePage.navigateToURL();
        });
        await test.step("the user goes inside an article", async()=>{
            await homePage.theUserGoToAnArticle(); 
        }); 
        await test.step("Public indicators tab should display the content properly", async()=>{
                await articlePage.isDisplayContentProperly("Public indicators");  
        });
    });

    test(`Check Defender TI indicators tab should display the content properly`, async ({homePage, articlePage}) => {
        await test.step("Navigate to the URL", async () => {
            await homePage.navigateToURL();
        });
        await test.step("the user goes inside an article", async()=>{
            await homePage.theUserGoToAnArticle(); 
        }); 
        await test.step("Defender TI tab should display the content properly", async()=>{
            await articlePage.isDisplayContentProperly("Defender TI");  
        });
    });

    test(`Article checks type is clickable`, async ({homePage, articlePage}) => {
        await test.step("Navigate to the URL", async () => {
            await homePage.navigateToURL();
        });
        await test.step("the user goes inside an article", async()=>{
            await homePage.theUserGoToAnArticle(); 
        }); 
        await test.step("each Name column of each tab should link if the type is clickable and is clicked", async()=>{
            await articlePage.theUserClicksTheIndicator("Defender TI");  
        });
    });

});