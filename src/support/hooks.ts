import {chromium, Browser, BrowserContext, Page, ChromiumBrowser} from 'playwright';
import {BeforeAll, AfterAll, Before, ITestCaseHookParameter} from '@cucumber/cucumber';
import logger from "../../logger/pino";
// @ts-ignore
import {pwBrowserConfig} from '../../config/pwProwser';

let browser: ChromiumBrowser;
let context: BrowserContext;
let page: Page;

declare global {
    const browser: ChromiumBrowser;
}

BeforeAll(async () => {
    browser = await chromium.launch(pwBrowserConfig.browserLaunchOptions);
    context = await browser.newContext();
    page = await context.newPage();
});

Before(async function({ pickle }: ITestCaseHookParameter) {
    logger.info('🐱‍👤Starting Scenario: ' + pickle.name);
});

AfterAll(async () => {
    await browser.close();
});

export { page };