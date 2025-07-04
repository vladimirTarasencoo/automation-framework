import {Page} from "playwright";
import {BasePage} from "./BasePage";
import {DataTable} from "@cucumber/cucumber";

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

    async check(data: DataTable): Promise<void> {
        //TODO arbeiten
    }

    async checkDeleted(index: number): Promise<void> {

    }
}