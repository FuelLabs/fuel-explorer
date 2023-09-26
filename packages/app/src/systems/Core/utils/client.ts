import { GraphQLClient } from 'graphql-request';
import { resolve } from 'url';
import { getSdk } from '~/graphql/generated/types';

const getBaseUrl = () => {
  if (process.env.VERCEL_ENV) return `https://${process.env.VERCEL_URL}`;
  return 'http://localhost:3000';
};

const API_URL = resolve(getBaseUrl(), '/api/graphql');
const graphql = new GraphQLClient(API_URL);
export const client = getSdk(graphql);
