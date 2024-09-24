import { getSdk } from '@fuel-explorer/graphql/sdk';
import { GraphQLClient } from 'graphql-request';

const FUEL_INDEXER_API_KEY = 'your-secret-key';
const FUEL_INDEXER_API = 'http://localhost:3004/graphql';
const FUEL_INDEXER_MAINNET_KEY = process.env.FUEL_INDEXER_MAINNET_KEY;

if (!FUEL_INDEXER_API) {
  throw new Error(
    'Needs to inform env variable<FUEL_INDEXER_API> to Fuel Indexer API.',
  );
}

const getHeaders = () => {
  const headers: any = {};
  if (FUEL_INDEXER_API_KEY) {
    headers['x-api-key'] = `Bearer ${FUEL_INDEXER_API_KEY}`;
    headers.Authorization = `Bearer ${FUEL_INDEXER_API_KEY}`;
  }
  // TODO: remove after mainnet endpoint become public
  if (FUEL_INDEXER_MAINNET_KEY) {
    headers.Authorization = `Basic ${FUEL_INDEXER_MAINNET_KEY}`;
  }
  return headers;
};

const client = new GraphQLClient(FUEL_INDEXER_API, {
  fetch,
  headers: getHeaders(),
});
export const sdk = getSdk(client);
