import cors from 'cors';
import express from 'express';
import expressPlayground from 'graphql-playground-middleware-express';
import { startGraphql } from '~/startGraphql';

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

// Start graphql server
startGraphql('http://localhost:4000/graphql', app);

// Start the server:
app.listen(4444, () =>
  console.log('🚀 Explorer api running at http://localhost:4444/graphql'),
);
