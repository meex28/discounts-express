import axios from "axios";
import { getDeviceCode } from "./base";

interface Train {
    departureStation: number;
    arrivalStation: number;
    departureTime: string;
    arrivalTime: string;
    trainCategory: string;
    trainNumber: number;
    trainName: string;
}

const checkPrice = async (train: Train) => {
    const url = 'https://api-gateway.intercity.pl/server/public/endpoint/Sprzedaz';
    const payload = {
        "odcinki": [
            {
                "pociagNr": train.trainNumber,
                "wyjazdData": train.departureTime,
                "stacjaOdKod": train.departureStation,
                "stacjaDoKod": train.arrivalStation
            }
        ],
        "podrozni": [
            {
                "kodZakupowyZnizki": 1010
            }
        ],
        "ofertaKod": 1,
        "urzadzenieNr": "956",
        "metoda": "sprawdzCene"
    };
    const response = await axios.post(url, payload, {headers: {'Content-Type': 'application/json', 'Accept': '*/*', 'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64)'}})
        .then(response => response.data)
        .catch(error => {
            console.error('Error occurred:', error);
        });
    return response['ceny'].map((c: { [x: string]: any; }) => {
        return {
            class: c['klasa'],
            price: c['cena']
        }
    });
}

(async () => {
    const deviceCode = await getDeviceCode()!!;
    console.log(`Fetched device code: ${deviceCode}`)
    const url = 'https://api-gateway.intercity.pl/server/public/endpoint/Pociagi';
    const payload = {
        stacjaWyjazdu: 248,
        stacjaPrzyjazdu: 159,
        dataWyjazdu: "2024-06-25 00:00:00",
        dataPrzyjazdu: "2024-06-25 23:59:59",
        liczbaPrzesiadekMax: 0,
        urzadzenieNr: String(deviceCode),
        metoda: "wyszukajPolaczenia"
    };
    const response = await axios.post(url, payload, {headers: {'Content-Type': 'application/json', 'Accept': '*/*', 'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64)'}})
        .then(response => response.data)
        .catch(error => {
            console.error('Error occurred:', error);
        });
    const trains = response['polaczenia'].map((r: { [x: string]: any[]; }) => {
        const trains = r['pociagi'][0];
        return {
            departureStation: trains['stacjaWyjazdu'],
            arrivalStation: trains['stacjaPrzyjazdu'],
            departureTime: r['dataWyjazdu'],
            arrivalTime: r['dataPrzyjazdu'],
            trainCategory: trains['kategoriaPociagu'],
            trainNumber: trains['nrPociagu'],
            trainName: trains['nazwaPociagu']
        } as unknown as Train;
    }) as Train[];
    
    console.log(`TRAIN: ${JSON.stringify(trains[4])}`);
    const price = await checkPrice(trains[4]);
    console.log(`PRICE: ${JSON.stringify(price)}`);
})();