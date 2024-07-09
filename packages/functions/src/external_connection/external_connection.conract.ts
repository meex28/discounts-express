import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import { registerPathGet } from "./get";

export const generateExternalConnectionDefinition = (registry: OpenAPIRegistry) => {
    registerPathGet(registry);
};