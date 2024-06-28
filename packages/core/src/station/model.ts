import { randomUUID } from "crypto";
import { Entity, EntityItem } from "electrodb";
import { dynamoClient, dynamoTable } from "../common/config";

export const Station = new Entity({
    model: {
        entity: "station",
        version: "1",
        service: "discount-express"
    },
    attributes: {
        id: {
            type: "string",
            default: () => randomUUID()
        },
        name: {
            type: "string",
            required: true
        },
        code: {
            type: "number",
            required: true
        }
    },
    indexes: {
        station: {
            pk: {
                field: "pk",
                composite: ["id"]
            },
            sk: {
                field: "sk",
                composite: ["name"]
            }
        },
        byCode: {
            index: "gsi1",
            pk: {
                field: "gsi1pk",
                composite: ["code"]
            },
            sk: {
                field: "gsi1sk",
                composite: ["id"]
            }
        }
    },
},
    { table: dynamoTable, client: dynamoClient }
);

export type StationItem = EntityItem<typeof Station>;
