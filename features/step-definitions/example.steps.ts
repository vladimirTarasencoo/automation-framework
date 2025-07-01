import {Given, Then, When, } from '@cucumber/cucumber';
import {pageFactory} from "../../src/pages/pageFactory";
import {Pages} from "../../src/enums/common.enum";
import {LoginPage} from '../../src/pages/LoginPage';
import {CustomWorld} from "../../src/support/world";
import {ContactsList} from "../../src/pages/ContactsList";
import {ContactCreatePage} from "../../src/pages/ContactCreatePage";
import {testContacts} from "../../src/data/userData";
import {ContactPage} from "../../src/pages/ContactPage";
import {expect} from "@playwright/test";


Given("user opens {page} page", async function (this: CustomWorld, pageName: Pages) {
    this.logger.info(`Going to ${pageName}`);
    const pageObj = pageFactory(this.page, pageName);
    await pageObj.navigate();
});

Given("enter with his data", async function (this: CustomWorld) {
    const loginPage = new LoginPage(this.page);
    await loginPage.login();
    this.logger.info('Login done, current URL: ' + this.page.url());
    await this.page.waitForURL('**/contactList', { timeout: 10000 });
    await expect(this.page.locator('//*[@id="logout"]')).toBeVisible({ timeout: 5000 });
});

Then("user add new contacts", async function () {
    const addContact = new ContactCreatePage(this.page);
    await addContact.createContact(0);
});

Then("user check added contact", async function () {
    const contacts = new ContactsList(this.page);
    await contacts.check(0);
})

Then ("user delete added contact", async function () {
    const contact = new ContactPage(this.page);
    await contact.deleteContact();
})
