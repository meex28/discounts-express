import { log } from 'console';
import puppeteer, { Page } from 'puppeteer';

const openPage = async () => {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    await page.goto('https://ebilet.intercity.pl/');
    await page.setViewport({ width: 1080, height: 1024 });

    await page.waitForSelector('[aria-label="Zaakceptuj wszystko"]');
    await page.click('[aria-label="Zaakceptuj wszystko"]');

    return { page, browser };
}

const typeStationInput = async (page: Page, inputType: 'stationFrom' | 'stationTo', stationName: string) => {
    await page.waitForSelector(`#${inputType}`);
    await page.type(`#${inputType}`, '', { delay: 300 });
    await page.waitForSelector('.AutocompleateStation_autocompleateStation_list__vL5tD');
    await page.type(`#${inputType}`, stationName, { delay: 300 });
    await page.waitForSelector('.AutocompleateStation_autocompleateStation_list__vL5tD');
    const stations = await page.$$('.AutocompleateStation_autocompleateStation_list__vL5tD');
    await stations[0].click();
}

const clickSubmitButton = async (page: Page) => {
    const submitButton = await page.$('button[type="submit"]');
    await submitButton?.click();
}

const typeDateInput = async (page: Page, date: string) => {
    const input = await page.waitForSelector('.Calendar_cc_textContainer__7e83X');
    await input?.click();
    const dateButton = await page.waitForSelector(`[aria-label="${date}"]`)
    await dateButton?.click();
    const submitButton = await page.waitForSelector('[aria-label="Wybierz datę"]');
    await submitButton?.click();
}

const typeTimeInput = async (page: Page, time: string) => {
    const input = await page.waitForSelector('input[type="time"]');
    await input?.type(time, { delay: 50 });
}

const extractTrainFromSingleElement = async (element: Element) => { }


const extractTrains = async (page: Page) => {
    // get children of element with clas YourTrip_yourTrip__container__aS+nD
    await page.waitForFunction(() => document.querySelectorAll('[data-testid="TripPropositionDesktop"]').length > 0);
    const tripPropositions = await page.$$eval('[data-testid="TripPropositionDesktop"]', 
        (elements) => elements.map((e) => {
            return [...e.querySelectorAll('span')].map(s => s.innerText);
        }) 
    );
    console.log(tripPropositions);
}

(async () => {
    const { page, browser } = await openPage();

    await typeStationInput(page, 'stationFrom', 'Wrocław Gł.');
    await typeStationInput(page, 'stationTo', 'Gdańsk Gł.');
    await typeDateInput(page, 'Czerwiec 28');
    await typeTimeInput(page, '1330');

    await clickSubmitButton(page);
    await clickSubmitButton(page);

    await extractTrains(page);

    // await page.waitForSelector('#aa');

    await browser.close();
})();