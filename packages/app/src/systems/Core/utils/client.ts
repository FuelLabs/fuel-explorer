import { GraphQLClient } from 'graphql-request';
import { getSdk } from '~/graphql/generated/types';

const graphql = new GraphQLClient('http://localhost:3000/api/graphql');
export const client = getSdk(graphql);
