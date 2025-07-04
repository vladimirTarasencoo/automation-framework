import {Page} from "playwright";
import {expect, Locator} from "@playwright/test";
import {BasePage} from "./BasePage";

export class ContactPage extends BasePage {
    constructor(page: Page) {
        super(page);
    }
    private editContactButtonLocator = this.page.locator('//*[@id="edit-contact"]');
    private deleteContactButtonLocator = this.page.locator('//*[@id="delete"]');
    private returnToListButtonLocator = this.page.locator('//*[@id="return"]');

    async navigate() {
        await this.open("contactDetails");
    }

    async deleteContact() {
        this.page.once('dialog', async dialog => {
            if (dialog.type() === 'confirm') {
                await dialog.accept();
            } else {
                await dialog.dismiss();
            }
        });

        await this.deleteContactButtonLocator.click();
    }
}