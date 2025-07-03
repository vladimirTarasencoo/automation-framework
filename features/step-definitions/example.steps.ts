import {DataTable, Given, Then, When,} from '@cucumber/cucumber';
import {pageFactory} from "../../src/pages/pageFactory";
import {Pages} from "../../src/enums/common.enum";
import {CustomWorld} from "../../src/support/world";
import {ContactsList} from "../../src/pages/ContactsList";
import {ContactCreatePage} from "../../src/pages/ContactCreatePage";
import {ContactPage} from "../../src/pages/ContactPage";
import {RegistrationPage} from "../../src/pages/RegistrationPage";


Given("user opens {page} page", async function (this: CustomWorld, pageName: Pages) {
    const pageObj = pageFactory(this.page, pageName);
    await pageObj.navigate();
});

When ("user attempts to register with existing email", async function (this: CustomWorld) {

});

Then ("'Email address is already in use' message is displayed", async function (this: CustomWorld) {

});

When ("user attempts to create contract without '<param>'", async function (this: CustomWorld, param: string) {

});

Then ("'<errorMessage>' message is displayed", async function (this: CustomWorld, errorMessage: string) {

});

Then("user add new contacts", async function (this: CustomWorld, dataTable: DataTable) {
    this.logger.info(`Adding new contact: ${JSON.stringify(dataTable)}`);
    const addContact = new ContactCreatePage(this.page);
    await addContact.createContact(dataTable);
    // по хорошему сохрвнять все контакты и в world чтоб в степе ниже был к ним доступ
    this.contacts.add(dataTable);
});

Then ("user checks new records", async function (this: CustomWorld) {

});

When ("user delete created contacts", async function (this: CustomWorld) {

});

When ("user edit record [1]",async function (this: CustomWorld, recordNumber: number) {

});





Then("create new account", async function (this: CustomWorld) {
    const pageObj = pageFactory(this.page, Pages.REGISTRATION);
    await pageObj.navigate();
    const registrationPage = new RegistrationPage(this.page);
    await registrationPage.userRegister(this.currentUser);
});

Then("user check added contact", async function (this: CustomWorld) {
    const contacts = new ContactsList(this.page);
    await contacts.check(this.contacts);
})

Then ("user delete added contacts", async function () {
    const contact = new ContactPage(this.page);
    await contact.deleteContact();
    const contacts = new ContactsList(this.page);
    await contacts.checkDeleted(0);
})
