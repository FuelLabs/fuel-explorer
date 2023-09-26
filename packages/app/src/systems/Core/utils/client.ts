import { GraphQLClient } from 'graphql-request';
import { resolve } from 'url';
import { getSdk } from '~/graphql/generated/types';

const VERCEL_URL = process.env.VERCEL_URL || process.env.NEXT_PUBLIC_VERCEL_URL;
const VERCEL_ENV =
  process.env.VERCEL_ENV || process.env.NEXT_PUBLIC_VERCEL_ENV || 'development';

const getBaseUrl = () => {
  if (VERCEL_ENV !== 'development') return `https://${VERCEL_URL}`;
  return 'http://localhost:3000';
};

const API_URL = resolve(getBaseUrl(), '/api/graphql');
const graphql = new GraphQLClient(API_URL);
export const client = getSdk(graphql);
