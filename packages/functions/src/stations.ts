import { ApiHandler } from "sst/node/api";
import { updateAllStations } from "@discounts-express/core/services/station/service";

export const updateAll = ApiHandler(async (event) => {
    const stations = await updateAllStations();
    return {
        statusCode: 200,
        body: JSON.stringify({ stations })
    }
}); 