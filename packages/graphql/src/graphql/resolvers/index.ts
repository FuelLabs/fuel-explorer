import { merge } from 'lodash';
import { BalanceResolver } from './BalanceResolver';
import { BlockResolver } from './BlockResolver';
import { ChainResolver } from './ChainResolver';
import { ContractResolver } from './ContractResolver';
import { NodeResolver } from './NodeResolver';
import { PredicateResolver } from './PredicateResolver';
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

export const resolvers = merge(
  balanceResolver,
  blockResolver,
  chainResolver,
  contractResolver,
  nodeResolver,
  predicateResolver,
  searchResolver,
  transactionResolver,
);
