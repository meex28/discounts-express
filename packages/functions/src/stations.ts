import { APIGatewayProxyHandlerV2 } from "aws-lambda";
import { loadStationsFromIntercity } from "@discounts-express/core/src/intercity/service"
import { ApiHandler } from "sst/node/api";

export const get = ApiHandler(async (event) => {
    const stations = await loadStationsFromIntercity();
    return {
        statusCode: 200,
        body: JSON.stringify({stations})
    }
}) 