import {BasePage} from "./BasePage";
import {Page} from "playwright";
import {expect} from "@playwright/test";


export class LoginPage extends BasePage {
    public titleLocator = this.page.locator('//h2[text()="Test login"]');
    private usernameInputLocator = this.page.locator('//input[@name="username"]');
    private submitButtonLocator = this.page.locator('//button[@id="submit"]');
    private errorMessage = this.page.locator('//div[@id="error"]');

    constructor(page: Page) {
        super(page);
    }

    public async enterUsername(usernameText: string) {
        await this.usernameInputLocator.fill(usernameText);
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