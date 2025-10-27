import { getSdk } from '@fuel-explorer/graphql/sdk';
import { getSdk as getSdkProvider } from '@fuel-explorer/graphql/sdkProvider';
import { FUEL_CHAIN } from 'app-commons';

import { GraphQLClient } from 'graphql-request';

const FUEL_INDEXER_API = import.meta.env.VITE_FUEL_INDEXER_API;
const FUEL_INDEXER_API_KEY = import.meta.env.VITE_FUEL_INDEXER_API_KEY;
const FUEL_INDEXER_MAINNET_KEY = import.meta.env.VITE_FUEL_INDEXER_MAINNET_KEY;

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

const client = new GraphQLClient(`${FUEL_INDEXER_API}/graphql`, {
  headers: getHeaders(),
});

const fallbackClient = new GraphQLClient(FUEL_CHAIN.providerUrl, {
  headers: {
    'Content-Type': 'application/json',
  },
});
export const sdk = getSdk(client);
export const fuelCoreSdk = getSdkProvider(fallbackClient);
