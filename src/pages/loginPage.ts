import {BasePage} from "./BasePage";
import {Page} from "playwright";
import {expect} from "@playwright/test";


export class LoginPage extends BasePage {
    public titleLocator = this.page.locator('//h2[text()="Test login"]');
    private usernameInputLocator = this.page.locator('//input[@name="username"]');
    private submitButtonLocator = this.page.locator('//button[@id="submit"]');
    private errorMessage = this.page.locator('//div[@id="error"]');
    private passwordInputLocator = this.page.locator('//input[@id="password"]');
    private successTitle = this.page.locator('h1.post-title');

    constructor(page: Page) {
        super(page);
    }

    public async enterUsername(usernameText: string) {
        await this.usernameInputLocator.fill(usernameText);
    }

    public async enterPassword(password: string) {
        await this.passwordInputLocator.fill(password);
    }

    public async verifySuccessTitle(expectedText: string) {
        await expect(this.successTitle).toBeVisible();
        await expect(this.successTitle).toHaveText(expectedText);
        //const actualText = await this.successTitle.innerText();
        //console.log(`expected: "${expectedText}", actual: "${actualText}"`);
    }

    public async checkPageTitle() {
        await expect(this.titleLocator).toBeVisible();
    }

    public async submitLoginForm() {
        await this.submitButtonLocator.click();
    }

    public async checkErrorMessage(expectedMessage: string) {
        await expect(this.errorMessage).toBeVisible();
        const actualMessage = await this.errorMessage.textContent();
        expect(actualMessage).toBe(expectedMessage)
    }
}