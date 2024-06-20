import { getIntercityConnections } from "@discounts-express/core/src/services/connection/service";
import { ApiHandler } from "sst/node/api";
import { z } from "zod";

export const get = ApiHandler(async (event) => {
    const params = GetIntercityConnectionsParams.parse(event.queryStringParameters);
    const connections = await getIntercityConnections(params.departureStationCode, params.arrivalStationCode, params.departureTime);
    return {
        statusCode: 200,
        body: JSON.stringify(connections),
    };
})

const GetIntercityConnectionsParams = z.object({
    departureStationCode: z.string().transform(Number),
    arrivalStationCode: z.string().transform(Number),
    departureTime: z.string(),
});