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
    }

}