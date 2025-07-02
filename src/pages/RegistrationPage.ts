import {Page} from "playwright";
import {expect} from "@playwright/test";
import {BasePage} from "./BasePage";
import {UserData} from "../common/models/UserData";
import {StringUtils} from "../common/utils/StringUtils";

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

    public async userRegister(user: UserData): Promise<void> {
        const username = StringUtils.randomizeUsername();
        const lastname = StringUtils.randomizeUsername();
        const password = StringUtils.randomizePassword();
        const email = StringUtils.randomizeEmail();

        user.setUser({
            username: username,
            lastname: lastname,
            password: password,
            email: email,
        } as UserData);

        await this.firstNameInputLocator.fill(username);
        await this.lastNameInputLocator.fill(lastname);
        await this.passwordInputLocator.fill(password);
        await this.emailInputLocator.fill(email);
        await this.submitButtonLocator.click();

        await expect(this.page.locator('#logout')).toBeVisible();
    }
}