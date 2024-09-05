import { getSdk } from '@fuel-explorer/graphql/sdk';
import { GraphQLClient } from 'graphql-request';

const FUEL_INDEXER_API_KEY = process.env.FUEL_INDEXER_API_KEY;
const FUEL_INDEXER_API = process.env.FUEL_INDEXER_API;

if (!FUEL_INDEXER_API) {
  throw new Error(
    'Needs to inform env variable<FUEL_INDEXER_API> to Fuel Indexer API.',
  );
}

const getHeaders = () => {
  if (FUEL_INDEXER_API_KEY) {
    return {
      'x-api-key': `Bearer ${FUEL_INDEXER_API_KEY}`,
      Authorization: 'Basic ZnVlbGRldjE6MXBkZGtpWGhMYlZESW1DZG1UNUhhdw==',
    };
  }
  return undefined;
};

const client = new GraphQLClient(FUEL_INDEXER_API, {
  fetch,
  headers: getHeaders(),
});
export const sdk = getSdk(client);
