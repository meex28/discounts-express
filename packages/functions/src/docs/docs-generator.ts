import { OpenApiGeneratorV31, OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import { generateStationDefinition } from "src/station/station.contract";
import { ApiHandler } from "sst/node/api";
import { stringify } from "yaml";
import { generateConnectionDefinition } from "../connection/connection.contract";
import { generateExternalConnectionDefinition } from "src/external_connection/external_connection.conract";

export const registry = new OpenAPIRegistry();

export const handler = ApiHandler(async (event) => {
    generateConnectionDefinition(registry);
    generateStationDefinition(registry);
    generateExternalConnectionDefinition(registry);

    const generator = new OpenApiGeneratorV31(registry.definitions);
    const document = generator.generateDocument({
        openapi: "3.1.0",
        info: {
            title: "Discounts Express",
            version: "1.0.0",
        }
    });

    return {
        statusCode: 200,
        headers: {
            "Content-Type": "text/yaml",
            "Cache-Control": "no-store",
        },
        body: stringify(document),
    };
});