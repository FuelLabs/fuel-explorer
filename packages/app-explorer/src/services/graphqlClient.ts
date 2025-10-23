import { GraphQLClient } from 'graphql-request';
import { getSdk } from '../../../graphql/src/graphql/generated/sdk';
import { getSdk as getSdkProvider } from '../../../graphql/src/graphql/generated/sdk-provider';

// Environment variables
const FUEL_INDEXER_API = import.meta.env.VITE_FUEL_INDEXER_API;
const FUEL_INDEXER_API_KEY = import.meta.env.VITE_FUEL_INDEXER_API_KEY;
const FUEL_PROVIDER = import.meta.env.VITE_FUEL_PROVIDER;

if (!FUEL_INDEXER_API) {
  throw new Error('Missing VITE_FUEL_INDEXER_API environment variable');
}

if (!FUEL_PROVIDER) {
  throw new Error('Missing VITE_FUEL_PROVIDER environment variable');
}

// Helper function to get headers with authentication
const getHeaders = () => {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (FUEL_INDEXER_API_KEY) {
    headers['x-api-key'] = `Bearer ${FUEL_INDEXER_API_KEY}`;
    headers.Authorization = `Bearer ${FUEL_INDEXER_API_KEY}`;
  }

  return headers;
};

// Main GraphQL client for the indexer API
const indexerClient = new GraphQLClient(`${FUEL_INDEXER_API}/graphql`, {
  headers: getHeaders(),
});

// Fallback client for Fuel Core provider
const providerClient = new GraphQLClient(FUEL_PROVIDER, {
  headers: {
    'Content-Type': 'application/json',
  },
});

// Create SDK instances
export const sdk = getSdk(indexerClient);
export const fuelCoreSdk = getSdkProvider(providerClient);

// Export types for convenience
export type { Sdk } from '../../../graphql/src/graphql/generated/sdk';
