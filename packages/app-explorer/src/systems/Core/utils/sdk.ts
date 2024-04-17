import { resolve } from 'node:url';
import { getSdk } from '@fuel-explorer/graphql/src/graphql/generated/sdk';
import { GraphQLClient } from 'graphql-request';

const { FUEL_EXPLORER_API, FUEL_EXPLORER_API_KEY } = process.env;
const VERCEL_URL = process.env.VERCEL_URL || process.env.NEXT_PUBLIC_VERCEL_URL;
const VERCEL_ENV =
  process.env.VERCEL_ENV || process.env.NEXT_PUBLIC_VERCEL_ENV || 'development';

const getBaseUrl = () => {
  if (FUEL_EXPLORER_API) return FUEL_EXPLORER_API;

  // @TODO: What to do with this urls?
  if (VERCEL_ENV !== 'development')
    return resolve(`https://${VERCEL_URL}`, '/api/graphql');
  return 'http://localhost:3000/api/graphql';
};

const getHeaders = () => {
  if (FUEL_EXPLORER_API_KEY) {
    return { Authorization: `Bearer ${FUEL_EXPLORER_API_KEY}` };
  }

  return undefined;
};

const client = new GraphQLClient(getBaseUrl(), {
  fetch,
  headers: getHeaders(),
});

export const sdk = getSdk(client);
