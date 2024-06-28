import { createConnection, getConnection } from "@discounts-express/core/connection/service";
import { ApiHandler } from "sst/node/api";
import { z } from "zod";

export const create = ApiHandler(async (event) => {
    const body = CreateConnectionRequest.parse(JSON.parse(event.body ?? ""));
    // TODO: pass whole object
    const connection = await createConnection(body.departureStationCode, body.arrivalStationCode, body.departureTime);
    return {
        statusCode: 200,
        body: JSON.stringify(connection),
    };
});

const CreateConnectionRequest = z.object({
    departureStationCode: z.number(),
    arrivalStationCode: z.number(),
    departureTime: z.string(),
});

export const get = ApiHandler(async (event) => {
    const { id } = GetConnectionPathParameters.parse(event.pathParameters);
    const connection = await getConnection(id);
    return {
        statusCode: 200,
        body: JSON.stringify(connection),
    };
});

const GetConnectionPathParameters = z.object({
    id: z.string(),
});