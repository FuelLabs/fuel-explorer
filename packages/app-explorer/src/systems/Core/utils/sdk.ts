import { getSdk } from '@fuel-explorer/graphql/sdk';
import { GraphQLClient } from 'graphql-request';

const { FUEL_EXPLORER_API, FUEL_EXPLORER_API_KEY } = process.env;
const VERCEL_ENV =
  process.env.VERCEL_ENV || process.env.NEXT_PUBLIC_VERCEL_ENV || 'development';

const getHeaders = () => {
  if (VERCEL_ENV === 'development') return undefined;
  if (FUEL_EXPLORER_API_KEY) {
    return { Authorization: `Bearer ${FUEL_EXPLORER_API_KEY}` };
  }
  return undefined;
};

const client = new GraphQLClient(FUEL_EXPLORER_API, {
  fetch,
  headers: getHeaders(),
});
export const sdk = getSdk(client);
