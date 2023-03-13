import test from "@lib/BaseTest";

test.describe("Articles Panel Tests", () => {

    test(`User should see most recent articles`, async ({homePage}) => {
        await test.step("Navigate to the URL", async () => {
            await homePage.navigateToURL();
        });

        await test.step("The number of articles is 5", async()=>{
            await homePage.theNumberOfArticlesIs(5); 
        });  
    });

    test(`All articles are loaded properly`, async ({homePage}) => {
        await test.step("Navigate to the URL", async () => {
            await homePage.navigateToURL();
        });
        await test.step("all the articles are loaded properly", async()=>{
            await homePage.allTheArticlesAreLoadedProperly(); 
        }); 
        await test.step("the arrows of the pagination works properly", async()=>{
            await homePage.areTheArrowsWorkingProperly(); 
        });
        await test.step("the total count is displayed", async()=>{
            await homePage.isTotalDisplayed(); 
        });
        await test.step("the user is able to choose the 10 next and prior pages", async()=>{
            await homePage.isPaginationJumpingToTheNextAndThePriorPages(10); 
        });  
    });

    test(`Article shared by Email`, async ({homePage, articlePage}) => {
        await test.step("Navigate to the URL", async () => {
            await homePage.navigateToURL();
        });
        await test.step("the user goes inside an article", async()=>{
            await homePage.theUserGoToAnArticle(); 
        }); 
        await test.step("shares it through email", async()=>{
            await articlePage.sharesIt("email"); 
        }); 
    });

    test(`Article shared by Link`, async ({homePage, articlePage, browserName}) => {
        test.skip(browserName === 'firefox', 'Still working on it');
        await test.step("Navigate to the URL", async () => {
            await homePage.navigateToURL();
        });
        await test.step("the user goes inside an article", async()=>{
            await homePage.theUserGoToAnArticle(); 
        }); 
        await test.step("shares it through link", async()=>{
            await articlePage.sharesIt("link"); 
        }); 
    });

    test(`All articles are loaded properly by Hyperlink`, async ({homePage, articlePage}) => {
        await test.step("Navigate to the URL", async () => {
            await homePage.navigateToURL();
        });
        await test.step("the user goes inside an article", async()=>{
            await homePage.theUserGoToAnArticle(); 
        }); 
        await test.step("the user clicks the hyperlink", async()=>{
            await articlePage.theUserClicksTheHyperlink(); 
        }); 
    });

    test(`All articles are loaded properly and the title should match`, async ({homePage, articlePage}) => {
        await test.step("Navigate to the URL", async () => {
            await homePage.navigateToURL();
        });
        await test.step("the user goes inside an article", async()=>{
            await homePage.theUserGoToAnArticle(); 
        }); 
        await test.step("the user should see the last 10 articles", async()=>{
            await articlePage.isTheLatestArticleListAmountCorrect(10); 
        }); 
        await test.step("the user should see the last 10 articles", async()=>{
            await articlePage.isTheLatestArticleTitleCorrect(); 
        }); 
    });

});