import {Page} from "playwright";
import {expect, Locator} from "@playwright/test";
import {BasePage} from "./BasePage";

export class LoginPage extends BasePage {
    constructor(page: Page) {
        super(page);
    }
    private emailInputLocator = this.page.locator('//*[@id="email"]');
    private passwordInputLocator = this.page.locator('//*[@id="password"]');
    private submitButtonLocator = this.page.locator('//*[@id="submit"]');
    private signInButtonLocator = this.page.locator('//*[@id="signup"]');

    async navigate() {
        await this.open("");
    }
}
