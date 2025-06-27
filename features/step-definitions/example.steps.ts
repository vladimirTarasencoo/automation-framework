import {Given, Then, When} from '@cucumber/cucumber';
import {page} from "../../src/support/hooks";
import {LoginPage} from "../../src/pages/loginPage";
import {Pages} from "../../src/enums/common.enum";
import {CustomWorld} from "../../src/support/world";
import { expect } from 'playwright/test';

let loginPage: LoginPage

Given('I navigate to {page}', async function (this: CustomWorld, pageName: Pages) {
    this.logger.info("going to main page");
    if (pageName == Pages.Login) {
        loginPage = new LoginPage(page);
        await page.goto('https://practicetestautomation.com/practice-test-login/');
        await loginPage.checkPageTitle();
    } else {
        await page.goto(pageName);
    }
    await loginPage.clearFields();
});

When('I log in as {string} with {string}', async function (this: CustomWorld, login: string, password: string) {
        await loginPage.enterUsername(login);
        await loginPage.enterPassword(password);
        this.logger.info("push the submit");
        await loginPage.submitLoginForm();
});

Then('I should see {string}', async function (this: CustomWorld, message: string) {
    if (message === 'Logged In Successfully') {
        await loginPage.verifySuccessTitle(message);
        this.logger.info("successfully logged in");
        await loginPage.logOutClick()
    } else {
        await loginPage.checkErrorMessage(message)
        this.logger.info("successfully did not logged in with error: " + message);
    }
});
