import { loadConnectionPricesFromIntercity, loadConnectionsFromIntercity } from "./service";

(async () => {
    const connections = await loadConnectionsFromIntercity(
        248,
        85,
        '2024-06-29 00:00:00',
        '2024-06-29 23:59:59',
        0
    );
    
    const connection = connections[4];

    console.log(connection);

    const prices = await loadConnectionPricesFromIntercity(connection);

    console.log(prices);
})();