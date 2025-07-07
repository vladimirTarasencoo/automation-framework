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

    public async check(value1: string, value2: string, value3: string): Promise<boolean> {
        const rows = this.page.locator('tr.contactTableBodyRow');
        const rowCount = await rows.count();

        for (let i = 0; i < rowCount; i++) {
            const row = rows.nth(i);
            const cells = row.locator('td');
            const cellCount = await cells.count();

            let matches = 0;

            for (let j = 0; j < cellCount; j++) {
                const cellText = (await cells.nth(j).textContent())?.trim() || '';

                if (cellText === value1 || cellText === value2 || cellText === value3) {
                    matches++;
                }
            }

            if (matches >= 3) {
                return true;
            }
        }
        return false;
    }
}
        //TODO arbeiten

        // await this.firstNameInputLocator.fill("Vlad");
        // await this.lastNameInputLocator.fill("svsese");
        // await this.emailInputLocator.fill("vdrvsefc@dsvdr.com");
