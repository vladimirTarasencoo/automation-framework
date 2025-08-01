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

    public async login(user: UserData, upperCaseMail: boolean, twice: boolean, enter: boolean): Promise<void> {

        if (upperCaseMail) {
            this.logger.info(`Try to enter with upper case mail`);
            await this.emailInputLocator.fill(user.email.toUpperCase());
        } else {
            await this.emailInputLocator.fill(user.email);
        }
        await this.passwordInputLocator.fill(user.password);

        if (twice && !enter) {
            await Promise.all([
                this.submitButtonLocator.click(),
                this.submitButtonLocator.click(),
            ]);
        } else if (!enter) {
            await this.submitButtonLocator.click();
        }
        if (enter) {
            await this.page.keyboard.press('Enter');
        }

        await this.page.waitForURL('**/contactList')
        this.logger.info(`Login successfully`);
    }
}
