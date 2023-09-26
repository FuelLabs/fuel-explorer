import { GraphQLClient } from 'graphql-request';
import { resolve } from 'url';
import { getSdk } from '~/graphql/generated/types';

const VERCEL_URL = process.env.VERCEL_URL;
const API_URL =
  process.env.NODE_ENV === 'production'
    ? resolve(VERCEL_URL!, '/api/graphql')
    : 'http://localhost:3000/api/graphql';

const graphql = new GraphQLClient(API_URL);
export const client = getSdk(graphql);
