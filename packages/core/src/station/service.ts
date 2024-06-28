import { ObjectNotFoundError } from "../common/errors";
import { loadStationsFromIntercity } from "../intercity/service";
import { StationResponse } from "./dto";
import { Station, StationItem } from "./model";

export const updateAllStations = async () => {
    const stations = (await loadStationsFromIntercity()).filter((s) => s.code !== 0);
    return await Station.put(stations).go();
}

export const getAllStations = async (): Promise<StationResponse[]> => {
    return (await Station.scan.go()).data;
}

export const getStationByCode = async (code: number): Promise<StationItem> => {
    const stations = (await Station.query.byCode({ code }).go()).data;
    if (stations.length === 0) {
        throw new ObjectNotFoundError(`Station with code ${code} not found`);
    }
    return stations[0];
}

export const getStationById = async (id: string): Promise<StationItem> => {
    const stations = (await Station.query.station({ id }).go()).data;
    if (stations.length === 0) {
        throw new ObjectNotFoundError(`Station with id ${id} not found`);
    }
    return stations[0];
}