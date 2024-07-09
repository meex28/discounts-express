import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import { CreateConnectionRequest } from "@discounts-express/core/connection/dto";
import { createConnection } from "@discounts-express/core/connection/service";
import { ApiHandler } from "sst/node/api";
import { z } from "zod";
import { extendZodWithOpenApi } from "zod-openapi";

extendZodWithOpenApi(z);

export const handler = ApiHandler(async (event) => {
    const body = createConnectionRequestSchema.parse(JSON.parse(event.body ?? ""));
    // TODO: pass whole object
    const connection = await createConnection(body.departureStationCode, body.arrivalStationCode, body.departureTime);
    return {
        statusCode: 200,
        body: JSON.stringify(connection),
    };
});

export const createConnectionRequestSchema: z.ZodType<CreateConnectionRequest> = z.object({
    departureStationCode: z.number().openapi({
        description: "The station code of the departure station",
        example: 123
    }),
    arrivalStationCode: z.number().openapi({
        description: "The station code of the arrival station",
        example: 123
    }),
    departureTime: z.string().openapi({
        description: "Departure time of train. Application will use closest available train to this time. Format: 'YYYY-MM-DD HH:mm:ss'",
        example: "2024-07-02 10:10:00"
    }),
});

export const registerPathCreate = (registry: OpenAPIRegistry) => {
    const createConnectionRequestApiSchema = registry.register(
        "CreateConnectionRequest",
        createConnectionRequestSchema
    );

    registry.registerPath({
        method: "post",
        path: "/connections",
        request: {
            body: {
                content: {
                    "application/json": {
                        schema: createConnectionRequestApiSchema
                    }
                }
            }
        },
        responses: {
            200: {
                description: "Connection created",
            },
        }
    })
}
