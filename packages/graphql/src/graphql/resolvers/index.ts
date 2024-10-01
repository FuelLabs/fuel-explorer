import GraphQLAuth from '~/infra/auth/GraphQLAuth';
import { AccountResolver } from './AccountResolver';
import { BalanceResolver } from './BalanceResolver';
import { BlockResolver } from './BlockResolver';
import { ChainResolver } from './ChainResolver';
import { ContractResolver } from './ContractResolver';
import { NodeResolver } from './NodeResolver';
import { PredicateResolver } from './PredicateResolver';
import { PublicResolver } from './PublicResolver';
import { SearchResolver } from './SearchResolver';
import { TransactionResolver } from './TransactionResolver';

const balanceResolver = BalanceResolver.create();
const blockResolver = BlockResolver.create();
const chainResolver = ChainResolver.create();
const contractResolver = ContractResolver.create();
const nodeResolver = NodeResolver.create();
const predicateResolver = PredicateResolver.create();
const searchResolver = SearchResolver.create();
const transactionResolver = TransactionResolver.create();
const accountResolver = AccountResolver.create();

const publicResolver = PublicResolver.create();

export const resolvers = {
  Query: {
    ...GraphQLAuth.apply({
      ...balanceResolver.Query,
      ...blockResolver.Query,
      ...chainResolver.Query,
      ...contractResolver.Query,
      ...nodeResolver.Query,
      ...predicateResolver.Query,
      ...searchResolver.Query,
      ...transactionResolver.Query,
      ...accountResolver.Query,
    }),
    ...publicResolver.Query,
  },
  Balance: balanceResolver.Balance,
};
