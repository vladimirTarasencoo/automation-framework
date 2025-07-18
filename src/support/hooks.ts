import { chromium, Browser, BrowserContext, Page } from 'playwright';
import {BeforeAll, AfterAll, Before, After} from '@cucumber/cucumber';
import { CustomWorld } from './world';
import {pwBrowserConfig} from "../config/pwProwser";
import {StringUtils} from "../common/utils/StringUtils";

let browser: Browser;
let context: BrowserContext;
let page: Page;

BeforeAll(async function () {
    browser = await chromium.launch(pwBrowserConfig.browserLaunchOptions);
    context = await browser.newContext();
    page = await context.newPage();
});

Before({ tags: '@RegisterUser' }, async function (this: CustomWorld) {
    const userData = {
        firstName: StringUtils.randomizeUsername(),
        lastName: StringUtils.randomizeUsername(),
        email: StringUtils.randomizeEmail(),
        password: StringUtils.randomizePassword()
    };

    try {
        const res = await this.contactsService.register(userData);

        if (res.status !== 200 && res.status !== 201) {
            this.logger.error(`Ошибка регистрации: статус ${res.status}`);
            throw new Error(`Registration failed with status ${res.status}`);
        }

        // await this.contactsService.login({
        //     email: userData.email,
        //     password: userData.password
        // });

        Object.assign(this.currentUser, userData);

    } catch (error) {
        this.logger.error('Ошибка в хуке @RegisterUser:', error);
        throw error;
    }
});

Before(async function (this: CustomWorld) {
    this.browser = browser;
    this.context = context;
    this.page = page;
});

AfterAll(async () => {
    await browser.close();
});

