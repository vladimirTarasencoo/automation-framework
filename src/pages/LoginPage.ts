import {Page} from "playwright";
import {expect, Locator} from "@playwright/test";
import {BasePage} from "./BasePage";
import {testUser} from "../data/userData";

export class LoginPage extends BasePage {
    constructor(page: Page) {
        super(page);
    }
    private emailInputLocator = this.page.locator('//*[@id="email"]');
    private passwordInputLocator = this.page.locator('//*[@id="password"]');
    private submitButtonLocator = this.page.locator('//*[@id="submit"]');
    private signUpButtonLocator = this.page.locator('//*[@id="signup"]');

    async navigate() {
        await this.open("");
        await this.emailInputLocator.waitFor({ state: 'visible', timeout: 5000 });
    }

    public async login(): Promise<void> {
        await this.emailInputLocator.fill(testUser.email);
        await this.passwordInputLocator.fill(testUser.password);
        await this.submitButtonLocator.click();
        await this.page.waitForURL('**/contactList', { timeout: 5000 })
    }
}
