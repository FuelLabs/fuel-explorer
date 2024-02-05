import cors from "cors";
import express from "express";
import { createHandler } from "graphql-http/lib/use/express";
import expressPlayground from "graphql-playground-middleware-express";

import { ContextDomain } from "./domains/Context";
import { createSchema } from "./schema";
import { createGraphqlFetch } from "./utils/executor";
import { requireEnv } from "./utils/requireEnv";

const { FUEL_PROVIDER } = requireEnv([
  ["FUEL_PROVIDER", "https://beta-5.fuel.network/graphql"],
]);

// Create a server:
const app = express();

app.use(cors<cors.CorsRequest>());
app.use(express.json());

app.get(
  "/graphql",
  expressPlayground({
    endpoint: "/graphql",
    settings: {
      "schema.polling.enable": false,
    },
  }),
);

const executor = createGraphqlFetch(FUEL_PROVIDER);
const schema = createSchema(executor);

app.post(
  "/graphql",
  createHandler({
    schema,
    async context() {
      return ContextDomain.createContext(FUEL_PROVIDER);
    },
  }),
);

// Check health of the graphql endpoint and the fuel provider
app.get("/health", async (_, res) => {
  let providerUp = null;
  try {
    providerUp = (
      await fetch(`${FUEL_PROVIDER.replace("/graphql", "/health")}`).then(
        (res) => res.json(),
      )
    ).up;
  } catch (e) {
    providerUp = false;
  }

  res.status(200).send({
    up: true,
    providerUp: providerUp,
  });
});

export default app;
