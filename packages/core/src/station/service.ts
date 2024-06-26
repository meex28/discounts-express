import { loadStationsFromIntercity } from "../intercity/service";
import { StationResponse } from "./dto";
import { Station } from "./model";

export const updateAllStations = async () => {
    const stations = (await loadStationsFromIntercity()).filter((s) => s.code !== 0);
    return await Station.put(stations).go();
}

export const getAllStations = async (): Promise<StationResponse[]> => {
    return (await Station.scan.go()).data;
}
