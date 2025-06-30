import {Given, Then, When} from '@cucumber/cucumber';
import {page} from "../../src/support/hooks";
import {LoginPage} from "../../src/pages/loginPage";
import {Pages} from "../../src/enums/common.enum";
import {CustomWorld} from "../../src/support/world";
import {testUser} from "../../src/data/userData";

let loginPage: LoginPage

Given('I navigate to {page}', async function (this: CustomWorld, pageName: Pages) {
    this.logger.info("Going to main page");
    if (pageName == Pages.Login) {
        loginPage = new LoginPage(page);
        await page.goto('https://thinking-tester-contact-list.herokuapp.com/');
        } else {
        await page.goto(pageName);
    }
    await loginPage.clickButton('signup');
});

When('I create new user', async function (this: CustomWorld) {
    this.logger.info("Registration");
    await loginPage.enterUserData()
    await this.page.waitForURL('**/contactList', { timeout: 500 });
    if (this.page.url().includes('/contactList')) {
        this.logger.info("Successfully created new user");
    } else {
        this.logger.error(`Not redirected correctly. Current URL: ${this.page.url()}`);
        throw new Error("User was not redirected to contacts page");
    }
})

Then('I create new contact and check it', async function (this: CustomWorld) {
    this.logger.info("Creating new contact");
    await loginPage.clickButton('add');
    await this.page.waitForURL('**/addContact', { timeout: 500 });
    await loginPage.enterUserData(true)

    await this.page.waitForURL('**/contactList', { timeout: 500 });
    if (this.page.url().includes('/contactList')) {
        this.logger.info("Successfully created new contact");
    } else {
        this.logger.error(`error creating new contact`);
        throw new Error("error creating new contact");
    }
    const fullName = `${testUser.firstName} ${testUser.lastName}`;
    await page.locator('table#myTable td').filter({ hasText: fullName }).click();

    if (this.page.url().includes('/contactDetails')) {
        this.logger.info("Contact existed");
    }
})


Then('I delete if it exists', async function (this: CustomWorld) {
    page.once('dialog', async dialog => {
       await dialog.accept();
    });
    await loginPage.clickButton('delete');
    this.logger.info("Contact deleted");
})
