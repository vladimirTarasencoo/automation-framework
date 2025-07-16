import {Page, BrowserContext, Browser} from 'playwright';
import { IWorldOptions, setWorldConstructor, World } from '@cucumber/cucumber';
import logger from '../logger/pino';
import {UserData} from "../common/models/UserData";
import {ContactsService} from "../services/ContactsService";

export class CustomWorld extends World {
    currentUser: UserData
    page!: Page;
    context!: BrowserContext;
    logger = logger;
    browser!: Browser;
    currentContact?: Record<string, string>;
    createdContacts: Record<string, string>[];
    contactsService!: ContactsService;

    constructor(options: IWorldOptions) {
        super(options);
        this.currentUser = new UserData();
        this.createdContacts = [];
        this.contactsService = new ContactsService(this.currentUser);
    }
}

setWorldConstructor(CustomWorld);
