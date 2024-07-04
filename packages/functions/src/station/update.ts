import { updateAllStations } from "@discounts-express/core/station/service";
import { ApiHandler } from "sst/node/api";

export const handler = ApiHandler(async (event) => {
    await updateAllStations();
    return {
        statusCode: 200
    }
});
