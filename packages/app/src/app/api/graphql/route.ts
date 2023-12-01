import { createExecutor, createSchema } from '@fuel-explorer/graphql';
import { getChainInfo } from '@fuel-explorer/graphql/src/utils/chainInfo';
import { createYoga } from 'graphql-yoga';
// import { setTimeout } from 'timers/promises';

const url = process.env.FUEL_PROVIDER_URL!;
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
// // Use to delay more the application
// // eslint-disable-next-line @typescript-eslint/no-explicit-any
// const handleRequest = async (...args: any[]) => {
//   // console.log(args);
//   const response = _handleRequest(...args);
//   await setTimeout(5000);
//   return response;
// };

export {
  handleRequest as GET,
  handleRequest as POST,
  handleRequest as OPTIONS,
};
