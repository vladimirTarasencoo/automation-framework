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

    async addClick(): Promise<void> {
        await this.addContactButtonLocator.click();
    }

    public async check(values: string[]): Promise<boolean> {
        await this.page.locator('tr.contactTableBodyRow').first().waitFor({ state: 'visible', timeout: 5000 });

        const rows = await this.page.locator('tr.contactTableBodyRow').all();
        for (const row of rows) {
            const cellTexts = (await row.locator('td:visible').allTextContents()).map(text => text.trim());
            const isMatch = values.every(value =>
                cellTexts.some(cell => cell.includes(value))
            );
            if (isMatch) {
                return true;
            }
        }
        return false;
    }

    public async openContactByIndex(index: number): Promise<void> {
        const row = this.page.locator('tr.contactTableBodyRow').nth(index);
        await row.waitFor({ state: 'visible' });
        await row.scrollIntoViewIfNeeded();
        await row.click();
    }
}
