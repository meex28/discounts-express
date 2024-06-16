import { log } from "console";
import puppeteer, { Handler, HTTPResponse, PuppeteerLaunchOptions } from "puppeteer";

export const openPage = async (interceptResponse?: Handler<HTTPResponse>, options: PuppeteerLaunchOptions = {}) => {
    const browser = await puppeteer.launch(options);
    const page = await browser.newPage();

    if (interceptResponse) {
        page.on('response', interceptResponse);
    }

    await page.goto('https://ebilet.intercity.pl/');
    await page.setViewport({ width: 1080, height: 1024 });

    await page.waitForSelector('[aria-label="Zaakceptuj wszystko"]');
    await page.click('[aria-label="Zaakceptuj wszystko"]');

    return { page, browser };
}

export const getDeviceCode = async (): Promise<string | undefined>  => {
    const { page, browser } = await openPage();
    await page.waitForFunction(() => (window as any).env !== undefined);
    const envVariables = await page.evaluate(() => {
        return (window as any).env;
    });
    browser.close();
    return envVariables['REACT_APP_DEVICE_NUMBER'];
}