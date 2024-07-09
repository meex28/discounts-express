import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import { getAllStations } from "@discounts-express/core/station/service";
import { ApiHandler } from "sst/node/api";
import { z } from "zod";
import { stationResponseSchema } from "./station.contract";

export const handler = ApiHandler(async (event) => {
    const stations = await getAllStations();
    return {
        statusCode: 200,
        body: JSON.stringify({ stations })
    }
});

export const registerPathGet = (registry: OpenAPIRegistry) => {
    registry.registerPath({
        method: "get",
        path: "/stations",
        responses: {
            200: {
                description: "Return all stations",
                content: {
                    "application/json": {
                        schema: z.array(stationResponseSchema)
                    }
                }
            },
        }
    })
}