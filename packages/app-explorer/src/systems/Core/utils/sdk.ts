import { getSdk } from '@fuel-explorer/graphql/sdk';
import { GraphQLClient } from 'graphql-request';

const FUEL_INDEXER_API_KEY = process.env.FUEL_INDEXER_API_KEY;
const FUEL_INDEXER_API =
  process.env.FUEL_INDEXER_API ||
  'https://testnet-indexer-staging.fuel.network/graphql';

const getHeaders = () => {
  if (FUEL_INDEXER_API_KEY) {
    return { Authorization: `Bearer ${FUEL_INDEXER_API_KEY}` };
  }
  return undefined;
};

const client = new GraphQLClient(FUEL_INDEXER_API, {
  fetch,
  headers: getHeaders(),
});
export const sdk = getSdk(client);
