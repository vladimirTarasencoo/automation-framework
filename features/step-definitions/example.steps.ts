import {DataTable, Given, Then, When, world,} from '@cucumber/cucumber';
import {pageFactory} from "../../src/pages/pageFactory";
import {Pages} from "../../src/enums/common.enum";
import {CustomWorld} from "../../src/support/world";
import {ContactsList} from "../../src/pages/ContactsList";
import {ContactCreatePage} from "../../src/pages/ContactCreatePage";
import {ContactPage} from "../../src/pages/ContactPage";
import {RegistrationPage} from "../../src/pages/RegistrationPage";
import {UserData} from "../../src/common/models/UserData";
import {StringUtils} from "../../src/common/utils/StringUtils";
import logger from "../../src/logger/pino";
import {expect} from "@playwright/test";

Given("user opens {page} page", async function (this: CustomWorld, pageName: Pages) {
    const pageObj = pageFactory(this.page, pageName);
    await pageObj.navigate();
});

Given("create new account",{ timeout: 10000 }, async function (this: CustomWorld) {
    const pageObj = pageFactory(this.page, Pages.REGISTRATION);
    await pageObj.navigate();
    const registrationPage = new RegistrationPage(this.page);
    await registrationPage.userRegister(this.currentUser);
    this.logger.info(`New account created: ${JSON.stringify(this.currentUser)}`);
});

//TODO
When("user attempts to register with existing email", async function (this: CustomWorld) {
    this.logger.info("Attempt to register with existing email");
    //const registrationPage = new RegistrationPage(this.page); //UI
    //await registrationPage.registerExistingUser(this.currentUser); //UI
    try {
        await this.contactsService.register({
            firstName: this.currentUser.username,
            lastName: this.currentUser.lastname,
            email: this.currentUser.email,
            password: this.currentUser.password
        });
    } catch (error: any) {
        this.apiErrorStatusCode = error.response?.status;
        this.apiErrorResponse = error.response?.data;

        this.logger.warn(`[API ERROR] Status: ${this.apiErrorStatusCode}, Message: ${JSON.stringify(this.apiErrorResponse)}`);
    }
});

//TODO
Then("{string} message is displayed", async function (expectedMessage: string) {
    if (this.apiErrorResponse) {
        // === API ===
        const statusCode = this.apiErrorStatusCode || 'unknown';
        const actualMessage = this.apiErrorResponse.message || '';
        this.logger.info(`[API ERROR] Status: ${statusCode}, Message: ${actualMessage}`);

        expect(actualMessage).toEqual(expectedMessage);
    } else if (this.page) {
        // === UI ===
        const registrationPage = new RegistrationPage(this.page);
        await registrationPage.checkError(expectedMessage);
    } else {
        throw new Error("Не удалось определить источник ошибки (UI или API)");
    }
});



When("user attempts to create contact without {string}", async function (param: string) {
    const contactCreatePage = new ContactCreatePage(this.page);
    if (param === "firstname") {
        await contactCreatePage.createFakeContacts({skipFirstName: true});
    } else if (param === "lastname") {
        await contactCreatePage.createFakeContacts({skipLastName: true});
    }
});

When("user add new contacts",{ timeout: 30000 }, async function (this: CustomWorld, dataTable: DataTable) {
    const contactCreatePage = new ContactCreatePage(this.page);
    const contacts = dataTable.hashes();
    this.createdContacts = [];
    for (let i = 0; i < contacts.length; i++) {
        const isLast = i === contacts.length - 1;
        await contactCreatePage.createContactFromTable(contacts[i], !isLast);
        this.createdContacts.push(contacts[i]);
        this.logger.info(`Contact ${i} created`);
    }
});

Then("user checks new records", async function (this: CustomWorld) {
    const pageObj = pageFactory(this.page, Pages.LIST);
    await pageObj.navigate();
    const contactsList = new ContactsList(this.page);
    let foundCount = 0;
    for (const contact of this.createdContacts) {
        const valuesToCheck = [
            `${contact.FirstName} ${contact.LastName}`.trim(),
            contact.DoB,
            contact.Email
        ].filter(Boolean);
        const isFound = await contactsList.check(valuesToCheck);
        if (isFound) foundCount++;
    }
    this.logger.info(`${foundCount} out of ${this.createdContacts.length} records found`);
});

When ("user delete created contacts",{ timeout: 15000 }, async function (this: CustomWorld) {
    const contactPage = new ContactPage(this.page);
    await contactPage.deleteContact();
});

When("user edit record [{int}]",{ timeout: 15000 }, async function (this: CustomWorld, index: number, dataTable: DataTable) {
    const contactList = new ContactsList(this.page);
    const contactPage = new ContactPage(this.page);
    const contactCreatePage = new ContactCreatePage(this.page);
    this.logger.info(`Opening contact with index ${index - 1}`);
    await contactList.openContactByIndex(index - 1);
    await contactPage.clickEditButton();
    const updatedData = dataTable.hashes()[0];
    await contactCreatePage.createContactFromTable(updatedData);
    this.logger.info(`Contact ${index - 1} edited`);
});
