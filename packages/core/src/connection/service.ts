import { ObjectNotFoundError } from "../common/errors";
import { loadConnectionPricesFromIntercity, loadConnectionsFromIntercity } from "../intercity/service";
import { mapDateToExternalFormat } from "../intercity/utils";
import { getStationByCode, getStationById } from "../station/service";
import { mapToConnection, mapToConnectionResponse } from "./converter";
import { ConnectionResponse } from "./dto";
import { Connection, ConnectionItem } from "./model/connection";
import { Price, PriceItem } from "./model/price";

export const getExternalConnections = async (
    departureStationCode: number,
    arrivalStationCode: number,
    departureTime: string,
) => {
    // TODO: return ConnectionResponse
    const departureTimeDate = new Date(departureTime);
    const arrivalTime = new Date(
        departureTimeDate.getFullYear(),
        departureTimeDate.getMonth(),
        departureTimeDate.getDate(),
        23, 59, 59
    ).toISOString();
    const maxTransfers = 1;
    return await loadConnectionsFromIntercity(departureStationCode, arrivalStationCode, departureTime, arrivalTime, maxTransfers);
}

export const createConnection = async (
    departureStationCode: number,
    arrivalStationCode: number,
    departureTime: string,
): Promise<ConnectionItem> => {
    const externalConnection = await getExternalConnections(departureStationCode, arrivalStationCode, departureTime)
        .then((res) => {
            if (res.length === 0) {
                throw new ObjectNotFoundError(`Connection from ${departureStationCode} to ${arrivalStationCode} at ${departureTime} not found`);
            }
            return res[0];
        });
    const departureStation = await getStationByCode(departureStationCode);
    const arrivalStation = await getStationByCode(arrivalStationCode);
    const connection = mapToConnection(externalConnection, departureStation, arrivalStation);
    return (await Connection.put(connection).go()).data;
}

const getConnectionById = async (id: string): Promise<ConnectionItem> => {
    return await Connection.query.connection({ id }).go()
        .then((res) => {
            if (res.data.length === 0) {
                throw new ObjectNotFoundError(`Connection with id ${id} not found`);
            }
            return res.data[0];
        });
}

export const getConnection = async (id: string): Promise<ConnectionResponse> => {
    const connection = await getConnectionById(id);
    const departureStation = await getStationById(connection.departureStationId!!);
    const arrivalStation = await getStationById(connection.arrivalStationId!!);
    return mapToConnectionResponse(connection, departureStation, arrivalStation);
}

export const createJourneysForConnection = async (connectionId: string) => {
    const connection = await getConnectionById(connectionId);
    // TODO: use collections to get stations
    const departureStation = await getStationById(connection.departureStationId!!);
    const arrivalStation = await getStationById(connection.arrivalStationId!!);

    const daysToCheck = 30;
    const departureDates = generateDatesWithTime(connection.departureTime, daysToCheck);
    const now = Date.now();
    const sectionsToCheckPrice = departureDates.map((date) => ({
        departureTime: mapDateToExternalFormat(date),
        trainNumber: connection.trainNumber,
        departureStationCode: departureStation.code!!,
        arrivalStationCode: arrivalStation.code!!
    }));

    const externalPricesPromises = sectionsToCheckPrice.map((section) => loadConnectionPricesFromIntercity([section]));
    const externalPrices = await Promise.all(externalPricesPromises);

    const prices: PriceItem[] = externalPrices.flatMap((journeyPrices, index) =>
        journeyPrices.map((externalPrice) => ({
            connectionId,
            departureTimestamp: departureDates[index].getTime(),
            timeUntilDepartureCheck: departureDates[index].getTime() - now,
            placeTypeCode: externalPrice.placeTypeCode,
            priceTypeCode: externalPrice.priceTypeCode,
            priceTypeName: externalPrice.priceTypeName,
            class: externalPrice.class,
            price: externalPrice.price
        } as PriceItem))
    );
    const validPrices = prices.filter((price) => price.timeUntilDepartureCheck >= 0);

    await Price.put(validPrices).go();
}

/**
 * Generate dates starting from today with given time
 * @param time - time in format 'HH:MM:SS'
 * @param daysNumber - generate N dates starting from today
 */
const generateDatesWithTime = (time: string, daysNumber: number): Date[] => {
    const [hours, minutes, seconds] = time.split(':').map(Number);
    const today = new Date();
    today.setHours(hours);
    today.setMinutes(minutes);
    today.setSeconds(seconds);

    const dates = [];
    for (let i = 0; i < daysNumber; i++) {
        const newDate = new Date(today);
        newDate.setDate(today.getDate() + i);
        dates.push(newDate);
    }

    return dates;
}