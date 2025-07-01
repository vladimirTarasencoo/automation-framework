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
        if (!contact) {
            throw new Error(`No contact ${index} in array`);
        }
        const { firstName } = contact;
        this.logger.info(`Looking for contact ${index} by first name: ${firstName}`);
        const cellLocator = this.page.locator(`#myTable td`, { hasText: firstName }).first();
        const isVisible = await cellLocator.isVisible({ timeout: 5000 });
        if (!isVisible) {
            throw new Error(`No contact cell with first name: ${firstName}`);
        }
        await cellLocator.click();
        this.logger.info(`Clicked on contact cell with first name: ${firstName}`);
    }
}