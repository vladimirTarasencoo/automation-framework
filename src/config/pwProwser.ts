import {LaunchOptions} from "playwright";

export const customTracesDir = './traces';

const browserLaunchOptions: LaunchOptions = {
    slowMo: Number(process.env.SLOW_MODE) || 250,
    headless: process.env.HEADLESS === 'true',
    args: ['--use-fake-ui-for-media-stream', '--use-fake-device-for-media-stream'],
}

export const pwBrowserConfig = {
    browser: process.env.BROWSER || 'chromium',
    browserLaunchOptions: browserLaunchOptions,
    BASE_URL: `https://${process.env.BASE_URL}`,
}
