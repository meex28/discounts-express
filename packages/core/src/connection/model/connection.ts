import { randomUUID } from "crypto";
import { Entity, EntityItem } from "electrodb";
import { dynamoClient, dynamoTable } from "../../common/config";

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
            type: "string",
            required: true
        },
        arrivalTime: {
            type: "string",
            required: true
        },
        trainCategory: {
            type: "string",
            required: true
        },
        trainNumber: {
            type: "number",
            required: true
        },
        trainName: {
            type: "string",
            required: true
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
