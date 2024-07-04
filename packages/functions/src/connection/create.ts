import { CreateConnectionRequest, GetConnectionRequest } from "@discounts-express/core/connection/dto";
import { createConnection, getConnection } from "@discounts-express/core/connection/service";
import { ApiHandler } from "sst/node/api";
import { z } from "zod";

export const handler = ApiHandler(async (event) => {
    const body = BodyParser.parse(JSON.parse(event.body ?? ""));
    // TODO: pass whole object
    const connection = await createConnection(body.departureStationCode, body.arrivalStationCode, body.departureTime);
    return {
        statusCode: 200,
        body: JSON.stringify(connection),
    };
});

const BodyParser: z.ZodType<CreateConnectionRequest> = z.object({
    departureStationCode: z.number(),
    arrivalStationCode: z.number(),
    departureTime: z.string(),
});