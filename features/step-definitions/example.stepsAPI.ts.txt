import {DataTable, Given, Then, When, world,} from '@cucumber/cucumber';
import {CustomWorld} from "../../src/support/world";
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

When("user add new contacts", async function (this: CustomWorld, dataTable) {
    await this.contactsService.createContactsFromTable(dataTable);
});

Then("user checks new records", async function (this: CustomWorld) {
    const contacts = await this.contactsService.getData("/contacts");
    console.log("RAW CONTACTS:", contacts);
    this.contactIds = contacts.map((contact: any) => contact._id);
    console.log("SavedID:", this.contactIds);
});

When("user delete created contacts", async function (this: CustomWorld) {
    for (const id of this.contactIds) {
        await this.contactsService.deleteContact(id);
        this.logger.info(`Contact deleted by ID: ${id}`);
    }
});

When("user edit record [{int}]", async function (this: CustomWorld, index: number, dataTable: DataTable) {
    const updatedData = dataTable.hashes()[0];
    const contactId = this.contactIds[index - 1];
    if (!contactId) {
        throw new Error(`Contact with index ${index} not found`);
    }
    await this.contactsService.updateContactById(contactId, updatedData);
    console.log(`[EDIT] Contact ID: ${contactId} has been updated with data:`, updatedData);
});
