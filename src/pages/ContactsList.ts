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
        await this.page.locator('.contactTableBodyRow').first().waitFor({ state: 'visible' });
        const rows = this.page.locator('tr.contactTableBodyRow');
        const rowCount = await rows.count();
        this.logger.info(`Checking ${rowCount} rows...`);
        for (let i = 0; i < rowCount; i++) {
            const row = rows.nth(i);
            const cells = row.locator('td:visible');
            const cellTexts = await cells.allTextContents();
            const trimmedTexts = cellTexts.map(text => text.trim());
            if (values.every(value => trimmedTexts.some(text => text.includes(value)))) {
                this.logger.info(`Match found in row ${i + 1}`);
                await cells.first().waitFor({ state: 'attached' });
                await cells.first().click({ force: true });
                return true;
            }
        }
        this.logger.warn('No matching rows found');
        return false;
    }
}
