import { getAllStations } from "@discounts-express/core/station/service";
import { ApiHandler } from "sst/node/api";

export const handler = ApiHandler(async (event) => {
    const stations = await getAllStations();
    return {
        statusCode: 200,
        body: JSON.stringify({ stations })
    }
});
