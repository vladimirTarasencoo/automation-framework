import {Page} from "playwright";
import {expect, Locator} from "@playwright/test";
import {BasePage} from "./BasePage";

export class ContactsList extends BasePage {
    constructor(page: Page) {
        super(page);
    }
    private addContactButtonLocator = this.page.locator('//*[@id="add-contact"]');
    private tableContacts = this.page.locator('//*[@id="myTable"]')

    async navigate() {
        await this.open("contactList");
    }
}