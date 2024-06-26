import { getAllStations, updateAllStations } from "@discounts-express/core/station/service";
import { ApiHandler } from "sst/node/api";

export const updateAll = ApiHandler(async (event) => {
    await updateAllStations();
    return {
        statusCode: 200
    }
});

export const get = ApiHandler(async (event) => {
    const stations = await getAllStations();
    return {
        statusCode: 200,
        body: JSON.stringify({ stations })
    }
});
