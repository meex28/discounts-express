import { SSTConfig } from "sst";
import { API } from "./stacks/ApiStack";
import { Storage } from "./stacks/StorageStack";

export default {
  config(_input) {
    return {
      name: "discounts-express",
      region: "us-east-1",
    };
  },
  stacks(app) {
    app.stack(Storage).stack(API);
  }
} satisfies SSTConfig;
