import {chromium, Browser, BrowserContext, Page, ChromiumBrowser} from 'playwright';
import {BeforeAll, AfterAll, Before, ITestCaseHookParameter, After} from '@cucumber/cucumber';
import logger from "../../logger/pino";
// @ts-ignore
import {pwBrowserConfig} from '../../config/pwProwser';
import {RegistrationPage} from '../pages/RegistrationPage';
import {CustomWorld} from "./world";

let browser: ChromiumBrowser;
let context: BrowserContext;
let page: Page;

declare global {
    const browser: ChromiumBrowser;
}

Before({timeout: 10000}, async function (this: CustomWorld) {
    await this.init();
    const registrationPage = new RegistrationPage(this.page);
    await registrationPage.userRegister();
    console.log('User registered');
});

BeforeAll(async () => {
    browser = await chromium.launch(pwBrowserConfig.browserLaunchOptions);
    context = await browser.newContext();
    page = await context.newPage();
});
AfterAll(async () => {
    await browser.close();
});

export { page };
