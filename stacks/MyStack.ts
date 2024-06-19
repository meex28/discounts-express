import { StackContext, Api } from "sst/constructs";

export function API({ stack }: StackContext) {
  const api = new Api(stack, "api", {
    routes: {
      "GET /stations": "packages/functions/src/stations.get",
    },
  });

  stack.addOutputs({
    ApiEndpoint: api.url,
  });
}
