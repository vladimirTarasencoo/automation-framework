import {Page} from "playwright";
import {BasePage} from "./BasePage";
import {UserData} from "../common/models/UserData";

export class LoginPage extends BasePage {
    constructor(page: Page) {
        super(page);
    }
    private emailInputLocator = this.page.locator('//*[@id="email"]');
    private passwordInputLocator = this.page.locator('//*[@id="password"]');
    private submitButtonLocator = this.page.locator('//*[@id="submit"]');
    private signUpButtonLocator = this.page.locator('//*[@id="signup"]');

    async navigate() {
        await this.open();
        await this.emailInputLocator.waitFor({ state: 'visible', timeout: 10000 });
        await this.page.waitForLoadState('load')
    }

    public async login(user: UserData): Promise<void> {
        await this.emailInputLocator.fill(user.email);
        await this.passwordInputLocator.fill(user.password);
        await this.submitButtonLocator.click();
        await this.page.waitForURL('**/contactList', { timeout: 5000 })
    }
}
