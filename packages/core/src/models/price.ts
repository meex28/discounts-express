import { Entity, EntityItem } from "electrodb";
import { dynamoClient, dynamoTable } from "./config";

export const Price = new Entity({
    model: {
        entity: "price",
        version: "1",
        service: "discount-express"
    },
    attributes: {
        journeyId: {
            type: "string"
        },
        timeBeforeDeparture: {
            type: "string",
        },
        placeTypeCode: {
            type: "number"
        },
        priceTypeCode: {
            type: "number"
        },
        priceTypeName: {
            type: "number"
        },
        class: {
            type: "number"
        },
        price: {
            type: "number"
        },
    },
    indexes: {
        price: {
            pk: {
                field: "pk",
                composite: ["journeyId"]
            },
            sk: {
                field: "sk",
                composite: ["class", "placeTypeCode", "timeBeforeDeparture"]
            }
        }
    }
},
    {
        table: dynamoTable,
        client: dynamoClient
    }
);

export type PriceItem = EntityItem<typeof Price>;
