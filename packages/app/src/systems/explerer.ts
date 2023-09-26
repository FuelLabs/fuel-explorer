import { getSdk } from '@fuel-explorer/graphql';
import { GraphQLClient } from 'graphql-request';

const client = new GraphQLClient(process.env.GRAPHQL_API!);
export const explorer = getSdk(client);
