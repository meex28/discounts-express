import { GetExternalConnectionsRequest } from "@discounts-express/core/connection/dto";
import { getExternalConnections } from "@discounts-express/core/src/connection/service";
import { ApiHandler } from "sst/node/api";
import { z } from "zod";

export const handler = ApiHandler(async (event) => {
    const params: GetExternalConnectionsRequest = ParamsParser.parse(event.queryStringParameters);
    const connections = await getExternalConnections(params.departureStationCode, params.arrivalStationCode, params.departureTime);
    return {
        statusCode: 200,
        body: JSON.stringify(connections),
    };
})

const ParamsParser = z.object({
    departureStationCode: z.string().transform(Number),
    arrivalStationCode: z.string().transform(Number),
    departureTime: z.string(),
});
