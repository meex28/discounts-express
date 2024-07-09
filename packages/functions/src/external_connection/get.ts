import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import { GetExternalConnectionRequest } from "@discounts-express/core/connection/dto";
import { getExternalConnections } from "@discounts-express/core/src/connection/service";
import { ApiHandler } from "sst/node/api";
import { z } from "zod";

export const handler = ApiHandler(async (event) => {
    const params: GetExternalConnectionRequest = getExternalConnectionRequestSchema.parse(event.queryStringParameters);
    const connections = await getExternalConnections(params.departureStationCode, params.arrivalStationCode, params.departureTime);
    return {
        statusCode: 200,
        body: JSON.stringify(connections),
    };
})

const getExternalConnectionRequestSchema = z.object({
    departureStationCode: z.string().transform(Number),
    arrivalStationCode: z.string().transform(Number),
    departureTime: z.string(),
});

export const registerPathGet = (registry: OpenAPIRegistry) => {
    const getExternalConnectionRequestApiSchema = registry.register(
        "GetExternalConnectionRequest",
        getExternalConnectionRequestSchema
    );

    registry.registerPath({
        method: "get",
        path: "/connections",
        request: {
            body: {
                content: {
                    "application/json": {
                        schema: getExternalConnectionRequestApiSchema
                    }
                }
            }
        },
        responses: {
            200: {
                description: "Return connection",
                // TODO: add response body after changing service
            },
        }
    })
}