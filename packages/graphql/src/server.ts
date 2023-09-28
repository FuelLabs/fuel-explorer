import cors from 'cors';
import express from 'express';
import { createHandler } from 'graphql-http/lib/use/express';
import expressPlayground from 'graphql-playground-middleware-express';

import { createSchema } from './schema';
import { requireEnv } from './utils/requireEnv';

const { FUEL_PROVIDER_URL } = requireEnv(['FUEL_PROVIDER_URL']);

// Create a server:
const app = express();

app.use(cors<cors.CorsRequest>());
app.use(express.json());

app.get(
  '/graphql',
  expressPlayground({
    endpoint: '/graphql',
    settings: {
      'schema.polling.enable': false,
    },
  }),
);

const schema = createSchema(FUEL_PROVIDER_URL);
app.post('/graphql', createHandler({ schema }));

export default app;
