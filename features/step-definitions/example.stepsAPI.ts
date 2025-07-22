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

When ("user attempts to register without {string}", async function (field: string) {
    this.logger.info(`Attempt to register without field ${field}`);
    try {
        const userData = {
            firstName: field === 'firstname' ? '' : StringUtils.randomizeUsername(),
            lastName: field === 'lastname' ? '' : StringUtils.randomizeUsername(),
            email: field === 'email' ? '' : StringUtils.randomizeEmail(),
            password: field === 'password' ? '' : StringUtils.randomizePassword(),
        };
        await this.contactsService.register(userData);
    } catch (error: any) {
        this.apiErrorStatusCode = error.response?.status;
        this.apiErrorResponse = error.response?.data;
        //this.logger.warn(`[API ERROR] Status: ${this.apiErrorStatusCode}, Message: ${JSON.stringify(this.apiErrorResponse)}`);
    }
});

When("user attempts to register with existing email", async function (this: CustomWorld) {
    this.logger.info("Attempt to register with existing email");
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
        //this.logger.warn(`[API ERROR] Status: ${this.apiErrorStatusCode}, Message: ${JSON.stringify(this.apiErrorResponse)}`);
    }
});

Then("{string} message is displayed", async function (expectedMessage: string) {
    const statusCode = this.apiErrorStatusCode || 'unknown';
    const actualMessage = this.apiErrorResponse.message || '';
    this.logger.info(`[API ERROR] Status: ${statusCode}, Message: ${actualMessage}`);
    expect(actualMessage).toEqual(expectedMessage); //toEqual toContain
});

When("user attempts to create contact without {string}", async function (param: string) {
    try {
        this.logger.info(`Attempt to create contact without ${param}`);
        await this.contactsService.tryToCreateErrorContact(param);
    } catch (error: any) {
        this.apiErrorStatusCode = error.response?.status;
        this.apiErrorResponse = error.response?.data;
        //this.logger.warn(`[API ERROR] Status: ${this.apiErrorStatusCode}, Message: ${JSON.stringify(this.apiErrorResponse)}`);
    }
});



//TODO
When("user add new contacts", async function (this: CustomWorld, dataTable: DataTable) {
    const contacts = dataTable.hashes();
    

});


//TODO
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
//TODO
When ("user delete created contacts",{ timeout: 15000 }, async function (this: CustomWorld) {
    const contactPage = new ContactPage(this.page);
    await contactPage.deleteContact();
});
//TODO
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
