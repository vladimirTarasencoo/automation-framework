import {Page} from "playwright";
import {expect, Locator} from "@playwright/test";
import {BasePage} from "./BasePage";
import {testContacts} from "../data/userData";

export class ContactCreatePage extends BasePage {
    constructor(page: Page) {
        super(page);
    }
    private firstNameInputLocator = this.page.locator('//*[@id="firstName"]');
    private lastNameInputLocator = this.page.locator('//*[@id="lastName"]');
    private emailInputLocator = this.page.locator('//*[@id="email"]');
    private submitButtonLocator = this.page.locator('//*[@id="submit"]');
    private cancelButtonLocator = this.page.locator('//*[@id="cancel"]');

    async navigate() {
        await this.open("addContact");
    }

    public async createContact(contactIndex: number): Promise<void> {
        const contact = testContacts[contactIndex];
        await this.firstNameInputLocator.fill(contact.firstName);
        await this.lastNameInputLocator.fill(contact.lastName);
        await this.emailInputLocator.fill(contact.email);
        await Promise.all([
            this.page.waitForURL('**/contactList', { timeout: 5000 }), // Ждём переход на список контактов
            this.submitButtonLocator.click(),
        ]);
    }

}