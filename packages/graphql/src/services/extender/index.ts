import { BalanceDomain } from '../../domains/Balance';
import { BlockDomain } from '../../domains/Block';
import { TransactionDomain } from '../../domains/Transaction';
import { TransactionConnectionDomain } from '../../domains/TransactionConnection';

import typeDefs from './extender.graphql';

export const ExtenderTypeDefs = typeDefs;
export const ExtenderResolvers = {
  Transaction: TransactionDomain.createResolvers(),
  TransactionConnection: TransactionConnectionDomain.createResolvers(),
  Balance: BalanceDomain.createResolvers(),
  Block: BlockDomain.createResolvers(),
};
