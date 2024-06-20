import { intercityApiClient } from "./api_client";
import { ConnectionIcDto, PriceIcDto, StationIcDto } from "./model";
import { mapToConnection, mapToPrice, mapToStation } from "./model_mappings";

export const loadStationsFromIntercity = async (): Promise<StationIcDto[]> => {
    const payload = {
        metoda: 'pobierzStacje'
    };
    return await intercityApiClient
        .post('Aktualizacja', payload)
        .then(response => response.data['stacje'].map(mapToStation))
        .catch(error => {
            console.error('Cannot load stations from intercity. Error:', error);
            throw error;
        });
}

export const loadConnectionsFromIntercity = async (
    departureStationCode: number,
    arrivalStationCode: number,
    departureTime: string,
    arrivalTime: string,
    maxTransfers: number
): Promise<ConnectionIcDto[]> => {
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
    connection: ConnectionIcDto,
): Promise<PriceIcDto[]> => {
    const payload = {
        odcinki: connection.sections.map(section => ({
            pociagNr: section.trainNumber,
            wyjazdData: section.departureTime,
            stacjaOdKod: section.departureStationCode,
            stacjaDoKod: section.arrivalStationCode
        })),
        podrozni: [{ kodZakupowyZnizki: 1010 }],
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