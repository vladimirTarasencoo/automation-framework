import {Page} from "playwright";
import {expect, Locator} from "@playwright/test";
import {BasePage} from "./BasePage";

export class ContactCreatePage extends BasePage {
    constructor(page: Page) {
        super(page);
    }
    private firstNameInputLocator = this.page.locator('//*[@id="firstName"]');
    private lastNameInputLocator = this.page.locator('//*[@id="lastName"]');
    private emailInputLocator = this.page.locator('//*[@id="email"]');
    private submitButtonLocator = this.page.locator('//*[@id="submit"]');
    private cancelButtonLocator = this.page.locator('//*[@id="cancel"]');

    async navigate() {
        await this.open("addContact");
    }
}