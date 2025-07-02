import {Page} from "playwright";
import {expect, Locator} from "@playwright/test";
import {BasePage} from "./BasePage";
import {testContacts} from "../data/userData";

export class ContactsList extends BasePage {
    constructor(page: Page) {
        super(page);
    }
    private addContactButtonLocator = this.page.locator('//*[@id="add-contact"]');
    private tableContacts = this.page.locator('//*[@id="myTable"]')

    async navigate() {
        await this.open("contactList");
    }

    async addClick (): Promise<void> {
        await this.addContactButtonLocator.click();
    }

    async check(index: number): Promise<void> {
        const contact = testContacts[index];
        if (!contact) throw new Error(`No contact ${index} in array`);

        const fullName = `${contact.firstName} ${contact.lastName}`;
        this.logger.info(`Looking for contact ${index} by full name: ${fullName}`);

        const cellLocator = this.page.locator(`#myTable td`, { hasText: fullName }).first();
        await cellLocator.waitFor({ state: 'visible', timeout: 7000 }); // ждем видимости
        await cellLocator.click();

        this.logger.info(`Clicked on contact cell with full name: ${fullName}`);
    }

    async checkDeleted(index: number): Promise<void> {
        const contact = testContacts[index];
        if (!contact) {
            throw new Error(`No contact ${index} in array`);
        }
        const fullName = `${contact.firstName} ${contact.lastName}`;
        this.logger.info(`Checking contact absence: ${fullName}`);
        const cellLocator = this.page.locator(`#myTable td`, { hasText: fullName }).first();
        const isVisible = await cellLocator.isVisible({ timeout: 3000 }).catch(() => false);
        if (isVisible) {
            throw new Error(`Contact ${fullName} is still visible in the list!`);
        }
        this.logger.info(`Contact ${fullName} successfully deleted`);
    }
}