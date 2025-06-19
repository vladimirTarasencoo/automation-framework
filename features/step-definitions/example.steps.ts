import {Given, Then, When} from '@cucumber/cucumber';
import {page} from "../../src/support/hooks";
import {LoginPage} from "../../src/pages/loginPage";
import {Pages} from "../../src/enums/common.enum";
import {CustomWorld} from "../../src/support/world";
import { expect } from 'playwright/test';

let loginPage: LoginPage

Given('I navigate to {page}', async function (this: CustomWorld, pageName: Pages) {
    if (pageName == Pages.Login) {
        loginPage = new LoginPage(page);
        await page.goto('https://practicetestautomation.com/practice-test-login/');
        await loginPage.checkPageTitle();
    } else {
        await page.goto(pageName);
    }
    await loginPage.clearFields();
});

When('I click submit', async function (this: CustomWorld) {
    await loginPage.submitLoginForm();
});

When('I login incorrect', async function (this: CustomWorld) {
    await loginPage.enterUsername('slcjslcsecd');
    await loginPage.submitLoginForm();
});

When('I password incorrect', async function (this: CustomWorld) {
    await loginPage.enterUsername('student');
    await loginPage.enterPassword('111');
    await loginPage.submitLoginForm();
});

Then('I should see the error message: {string}', async function (this: CustomWorld, message: string) {
    await loginPage.checkErrorMessage(message);
    this.logger.info('💀💀💀 incorrect login/password');
});

When('I login correct', async function (this: CustomWorld) {
    await loginPage.enterUsername('student');
    await loginPage.enterPassword('Password123');
    await loginPage.submitLoginForm();
});


Then('I should see text: {string}', async function (this: CustomWorld, expectedText: string) {
    await loginPage.verifySuccessTitle(expectedText);
})

When('I click logout', async function (this: CustomWorld) {
    await loginPage.logOutClick()
    await expect(page).toHaveURL('https://practicetestautomation.com/practice-test-login/')
})

