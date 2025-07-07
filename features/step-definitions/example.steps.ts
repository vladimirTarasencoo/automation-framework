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

Given("user opens {page} page", async function (this: CustomWorld, pageName: Pages) {
    const pageObj = pageFactory(this.page, pageName);
    await pageObj.navigate();
});

Given("create new account", async function (this: CustomWorld) {
    const pageObj = pageFactory(this.page, Pages.REGISTRATION);
    await pageObj.navigate();
    const registrationPage = new RegistrationPage(this.page);
    await registrationPage.userRegister(this.currentUser);
    this.logger.info(`New account created: ${JSON.stringify(this.currentUser)}`);
});

When ("user attempts to register with existing email", async function (this: CustomWorld) {
    this.logger.info("Attempt to register with existing email");
    const registrationPage = new RegistrationPage(this.page);
    await registrationPage.registerExistingUser(this.currentUser);
});

Then("{string} message is displayed", async function (errorMessage: string) {
    const registrationPage = new RegistrationPage(this.page);
    await registrationPage.checkError(errorMessage);
});

When("user attempts to create contact without {string}", async function (param: string) {
    const contactCreatePage = new ContactCreatePage(this.page);
    if (param === "firstname") {
        await contactCreatePage.createContact({ skipFirstName: true,testNum:0 });

    } else if (param === "lastname") {
        await contactCreatePage.createContact({ skipLastName: true,testNum:0 });
    }
});


When("user add new contacts", async function (this: CustomWorld, dataTable: DataTable) {
    this.logger.info(`Adding new contact: ${JSON.stringify(dataTable)}`);
    const contactCreatePage = new ContactCreatePage(this.page);
    await contactCreatePage.createContact({ testNum:1 });
});

Then ("user checks new records", async function (this: CustomWorld) {
    const contactsList = new ContactsList(this.page);
    await contactsList.check();
        // TODO
});

When ("user delete created contacts", async function (this: CustomWorld) {
     // TODO
});



// When ("user edit record [1]",async function (this: CustomWorld, recordNumber: number) {
//     // TODO
// });
//


// // Then ("user delete added contacts", async function () {
// //     const contact = new ContactPage(this.page);
// //     await contact.deleteContact();
// //     const contacts = new ContactsList(this.page);
// //     await contacts.checkDeleted(0);
// // })
