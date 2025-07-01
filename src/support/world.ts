import { Page, Browser } from 'playwright';
import { IWorldOptions, setWorldConstructor, World } from '@cucumber/cucumber';
import logger from '../../logger/pino';

export class CustomWorld extends World {
    page!: Page;
    browser!: Browser;
    logger = logger;

    constructor(options: IWorldOptions) {
        super(options);
    }

    async init() {

    }
}

setWorldConstructor(CustomWorld);