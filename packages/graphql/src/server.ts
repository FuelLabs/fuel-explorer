import cors from 'cors';
import express from 'express';
import { createHandler } from 'graphql-http/lib/use/express';
import expressPlayground from 'graphql-playground-middleware-express';

import { ContextDomain } from './domains/Context';
import { createSchema } from './schema';
import { createGraphqlFetch } from './utils/executor';
import { requireEnv } from './utils/requireEnv';

const { FUEL_PROVIDER } = requireEnv([
  ['FUEL_PROVIDER', 'https://beta-5.fuel.network/graphql'],
]);
const { FUEL_EXPLORER_API_KEY } = process.env;

// Create a server:
const app = express();

app.use(cors<cors.CorsRequest>());
app.use(express.json());

if (FUEL_EXPLORER_API_KEY) {
  app.use((req, res, next) => {
    if (req.headers.authorization !== `Bearer ${FUEL_EXPLORER_API_KEY}`) {
      res.status(401).send('Unauthorized');
      return;
    }
    next();
  });
}

app.get(
  '/graphql',
  expressPlayground({
    endpoint: '/graphql',
    settings: {
      'schema.polling.enable': false,
    },
  }),
);

const executor = createGraphqlFetch(FUEL_PROVIDER);
const schema = createSchema(executor);

app.post(
  '/graphql',
  createHandler({
    schema,
    async context() {
      return ContextDomain.createContext(FUEL_PROVIDER);
    },
  }),
);

// Check health of the graphql endpoint and the fuel provider
app.get('/health', async (_, res) => {
  let providerUp = null;
  try {
    providerUp = (
      await fetch(`${FUEL_PROVIDER.replace('/graphql', '/health')}`).then(
        (res) => res.json(),
      )
    ).up;
  } catch (_e) {
    providerUp = false;
  }

  res.status(200).send({
    up: true,
    providerUp: providerUp,
  });
});

export default app;
