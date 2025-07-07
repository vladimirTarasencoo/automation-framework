import {Page, BrowserContext, Browser} from 'playwright';
import { IWorldOptions, setWorldConstructor, World } from '@cucumber/cucumber';
import logger from '../logger/pino';
import {UserData} from "../common/models/UserData";
import {ContactData} from "../common/models/ContactData";

export class CustomWorld extends World {
    currentUser: UserData
    currentContact: ContactData
    page!: Page;
    context!: BrowserContext;
    logger = logger;
    browser!: Browser;

    constructor(options: IWorldOptions) {
        super(options);
        this.currentUser = UserData.getInstance();
        this.currentContact = ContactData.getInstance();
    }
}

setWorldConstructor(CustomWorld);