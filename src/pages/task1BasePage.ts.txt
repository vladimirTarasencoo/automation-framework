import {Page} from "playwright";
import logger from "../../logger/pino";
import pino from "pino";

export class Task1BasePage {
    page: Page;
    public logger: pino.Logger;

    constructor(page: Page) {
        this.page = page;
        this.logger = logger;
    }

    public async refreshPage(): Promise<void> {
        await this.page.reload();
    }
}

