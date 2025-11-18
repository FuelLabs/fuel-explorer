import GraphQLAuth from '~/infra/auth/GraphQLAuth';
import { APYResolver } from './APYResolver';
import { AssetResolver } from './AssetResolver';
import { BalanceResolver } from './BalanceResolver';
import { BlockResolver } from './BlockResolver';
import { BridgeResolver } from './BridgeResolver';
import { ChainResolver } from './ChainResolver';
import { ContractResolver } from './ContractResolver';
import { NodeResolver } from './NodeResolver';
import { PredicateResolver } from './PredicateResolver';
import { PublicResolver } from './PublicResolver';
import { SearchResolver } from './SearchResolver';
import { SearchResolverFast } from './SearchResolverFast';
import { SearchResolverSlow } from './SearchResolverSlow';
import { StakingResolver } from './StakingResolver';
import { TransactionResolver } from './TransactionResolver';

export const blockResolver = BlockResolver.create();
const balanceResolver = BalanceResolver.create();
const chainResolver = ChainResolver.create();
const contractResolver = ContractResolver.create();
const nodeResolver = NodeResolver.create();
const predicateResolver = PredicateResolver.create();
const searchResolver = SearchResolver.create();
const searchResolverFast = SearchResolverFast.create();
const searchResolverSlow = SearchResolverSlow.create();
const transactionResolver = TransactionResolver.create();
const assetResolver = AssetResolver.create();
const stakingResolver = StakingResolver.create();
const bridgeResolver = BridgeResolver.create();

// Public Resolvers
const apyResolver = APYResolver.create();
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
      ...searchResolverFast.Query,
      ...searchResolverSlow.Query,
      ...transactionResolver.Query,
      ...assetResolver.Query,
      ...stakingResolver.Query,
      ...bridgeResolver.Query,
    }),
    ...apyResolver.Query,
    ...publicResolver.Query,
  },
  Balance: balanceResolver.Balance,
};
