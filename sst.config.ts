import { SSTConfig } from "sst";
import { WebStack } from "./stacks/WebStack";
import { Storage } from "./stacks/StorageStack";

export default {
  config(_input) {
    return {
      name: "discounts-express",
      region: "us-east-1",
    };
  },
  stacks(app) {
    app.stack(Storage).stack(WebStack);
  }
} satisfies SSTConfig;
