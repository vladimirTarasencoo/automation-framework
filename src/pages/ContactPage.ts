import {Page} from "playwright";
import {expect, Locator} from "@playwright/test";
import {BasePage} from "./BasePage";

export class ContactPage extends BasePage {
    constructor(page: Page) {
        super(page);
    }

    private deleteContactButtonLocator = this.page.locator('//*[@id="delete"]');

    async navigate() {
        await this.open("contactDetails");
    }

    public async deleteContact(): Promise<void> {
        while (true) {
            let rowCount = 0;
            try {
                await this.page.waitForSelector('tr.contactTableBodyRow', { timeout: 5000 });
                const rowLocator = this.page.locator('tr.contactTableBodyRow');
                rowCount = await rowLocator.count();
                if (rowCount === 0) {
                    break;
                }
                await Promise.all([
                    this.page.waitForURL('**/contactDetails', { timeout: 5000 }),
                    rowLocator.first().click()
                ]);
                this.page.once('dialog', async dialog => {
                    if (dialog.type() === 'confirm') {
                        await dialog.accept();
                    }
                });
                await Promise.all([
                    this.page.waitForURL('**/contactList', { timeout: 5000 }),
                    this.page.locator('button:text("Delete")').click()
                ]);
                await this.page.waitForLoadState('domcontentloaded', { timeout: 5000 });
            } catch (error) {
                this.logger.info(`Contacts deleted or not exist`);
                break;
            }
        }
    }

    public async clickEditButton(): Promise<void> {
        const editButton = this.page.locator('#edit-contact');
        await editButton.waitFor({ state: 'visible' });
        await editButton.click();
        await this.page.waitForURL('**/editContact');
    }


    async clickDeleteButton(): Promise<void> {
        this.page.once('dialog', async (dialog) => {
            if (dialog.type() === 'confirm') {
                await dialog.accept();
            }
        });
        await this.deleteContactButtonLocator.click();
    }
}
