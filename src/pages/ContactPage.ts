import {Page} from "playwright";
import {expect, Locator} from "@playwright/test";
import {BasePage} from "./BasePage";

export class ContactPage extends BasePage {
    constructor(page: Page) {
        super(page);
    }
    private firstNameInputLocator = this.page.locator('//*[@id="firstName"]');
    private lastNameInputLocator = this.page.locator('//*[@id="lastName"]');
    private emailInputLocator = this.page.locator('//*[@id="email"]');
    private submitButtonLocator = this.page.locator('//*[@id="submit"]');
    private cancelButtonLocator = this.page.locator('//*[@id="cancel"]');
    private phoneInputLocator = this.page.locator('//*[@id="phone"]');
    private address1InputLocator = this.page.locator('//*[@id="street1"]');
    private address2InputLocator = this.page.locator('//*[@id="street2"]');
    private cityInputLocator = this.page.locator('//*[@id="city"]');
    private SoPInputLocator = this.page.locator('//*[@id="stateProvince"]');
    private DoBInputLocator = this.page.locator('//*[@id="birthdate"]');
    private PCInputLocator  = this.page.locator('//*[@id="postalCode"]');
    private countryInputLocator = this.page.locator('//*[@id="country"]');

    private editContactButtonLocator = this.page.locator('//*[@id="edit-contact"]');
    private deleteContactButtonLocator = this.page.locator('//*[@id="delete"]');
    private returnToListButtonLocator = this.page.locator('//*[@id="return"]');

    async navigate() {
        await this.open("contactDetails");
    }

    async deleteContact() {
        this.page.once('dialog', async dialog => {
            if (dialog.type() === 'confirm') {
                await dialog.accept();
            } else {
                await dialog.dismiss();
            }
        });
        await this.deleteContactButtonLocator.click();
        this.logger.info("Contact deleted");
    }

    async editContact() {
        await this.editContactButtonLocator.click();
        await this.firstNameInputLocator.fill("Vlad");
        await this.lastNameInputLocator.fill("vdrvdr");
        await this.submitButtonLocator.click();
        this.logger.info("Contact edited");
    }
}