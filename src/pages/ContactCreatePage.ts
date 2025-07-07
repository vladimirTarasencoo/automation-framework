import {Page} from "playwright";
import {BasePage} from "./BasePage";
import {DataTable} from "@cucumber/cucumber";
import {UserData} from "../common/models/UserData";
import {StringUtils} from "../common/utils/StringUtils";
import {expect} from "@playwright/test";
import {ContactData} from "../common/models/ContactData";

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
    private PCInputLocator  = this.page.locator('//*[@id="postalCode"]');
    private countryInputLocator = this.page.locator('//*[@id="country"]');


    async navigate() {
        await this.open("addContact");
    };


    public async createContact(options?: {
        skipFirstName?: boolean;
        skipLastName?: boolean;
        testNum: number}): Promise<void> {

        if (!options?.skipFirstName && options?.testNum == 0) {
            await this.firstNameInputLocator.fill(StringUtils.randomizeUsername());
        }
        if (!options?.skipLastName && options?.testNum == 0) {
            await this.lastNameInputLocator.fill(StringUtils.randomizeUsername());

        } else if (options?.testNum == 1) {
            await this.firstNameInputLocator.fill("Vlad");
            await this.lastNameInputLocator.fill("svsese");
            await this.emailInputLocator.fill("vdrvsefc@dsvdr.com");
            await this.address1InputLocator.fill("dvdjhrvd");
            await this.address2InputLocator.fill("lkjnvdlkjrnv");
            await this.phoneInputLocator.fill("9998887766");
            await this.cityInputLocator.fill("Los Angeles");
            await this.SoPInputLocator.fill("California");
            await this.PCInputLocator.fill("20220");
            await this.countryInputLocator.fill("Cricova");
            await this.DoBInputLocator.fill("2018-02-02");
        }
        await this.submitButtonLocator.click();
    }
}
