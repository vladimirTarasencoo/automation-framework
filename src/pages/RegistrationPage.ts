import {Page} from "playwright";
import {expect, Locator} from "@playwright/test";
import {BasePage} from "./BasePage";
import {testUser} from "../data/userData";

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
            await Promise.race([
                this.page.waitForURL('**/contactList', { timeout: 5000 }),
                this.page.waitForSelector('text=Email address is already in use', { timeout: 5000 }),
            ]);
        } catch {
        }
        if (this.page.url().includes('/contactList')) {
            this.logger.info('Регистрация успешна, редирект на /contactList');
        } else {
            this.logger.warn('Пользователь уже существует, переходим на страницу логина');
            await this.page.goto('https://thinking-tester-contact-list.herokuapp.com/');
            await this.page.locator('//*[@id="email"]').waitFor({ state: 'visible', timeout: 5000 });
        }
    }
}