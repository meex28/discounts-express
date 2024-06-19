import { HTTPResponse } from "puppeteer";
import { openIntercityPage } from "./browser_client";
import { mapToConnection, mapToPrice, mapToStation } from "./model_mappings";
import { intercityApiClient } from "./api_client";
import { Connection, Station } from "./model";

export const loadStationsFromIntercity = async () => {
    let stations!: Station[];

    const interceptResponse = async (response: HTTPResponse) => {
        const request = response.request();
        const requestBody = request.postData() ?? "";
        if (!requestBody.includes('pobierzStacje')) {
            return;
        }
        const responseBody = await response.json();
        if (responseBody['stacje']) {
            stations = responseBody['stacje'].map((s: Record<string, string>) => mapToStation(s));
        }
    };

    const { browser } = await openIntercityPage(interceptResponse, { });

    // Wait until stations are defined or a timeout is reached
    try {
        const timeout = 10000; // 10 seconds
        const checkInterval = 100; // 0.1 second
        const maxChecks = timeout / checkInterval;

        for (let i = 0; i < maxChecks; i++) {
            if (stations !== undefined && stations.length > 0) {
                return stations;
            }
            await new Promise(resolve => setTimeout(resolve, checkInterval));
        }

        throw new Error('Failed to load stations within the specified timeout');
    } finally {
        await browser.close();
    }
}

export const loadConnectionsFromIntercity = async (
    departureStationCode: number,
    arrivalStationCode: number,
    departureTime: string,
    arrivalTime: string,
    maxTransfers: number
) => {
    const payload = {
        stacjaWyjazdu: departureStationCode,
        stacjaPrzyjazdu: arrivalStationCode,
        dataWyjazdu: departureTime,
        dataPrzyjazdu: arrivalTime,
        liczbaPrzesiadekMax: maxTransfers,
        metoda: 'wyszukajPolaczenia'
    };
    return await intercityApiClient.post('Pociagi', payload)
        .then(response => response.data['polaczenia'].map(mapToConnection))
        .catch(error => {
            console.error('Cannot load connections from intercity. Error:', error);
            throw error;
        });
}

export const loadConnectionPricesFromIntercity = async (
    connection: Connection,
) => {
    const payload = {
        odcinki: connection.sections.map(section => ({
            pociagNr: section.trainNumber,
            wyjazdData: section.departureTime,
            stacjaOdKod: section.departureStationCode,
            stacjaDoKod: section.arrivalStationCode
        })),
        podrozni: [{kodZakupowyZnizki: 1010}],
        ofertaKod: 1, // TODO: what does this mean?
        metoda: 'sprawdzCene'
    };
    return await intercityApiClient.post('Sprzedaz', payload)
        .then(response => response.data['ceny'].map(mapToPrice))
        .catch(error => {
            console.error('Cannot load prices from intercity. Error:', error);
            throw error;
        });
}