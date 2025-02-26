import { StackContext, Table } from "sst/constructs";

export function Storage({ stack }: StackContext) {
    const table = new Table(stack, "DiscountsExpress", {
        fields: {
            pk: "string",
            sk: "string",
            gsi1pk: "string",
            gsi1sk: "string"
        },
        primaryIndex: {
            partitionKey: "pk",
            sortKey: "sk"
        },
        globalIndexes: {
            gsi1: {
                partitionKey: "gsi1pk",
                sortKey: "gsi1sk"
            }
        }
    });

    return {
        table
    }
}