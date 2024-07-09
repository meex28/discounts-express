import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import { GetConnectionRequest } from "@discounts-express/core/connection/dto";
import { getConnection } from "@discounts-express/core/connection/service";
import { ApiHandler } from "sst/node/api";
import { z } from "zod";
import { connectionResponseSchema } from "./connection.contract";

export const handler = ApiHandler(async (event) => {
    const { id } = getConnectionRequestSchema.parse(event.pathParameters);
    const connection = await getConnection(id);
    return {
        statusCode: 200,
        body: JSON.stringify(connection),
    };
});

const getConnectionRequestSchema: z.ZodType<GetConnectionRequest> = z.object({
    id: z.string(),
});

export const registerPathGet = (registry: OpenAPIRegistry) => {
    const getConnectionRequestApiSchema = registry.register(
        "CreateConnectionRequest",
        getConnectionRequestSchema
    );

    registry.registerPath({
        method: "get",
        path: "/connections",
        request: {
            body: {
                content: {
                    "application/json": {
                        schema: getConnectionRequestApiSchema
                    }
                }
            }
        },
        responses: {
            200: {
                description: "Return connection by id",
                content: {
                    "application/json": {
                        schema: connectionResponseSchema
                    }
                }
            },
        }
    })
}