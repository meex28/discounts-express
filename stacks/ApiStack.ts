import { Api, StackContext, use } from "sst/constructs";
import { Storage } from "./StorageStack";

export function API({ stack }: StackContext) {
  const { table } = use(Storage);

  const api = new Api(stack, "api", {
    defaults: {
      function: {
        bind: [table]
      }
    },
    routes: {
      "POST /stations": "packages/functions/src/stations.updateAll",
      "GET /connections/intercity": "packages/functions/src/intercity_connections.get",
    },
  });

  stack.addOutputs({
    ApiEndpoint: api.url,
  });
}
