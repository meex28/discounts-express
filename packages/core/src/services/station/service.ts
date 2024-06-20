import { Station } from "../../models/station";
import { loadStationsFromIntercity } from "../intercity/service";

export const updateAllStations = async () => {
    const stations = (await loadStationsFromIntercity()).filter((s) => s.code !== 0);
    return await Station.put(stations).go()
}