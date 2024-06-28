import { Entity, EntityItem } from "electrodb";
import { dynamoClient, dynamoTable } from "../../common/config";

export const Price = new Entity({
    model: {
        entity: "price",
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
        timeUntilDepartureCheck: {
            type: "number",
        },
        placeTypeCode: {
            type: "number"
        },
        priceTypeCode: {
            type: "number"
        },
        priceTypeName: {
            type: "string"
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
                composite: ["connectionId"]
            },
            sk: {
                field: "sk",
                composite: ["class", "placeTypeCode", "timeUntilDepartureCheck"]
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
