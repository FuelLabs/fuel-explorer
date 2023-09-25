import cors from 'cors';
import express from 'express';
import expressPlayground from 'graphql-playground-middleware-express';
import { startGraphql } from '~/startGraphql';
import { requireEnv } from '~/utils';

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

// Health check endpoint
app.get('/health', (_, res) =>
  res.status(200).send({
    status: 'ok',
  }),
);

// Start graphql server
startGraphql(FUEL_PROVIDER_URL, app);

export default app;
