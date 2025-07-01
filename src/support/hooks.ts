import { chromium, Browser, BrowserContext, Page, ChromiumBrowser } from 'playwright';
import { BeforeAll, AfterAll, Before, After } from '@cucumber/cucumber';
import { RegistrationPage } from '../pages/RegistrationPage';
import { CustomWorld } from './world';
import { pwBrowserConfig } from '../../config/pwProwser';

let browser: ChromiumBrowser;
let context: BrowserContext;
let page: Page;
let isRegistered = false;

BeforeAll(async function() {
    browser = await chromium.launch(pwBrowserConfig.browserLaunchOptions);
    context = await browser.newContext();
    page = await context.newPage();
});

Before(async function(this: CustomWorld) {
    this.browser = browser;
    this.page = page;

    if (!isRegistered) {
        const registrationPage = new RegistrationPage(this.page);
        await registrationPage.navigate();
        await registrationPage.userRegister();
        isRegistered = true;
    }
});

AfterAll(async () => {
    await browser.close();
});
