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
    private errorMessage = this.page.locator('#error')

    async navigate() {
        await this.open("addUser");
    }

    public async userRegister(user: UserData): Promise<void> {
        let username: string;
        let lastname: string;
        let email: string;
        let password: string;

        if (user.password === '') {
            username = StringUtils.randomizeUsername();
            lastname = StringUtils.randomizeUsername();
            password = StringUtils.randomizePassword();
            email = StringUtils.randomizeEmail();
        } else {
            username = user.username;
            lastname = user.lastname;
            password = user.password;
            email = user.email;
        }

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

    public async registerExistingUser(user: UserData): Promise<void> {
            const existedUserData: UserData = {
            username: StringUtils.randomizeUsername(),
            lastname: StringUtils.randomizeUsername(),
            password: StringUtils.randomizePassword(),
            email: user.email,
        } as UserData;

        await this.firstNameInputLocator.fill(existedUserData.username);
        await this.lastNameInputLocator.fill(existedUserData.lastname);
        await this.passwordInputLocator.fill(existedUserData.password);
        await this.emailInputLocator.fill(existedUserData.email);
        await this.submitButtonLocator.click();
    }

    public async checkError(errorText: string): Promise<void> {
        await expect(this.errorMessage).toBeVisible();
        const actualText = await this.errorMessage.textContent();

        await expect(this.errorMessage).toContainText(errorText);
        this.logger.info(`Actual error: ${actualText}`);
    }
}
