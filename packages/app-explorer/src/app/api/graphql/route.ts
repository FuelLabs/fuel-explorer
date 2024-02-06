import { createExecutor, createSchema } from '@fuel-explorer/graphql';
import { ContextDomain } from '@fuel-explorer/graphql/src/domains/Context';
import { createYoga } from 'graphql-yoga';
import { requireEnv } from '~/systems/utils/requireEnv';

const { FUEL_PROVIDER: url } = requireEnv(['FUEL_PROVIDER']);

const executor = createExecutor(async ({ body }) => {
  return fetch(url, {
    body,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((res) => res.json());
});

const schema = createSchema(executor);
const { handleRequest } = createYoga({
  schema,
  batching: true,
  graphqlEndpoint: '/api/graphql',
  fetchAPI: {
    Response,
    Request,
  },
  context: async () => {
    return ContextDomain.createContext(url);
  },
});

export {
  handleRequest as GET,
  handleRequest as POST,
  handleRequest as OPTIONS,
};
