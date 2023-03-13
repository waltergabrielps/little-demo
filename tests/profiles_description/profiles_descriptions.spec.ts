import test from "@lib/BaseTest";

test.describe("Profile Description Tests", () => {
    //Description Profile
    test(`Checks Profile Description`, async ({ homePage, profilePage}) => {
        await test.step("Navigate to URL of Home", async () => {
          await profilePage.navigateToURL();
        });
        await test.step("The user picks a random profile", async () => {
          await profilePage.pickARandomProfile();
        });
        await test.step("Check profile body description", async () =>{
           await profilePage.checkBodyDescriptions(); 
        })
    })

})