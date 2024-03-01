import { ResolverAdapter } from '~/core/Resolver';
import {
  GQLBalance,
  GQLBalanceQueryVariables,
  GQLBalancesQueryVariables,
} from '~/graphql/generated/sdk';
import { GraphQLSDK } from '../GraphQLSDK';

type Source = GQLBalance;
type Params = {
  balance: GQLBalanceQueryVariables;
  balances: GQLBalancesQueryVariables;
};

export class BalanceResolver extends ResolverAdapter<Source> {
  constructor(private client = new GraphQLSDK()) {
    super();
    this.setResolvers({
      balance: this.balance.bind(this),
      balances: this.balances.bind(this),
    });
  }

  async balance(_: Source, params: Params['balance']) {
    return this.client.sdk.balance(params);
  }

  async balances(_: Source, params: Params['balances']) {
    return this.client.sdk.balances(params);
  }
}
