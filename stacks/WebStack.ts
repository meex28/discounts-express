import { Api, StackContext, StaticSite, use } from "sst/constructs";
import { Storage } from "./StorageStack";

export function WebStack({ stack }: StackContext) {
  const { table } = use(Storage);

  const api = new Api(stack, "api", {
    defaults: {
      function: {
        bind: [table]
      }
    },
    routes: {
      "POST /stations": "packages/functions/src/station/update.handler",
      "GET /stations": "packages/functions/src/station/get.handler",

      "POST /connections": "packages/functions/src/connection/create.handler",
      "GET /connections/{id}": "packages/functions/src/connection.get",
      "GET /connections/external": "packages/functions/src/external_connection/get.handler",
    },
  });

  const site = new StaticSite(stack, "react-frontend", {
    path: "packages/frontend",
    buildOutput: "dist",
    buildCommand: "npm run build",
    environment: {
      VITE_API_URL: api.url
    },
  });

  stack.addOutputs({
    ApiEndpoint: api.url,
    SiteUrl: site.url
  });
}
