import {Given, Then, When} from '@cucumber/cucumber';
import {Pages} from "../../src/enums/common.enum";
import {CustomWorld} from "../../src/support/world";
import {LoginPage} from "../../src/pages/LoginPage";
import {ContactsList} from "../../src/pages/ContactsList";
import {ContactCreatePage} from "../../src/pages/ContactCreatePage";
import {ContactPage} from "../../src/pages/ContactPage";

let loginPage: LoginPage;

Given('User navigate to {page}', async function (this: CustomWorld, pageName: Pages) {
    this.logger.info(`Going to page ${pageName}`);
    if (pageName == Pages.LOGIN) {
        loginPage = new LoginPage(this.page);
        await this.page.goto('https://thinking-tester-contact-list.herokuapp.com/');
    } else {
        await this.page.goto(pageName);
    }
    await loginPage.login(this.currentUser, false, false, false);
});

Then('User try to enter with uppercase mail', async function (this: CustomWorld) {
    const contactsList = new ContactsList(this.page);
    await contactsList.logout();
    const loginPage = new LoginPage(this.page);
    try {
        await loginPage.login(this.currentUser, true, false, false);
        this.logger.info(`Uppercase Mail is processed correctly`);
    } catch (error: any) {
        this.logger.info(`Uppercase Mail is processed incorrectly: ${error}`);
    }
});

Then('User click login twice', async function (this: CustomWorld) {
    const contactsList = new ContactsList(this.page);
    await contactsList.logout();
    const loginPage = new LoginPage(this.page);
    this.logger.info(`Try to enter with clicking login button twice`);
    try {
        await loginPage.login(this.currentUser, false, true,false);
        await this.page.waitForURL('**/contactList');
        this.logger.info(`Double clicking is processed correctly`);
    } catch (error: any) {
        this.logger.info(`Double clicking is processed incorrectly: ${error}`);
    }
})

Then('User login by pushing Enter', async function (this: CustomWorld) {
    const contactsList = new ContactsList(this.page);
    await contactsList.logout();
    try {
        await loginPage.login(this.currentUser, false, false, true);
        await this.page.waitForURL('**/contactList');
        this.logger.info(`Enter button works correctly`);
    } catch (error: any) {
        this.logger.info(`Enter button didn't worked: ${error}`);
    }
})

When('User create new contact', async function (this: CustomWorld) {
    this.logger.info(`Going to create contact`);
    const contactsList = new ContactsList(this.page);
    await contactsList.addClick();
    const contactCreatePage = new ContactCreatePage(this.page);
    await contactCreatePage.createFakeContacts();
    await this.page.waitForURL('**/contactList');
    this.logger.info(`Contact created successfully`);
})

Then('User edit new contact', async function (this: CustomWorld) {
    this.logger.info(`Going to edit contact`);
    const contactsList = new ContactsList(this.page);
    await contactsList.clickTable();
    const contactPage = new ContactPage(this.page);
    await contactPage.clickEditButton();
    await this.page.waitForURL('**/editContact');
    const contactCreatePage = new ContactCreatePage(this.page);
    await contactCreatePage.createFakeContacts();
    await this.page.waitForURL('**/contactDetails');
    this.logger.info(`Contact edited successfully`);
})

Then('User delete new contact', async function (this: CustomWorld) {
    this.logger.info(`Going to delete contact`);
    const contactPage = new ContactPage(this.page);
    await contactPage.clickDeleteButton();
    await this.page.waitForURL('**/contactList');
    this.logger.info(`Contact deleted successfully`);
})

