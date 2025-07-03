// import {Given, Then, When} from '@cucumber/cucumber';
// import {Pages} from "../../src/enums/common.enum";
// import {CustomWorld} from "../../src/support/world";
// import {Task1Page} from "../../src/pages/task1Page";
//
// let loginPage: Task1Page;
//
// Given('I navigate to {page}', async function (this: CustomWorld, pageName: Pages) {
//     this.logger.info("Going to main page");
//     if (pageName == Pages.LOGIN) {
//         loginPage = new Task1Page(this.page);
//         await this.page.goto('https://thinking-tester-contact-list.herokuapp.com/');
//         } else {
//         await this.page.goto(pageName);
//     }
//     await loginPage.clickButton('signup');
// });
//
// When('I create new user', async function (this: CustomWorld) {
//     this.logger.info("Registration");
//     await loginPage.enterUserData()
//     await this.page.waitForURL('**/contactList', { timeout: 500 });
//     if (this.page.url().includes('/contactList')) {
//         this.logger.info("Successfully created new user");
//     } else {
//         this.logger.error(`Not redirected correctly. Current URL: ${this.page.url()}`);
//         throw new Error("User was not redirected to contacts page");
//     }
// })
//
// Then('I create new contact and check it', async function (this: CustomWorld) {
//     this.logger.info("Creating new contact");
//     await loginPage.clickButton('add');
//     await this.page.waitForURL('**/addContact', { timeout: 500 });
//     await loginPage.enterUserData(true)
//
//     await this.page.waitForURL('**/contactList', { timeout: 500 });
//     if (this.page.url().includes('/contactList')) {
//         this.logger.info("Successfully created new contact");
//     } else {
//         this.logger.error(`error creating new contact`);
//         throw new Error("error creating new contact");
//     }
//     const fullName = `${this.currentUser.username} ${this.currentUser.lastname}`;
//     await this.page.locator('table#myTable td').filter({ hasText: fullName }).click();
//
//     if (this.page.url().includes('/contactDetails')) {
//         this.logger.info("Contact existed");
//     }
// })
//
//
// Then('I delete if it exists', async function (this: CustomWorld) {
//     this.page.once('dialog', async dialog => {
//        await dialog.accept();
//     });
//     await loginPage.clickButton('delete');
//     this.logger.info("Contact deleted");
// })
