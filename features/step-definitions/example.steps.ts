import {Given, Then, When} from '@cucumber/cucumber';
import {page} from "../../src/support/hooks";
import {LoginPage} from "../../src/pages/loginPage";
import {Pages} from "../../src/enums/common.enum";
import {CustomWorld} from "../../src/support/world";

let loginPage: LoginPage

Given('I navigate to {page}', async function (this: CustomWorld, pageName: Pages) {
    if (pageName == Pages.Login) {
        loginPage = new LoginPage(page);
        await page.goto('https://practicetestautomation.com/practice-test-login/');
        await loginPage.checkPageTitle();
    } else {
        await page.goto(pageName);
    }
});

When('I login incorrect', async function (this: CustomWorld) {
    await loginPage.enterUsername('slcjslcsecd');
    await loginPage.submitLoginForm();
});

Then('I should see the error message: {string}', async function (this: CustomWorld, message: string) {
    this.logger.info('💀💀💀 test gonna fail now...');
    await loginPage.checkErrorMessage(message);
});