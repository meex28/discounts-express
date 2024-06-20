import { DynamoDB } from "aws-sdk";
import { Table } from "sst/node/table";

export const dynamoClient = new DynamoDB.DocumentClient();

export const dynamoTable = Table.DiscountsExpress.tableName;