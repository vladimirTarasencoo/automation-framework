import { chromium, Browser, BrowserContext, Page } from 'playwright';
import {BeforeAll, AfterAll, Before, After} from '@cucumber/cucumber';
import { CustomWorld } from './world';
import {pwBrowserConfig} from "../config/pwProwser";

let browser: Browser;
let context: BrowserContext;
let page: Page;

BeforeAll(async function () {
    browser = await chromium.launch(pwBrowserConfig.browserLaunchOptions);
    context = await browser.newContext();
    page = await context.newPage();
});

Before(async function (this: CustomWorld) {
    this.browser = browser;
    this.context = context;
    this.page = page;
});

AfterAll(async () => {
    await browser.close();
});
