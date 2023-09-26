import { getSdk } from '@fuel-explorer/graphql';
import { GraphQLClient } from 'graphql-request';

const graphql = new GraphQLClient(process.env.GRAPHQL_API!);
export const sdk = getSdk(graphql);
