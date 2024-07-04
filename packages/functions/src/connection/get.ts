import { GetConnectionRequest } from "@discounts-express/core/connection/dto";
import { getConnection } from "@discounts-express/core/connection/service";
import { ApiHandler } from "sst/node/api";
import { z } from "zod";

export const handler = ApiHandler(async (event) => {
    const { id } = PathParametersParser.parse(event.pathParameters);
    const connection = await getConnection(id);
    return {
        statusCode: 200,
        body: JSON.stringify(connection),
    };
});

const PathParametersParser: z.ZodType<GetConnectionRequest> = z.object({
    id: z.string(),
});