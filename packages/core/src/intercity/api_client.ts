import axios from 'axios';
import { getDeviceNumber } from './browser_client';

export const intercityApiClient = axios.create({
    baseURL: 'https://api-gateway.intercity.pl/server/public/endpoint/',
    headers: {
        'Content-Type': 'application/json',
        'Accept': '*/*',
        'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64'
    }
});

intercityApiClient.interceptors.request.use(async (config) => {
    config.data = {
        ...config.data,
        urzadzenieNr: await getDeviceNumber()
    };
    return config;
});