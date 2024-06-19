import puppeteer, { Handler, HTTPResponse, PuppeteerLaunchOptions } from "puppeteer";

export const openIntercityPage = async (interceptResponse?: Handler<HTTPResponse>, options: PuppeteerLaunchOptions = {}) => {
    const browser = await puppeteer.launch(options);
    const page = await browser.newPage();
    const url = 'https://ebilet.intercity.pl/';

    if (interceptResponse) {
        page.on('response', interceptResponse);
    }

    await page.goto(url);
    await page.setViewport({ width: 1080, height: 1024 });

    await page.waitForSelector('[aria-label="Zaakceptuj wszystko"]');
    await page.click('[aria-label="Zaakceptuj wszystko"]');

    return { page, browser };
}

export const getDeviceNumber = async (): Promise<string | undefined>  => {
    const { page, browser } = await openIntercityPage();
    await page.waitForFunction(() => (window as any).env !== undefined);
    const envVariables = await page.evaluate(() => {
        return (window as any).env;
    });
    browser.close();
    return envVariables['REACT_APP_DEVICE_NUMBER'];
}