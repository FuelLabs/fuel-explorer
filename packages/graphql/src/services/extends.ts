import { BalanceDomain } from '../domains/Balance';
import { BlockDomain } from '../domains/Block';
import { SearchDomain } from '../domains/Search';
import { TransactionDomain } from '../domains/Transaction';
import { TransactionConnectionDomain } from '../domains/TransactionConnection';

import typeDefs from './extends.graphql';

export const extendsTypeDefs = typeDefs;
export const extendsResolvers = {
  Balance: BalanceDomain.createResolvers(),
  Transaction: TransactionDomain.createResolvers(),
  TransactionConnection: TransactionConnectionDomain.createResolvers(),
  Block: BlockDomain.createResolvers(),
  Query: SearchDomain.createResolvers(),
};
