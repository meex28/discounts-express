import { randomUUID } from "crypto";
import { Entity, EntityItem } from "electrodb";
import { dynamoClient, dynamoTable } from "./config";

export const Connection = new Entity({
    model: {
        entity: "connection",
        version: "1",
        service: "discount-express"
    },
    attributes: {
        id: {
            type: "string",
            default: () => randomUUID()
        },
        departureStationId: {
            type: "string"
        },
        arrivalStationId: {
            type: "string"
        },
        departureTime: {
            type: "string"
        },
        arrivalTime: {
            type: "string"
        },
        trainCategory: {
            type: "string"
        },
        trainNumber: {
            type: "number"
        },
        trainName: {
            type: "string"
        }
    },
    indexes: {
        connection: {
            pk: {
                field: "pk",
                composite: ["id"]
            },
            sk: {
                field: "sk",
                composite: ["departureTime"]
            }
        },
        byDepartureStation: {
            index: "byDepartureStation",
            pk: {
                field: "gsi1pk",
                composite: ["departureStationId"]
            },
            sk: {
                field: "gsi1sk",
                composite: ["departureTime"]
            }
        },
    }
},
    {
        table: dynamoTable,
        client: dynamoClient
    }
);

export type ConnectionItem = EntityItem<typeof Connection>;
