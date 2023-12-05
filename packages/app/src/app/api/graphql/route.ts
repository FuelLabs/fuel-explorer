import { createExecutor, createSchema } from '@fuel-explorer/graphql';
import { getChainInfo } from '@fuel-explorer/graphql/src/utils/chainInfo';
import { createYoga } from 'graphql-yoga';
// import { setTimeout } from 'timers/promises';

const url = process.env.FUEL_PROVIDER_URL!;
const executor = createExecutor(async ({ body }) => {
  const time = new Date().toString();
  console.time(`request ${time}`);
  return fetch(url, {
    body,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((res) => {
    console.timeEnd(`request ${time}`);
    return res.json();
  });
});

const schema = createSchema(executor);
const { handleRequest: _handleRequest } = createYoga({
  schema,
  batching: true,
  graphqlEndpoint: '/api/graphql',
  fetchAPI: {
    Response,
    Request,
  },
  context: async () => ({ url, chainInfo: await getChainInfo(url) }),
});

const handleRequest = _handleRequest;

export {
  handleRequest as GET,
  handleRequest as POST,
  handleRequest as OPTIONS,
};
