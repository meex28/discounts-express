import { loadConnectionsFromIntercity } from "../intercity/service";

export const getIntercityConnections = async (
    departureStationCode: number,
    arrivalStationCode: number,
    departureTime: string,
) => {
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