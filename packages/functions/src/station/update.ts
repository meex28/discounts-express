import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import { updateAllStations } from "@discounts-express/core/station/service";
import { ApiHandler } from "sst/node/api";

export const handler = ApiHandler(async (event) => {
    await updateAllStations();
    return {
        statusCode: 200
    }
});

export const registerPathUpdate = (registry: OpenAPIRegistry) => {
    registry.registerPath({
        method: "post",
        path: "/stations",
        responses: {
            200: {
                description: "All stations from external provider were saved in the database.",
            },
        }
    })
}