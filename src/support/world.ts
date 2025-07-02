import {Page, BrowserContext, Browser} from 'playwright';
import { IWorldOptions, setWorldConstructor, World } from '@cucumber/cucumber';
import logger from '../../logger/pino';

export class CustomWorld extends World {
    page!: Page;
    context!: BrowserContext;
    logger = logger;
    browser!: Browser;

    constructor(options: IWorldOptions) {
        super(options);
    }
}

setWorldConstructor(CustomWorld);