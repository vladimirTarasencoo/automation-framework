import {BasePage} from "./BasePage";
import {Page} from "playwright";
import {expect} from "@playwright/test";


export class LoginPage extends BasePage {
    public titleLocator = this.page.locator('//h2[text()="Test login"]');
    private usernameInputLocator = this.page.locator('//input[@name="username"]');
    private submitButtonLocator = this.page.locator('//button[@id="submit"]');
    private errorMessageLocator = this.page.locator('//div[@id="error"]');
    private passwordInputLocator = this.page.locator('//input[@id="password"]');
    private successTitleLocator = this.page.locator('h1.post-title');
    private logOutLocator = this.page.getByRole('link', { name: 'Log out' });

    constructor(page: Page) {
        super(page);
    }

    public async clearFields() {
        await this.usernameInputLocator.clear();
        await this.passwordInputLocator.clear();
    }

    public async enterUsername(usernameText: string) {
        await this.usernameInputLocator.fill(usernameText);
    }

    public async enterPassword(password: string) {
        await this.passwordInputLocator.fill(password);
    }

    public async verifySuccessTitle(expectedText: string) {
        await expect(this.successTitleLocator).toBeVisible();
        await expect(this.successTitleLocator).toHaveText(expectedText);
        //const actualText = await this.successTitle.innerText();
        //console.log(`expected: "${expectedText}", actual: "${actualText}"`);
    }

    public async logOutClick() {
        await this.logOutLocator.click();
    }

    public async checkPageTitle() {
        await expect(this.titleLocator).toBeVisible();
    }

    public async submitLoginForm() {
        await this.submitButtonLocator.click();
    }

    public async checkErrorMessage(expectedMessage: string) {
        await expect(this.errorMessageLocator).toBeVisible();
        const actualMessage = await this.errorMessageLocator.textContent();
        expect(actualMessage).toBe(expectedMessage)
    }
}