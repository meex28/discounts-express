import axios from 'axios';

const USER_AGENT_HEADER = {'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64'};

export const intercityApiClient = axios.create({
    baseURL: 'https://api-gateway.intercity.pl/server/public/endpoint/',
    headers: {
        'Content-Type': 'application/json',
        'Accept': '*/*',
        ...USER_AGENT_HEADER
    }
});

intercityApiClient.interceptors.request.use(async (config) => {
    config.data = {
        ...config.data,
        urzadzenieNr: await getDeviceNumber()
    };
    return config;
});

const getDeviceNumber = () => {
    return axios.get('https://ebilet.intercity.pl/env.js', {headers: USER_AGENT_HEADER})
        .then(response => {
            // as response we get .js file like `window.env = {"KEY":"VALUE"}`
            const body = response.data;
            const envString = body.substring(
                body.indexOf('{'),
                body.indexOf('}') + 1
            );
            const env = JSON.parse(envString);
            return env['REACT_APP_DEVICE_NUMBER'];
        }).catch(error => {
            console.error('Cannot get device number. Error:', error);
            throw error;
        });
}