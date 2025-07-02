import {Page} from "playwright";
import {expect, Locator} from "@playwright/test";
import {BasePage} from "./BasePage";
import {testUser} from "../data/userData";
import {LoginPage} from "./LoginPage";

export class RegistrationPage extends BasePage {
    constructor(page: Page) {
        super(page);
    }
    private firstNameInputLocator = this.page.locator('//*[@id="firstName"]');
    private lastNameInputLocator = this.page.locator('//*[@id="lastName"]');
    private emailInputLocator = this.page.locator('//*[@id="email"]');
    private passwordInputLocator = this.page.locator('//*[@id="password"]');
    private submitButtonLocator = this.page.locator('//*[@id="submit"]');
    private cancelButtonLocator = this.page.locator('//*[@id="cancel"]');

    async navigate() {
        await this.open("addUser");
    }

    public async userRegister(): Promise<void> {
        await this.firstNameInputLocator.fill(testUser.firstName);
        await this.lastNameInputLocator.fill(testUser.lastName);
        await this.emailInputLocator.fill(testUser.email);
        await this.passwordInputLocator.fill(testUser.password);
        await this.submitButtonLocator.click();

        try {
            const navigationOrError = await Promise.race([
                this.page.waitForURL('**/contactList', { timeout: 7000 }).then(() => 'success'),
                this.page.waitForSelector('#error', { timeout: 7000 }).then(() => 'error')
            ]);
            if (navigationOrError === 'success') {
                this.logger.info('Register success, redirect at /contactList');
                return;
            }
            if (navigationOrError === 'error') {
                const errorElement = this.page.locator('#error');
                const errorText = await errorElement.textContent();
                if (errorText?.includes('Email address is already in use')) {
                    this.logger.warn('Email address is already in use, login');
                    await this.page.goto('https://thinking-tester-contact-list.herokuapp.com/');
                    await this.page.waitForSelector('#email', { timeout: 5000 });
                    const loginPage = new LoginPage(this.page);
                    await loginPage.login();
                    return;
                } else {
                    throw new Error(`Error registration: ${errorText}`);
                }
            }
        } catch (e) {
            this.logger.warn('Some error, login manually');
            await this.page.goto('https://thinking-tester-contact-list.herokuapp.com/');
            await this.page.waitForSelector('#email', { timeout: 5000 });
            const loginPage = new LoginPage(this.page);
            await loginPage.login();
        }
    }
}