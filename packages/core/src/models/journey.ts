import { Entity, EntityItem } from "electrodb";
import { dynamoClient, dynamoTable } from "./config";

export const Journey = new Entity({
    model: {
        entity: "journey",
        version: "1",
        service: "discount-express"
    },
    attributes: {
        connectionId: {
            type: "string"
        },
        departureTimestamp: {
            type: "number"
        },
        arrivalTimestamp: {
            type: "number"
        }
    },
    indexes: {
        journey: {
            pk: {
                field: "pk",
                composite: ["connectionId"]
            },
            sk: {
                field: "sk",
                composite: ["departureTimestamp"]
            }
        }
    }
},
    {
        table: dynamoTable,
        client: dynamoClient
    }
);

export type JourneyItem = EntityItem<typeof Journey>;
