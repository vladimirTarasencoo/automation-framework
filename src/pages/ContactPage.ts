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
}