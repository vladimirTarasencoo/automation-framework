// src/support/customWorld.ts
import { Page } from '@playwright/test';
import { IWorldOptions, setWorldConstructor, World } from '@cucumber/cucumber';
import pino from "pino"; // or playwright-core if you use that
import logger from '../../logger/pino';
import {Browser, chromium} from "playwright";

export class CustomWorld extends World {
    //TODO: add more data here
    variable: string; //you can store here everything you want

    logger: pino.Logger = logger;
    page!: Page;
    browser!: Browser;

    async init() {
        this.browser = await chromium.launch();
        this.page = await this.browser.newPage();
    }
    async close() {
        await this.browser.close();
    }
    constructor(options: IWorldOptions) {
        super(options);
        this.variable = 'hui'
    }
}

setWorldConstructor(CustomWorld);