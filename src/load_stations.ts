import { HTTPResponse } from "puppeteer";
import { openPage } from "./base";

interface Station {
    code: string;
    name: string;
}

const stationKeysMappings: Record<keyof Station, string> = {
    'code': 'kod',
    'name': 'nazwa'
};

const readStations = async (rawStations: Record<string, string>[]) => {
    return rawStations.map((rawStation) => {
        const station: Station = {} as Station;
        Object.keys(stationKeysMappings).forEach((key) => {
            const rawKey = stationKeysMappings[key as keyof Station];
            station[key as keyof Station] = rawStation[rawKey];
        });
        return station;
    })
}

(async () => {
    const interceptResponse = async (response: HTTPResponse) => {
        const request = response.request();
        const requestBody = request.postData() ?? "";
        if(!requestBody.includes('pobierzStacje')) {
            return;
        }

        const responseBody = await response.json();
        if (responseBody['stacje']) {
            const stations = readStations(responseBody['stacje']);
            console.log('Intercepted response body:', stations);
        }
        await browser.close();
    };
    const { page, browser } = await openPage(interceptResponse);
})();