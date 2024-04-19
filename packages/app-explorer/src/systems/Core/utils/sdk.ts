import { getSdk } from '@fuel-explorer/graphql/sdk';
import { GraphQLClient } from 'graphql-request';

const { FUEL_EXPLORER_API, FUEL_EXPLORER_API_KEY } = process.env;

if (!FUEL_EXPLORER_API) {
  throw new Error('FUEL_EXPLORER_API is required');
}

const getHeaders = () => {
  return FUEL_EXPLORER_API_KEY
    ? { Authorization: `Bearer ${FUEL_EXPLORER_API_KEY}` }
    : undefined;
};

const client = new GraphQLClient(FUEL_EXPLORER_API, {
  fetch,
  headers: getHeaders(),
});

export const sdk = getSdk(client);
