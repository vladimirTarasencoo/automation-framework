import {Page} from "playwright";
import {BasePage} from "./BasePage";
import {DataTable} from "@cucumber/cucumber";
import {UserData} from "../common/models/UserData";
import {StringUtils} from "../common/utils/StringUtils";
import {expect} from "@playwright/test";

export class ContactCreatePage extends BasePage {
    constructor(page: Page) {
        super(page);
    }

    private firstNameInputLocator = this.page.locator('//*[@id="firstName"]');
    private lastNameInputLocator = this.page.locator('//*[@id="lastName"]');
    private emailInputLocator = this.page.locator('//*[@id="email"]');
    private submitButtonLocator = this.page.locator('//*[@id="submit"]');
    private cancelButtonLocator = this.page.locator('//*[@id="cancel"]');
    private phoneInputLocator = this.page.locator('//*[@id="phone"]');
    private addressInputLocator = this.page.locator('//*[@id="street1"]');

    async navigate() {
        await this.open("addContact");
    };


    public async createContact(
            options?: { skipFirstName?: boolean; skipLastName?: boolean }): Promise<void> {

        if (!options?.skipFirstName) {
            await this.firstNameInputLocator.fill(StringUtils.randomizeUsername());
        }
        if (!options?.skipLastName) {
            await this.lastNameInputLocator.fill(StringUtils.randomizeUsername());
        }
        await this.emailInputLocator.fill(StringUtils.randomizeEmail());
        await this.addressInputLocator.fill(StringUtils.randomizeUsername());
        await this.phoneInputLocator.fill(StringUtils.randomizePhone());
        await this.submitButtonLocator.click();
    }
}
