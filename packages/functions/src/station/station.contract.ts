import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import { StationResponse } from "@discounts-express/core/station/dto";
import { z } from "zod";
import { registerPathGet } from "./get";
import { registerPathUpdate } from "./update";

export const stationResponseSchema: z.ZodType<StationResponse> = z.object({
    id: z.string(),
    name: z.string(),
    code: z.number(),
});

export const generateStationDefinition = (registry: OpenAPIRegistry) => {
    registerPathGet(registry);
    registerPathUpdate(registry);
};