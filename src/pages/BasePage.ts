import {Page} from "playwright";
import pino from "pino";
import logger from "../logger/pino";

export class BasePage {
    page: Page;
    public logger: pino.Logger;

    constructor(page: Page) {
        this.page = page;
        this.logger = logger;
    }

    async open(path: string) {
        this.logger.info(`Going to ${path}`);
        await this.page.goto(`https://thinking-tester-contact-list.herokuapp.com/${path.toLowerCase()}`);
    }
}

