import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import { registerPathCreate } from "./create";
import { registerPathGet } from "./get";
import { ConnectionResponse } from "@discounts-express/core/connection/dto";
import { stationResponseSchema } from "src/station/station.contract";
import { z } from "zod";

export const connectionResponseSchema: z.ZodType<ConnectionResponse> = z.object({
    id: z.string().openapi({ description: "Connection id" }),
    departureStation: stationResponseSchema.openapi({ description: "Departure station description" }),
    arrivalStation: stationResponseSchema,
    departureTime: z.string(),
    arrivalTime: z.string(),
    trainCategory: z.string(),
    trainNumber: z.number(),
    trainName: z.string(),
});

export const generateConnectionDefinition = (registry: OpenAPIRegistry) => {
    registerPathCreate(registry);
    registerPathGet(registry);
};