import {Page} from "playwright";
import {BasePage} from "./BasePage";
import {DataTable} from "@cucumber/cucumber";
import {UserData} from "../common/models/UserData";
import {StringUtils} from "../common/utils/StringUtils";
import {expect} from "@playwright/test";
import {pageFactory} from "./pageFactory";
import {Pages} from "../enums/common.enum";
import {ContactsList} from "./ContactsList";

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
    private address1InputLocator = this.page.locator('//*[@id="street1"]');
    private address2InputLocator = this.page.locator('//*[@id="street2"]');
    private cityInputLocator = this.page.locator('//*[@id="city"]');
    private SoPInputLocator = this.page.locator('//*[@id="stateProvince"]');
    private DoBInputLocator = this.page.locator('//*[@id="birthdate"]');
    private PCInputLocator = this.page.locator('//*[@id="postalCode"]');
    private countryInputLocator = this.page.locator('//*[@id="country"]');


    async navigate() {
        await this.open("addContact");
    };

    public async createFakeContacts(options?: {
        skipFirstName?: boolean;
        skipLastName?: boolean;
    }): Promise<void> {

        const skipFirst = options?.skipFirstName ?? false;
        const skipLast = options?.skipLastName ?? false;

        if (!skipFirst) {
            await this.firstNameInputLocator.fill(StringUtils.randomizeUsername());
        }
        if (!skipLast) {
            await this.lastNameInputLocator.fill(StringUtils.randomizeUsername());
        }
        await this.submitButtonLocator.click();
    }

    public async createContactFromTable(
        contact: Record<string, string>,
        returnToAddPage: boolean = false
    ): Promise<void> {
        if (contact.FirstName) await this.firstNameInputLocator.fill(contact.FirstName);
        if (contact.LastName) await this.lastNameInputLocator.fill(contact.LastName);
        if (contact.Email) await this.emailInputLocator.fill(contact.Email);
        if (contact.DoB) await this.DoBInputLocator.fill(contact.DoB);
        if (contact.Phone) await this.phoneInputLocator.fill(contact.Phone);
        if (contact.Address1) await this.address1InputLocator.fill(contact.Address1);
        if (contact.Address2) await this.address2InputLocator.fill(contact.Address2);
        if (contact.City) await this.cityInputLocator.fill(contact.City);
        if (contact.SoP) await this.SoPInputLocator.fill(contact.SoP);
        if (contact.PostCode) await this.PCInputLocator.fill(contact.PostCode);
        if (contact.Country) await this.countryInputLocator.fill(contact.Country);

        const currentUrl = this.page.url();
        await this.submitButtonLocator.click();
        await this.page.waitForURL(url => url.toString() !== currentUrl);

        if (returnToAddPage) {
            this.logger.info(`Going to creating another contact`);
            await this.navigate()
        }
    }
}
