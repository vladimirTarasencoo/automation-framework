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

    async check(contNum: number) {
        const contact = testContacts[contNum];
        const row = this.page.locator(
            `tr:has-text("${contact.firstName}"):has-text("${contact.lastName}"):has-text("${contact.email}")`
        ).first();
        await row.locator('td').first().click();

    }
}