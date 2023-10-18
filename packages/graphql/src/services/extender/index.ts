/* eslint-disable import/no-named-as-default */
import GraphQLJSON, { GraphQLJSONObject } from 'graphql-type-json';

import { TransactionDomain } from '../../domains/Transaction';
import { TransactionConnectionDomain } from '../../domains/TransactionConnection';

import typeDefs from './extender.graphql';

export const ExtenderTypeDefs = typeDefs;
export const ExtenderResolvers = {
  Transaction: TransactionDomain.createResolvers(),
  TransactionConnection: TransactionConnectionDomain.createResolvers(),
  JSON: GraphQLJSON,
  JSONObject: GraphQLJSONObject,
};
