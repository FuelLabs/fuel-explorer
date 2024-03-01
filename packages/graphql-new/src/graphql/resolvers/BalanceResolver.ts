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

class BalanceResolver extends ResolverAdapter<Source> {
  private constructor(private client = new GraphQLSDK()) {
    super();
    this.setResolvers({
      balance: this.balance.bind(this),
      balances: this.balances.bind(this),
    });
  }

  static create() {
    return new BalanceResolver().getResolvers();
  }

  // TODO: need to check how to implement this using Postgres
  async balance(_: Source, params: Params['balance']) {
    const res = await this.client.sdk.balance(params);
    return res.data.balance;
  }

  // TODO: need to check how to implement this using Postgres
  async balances(_: Source, params: Params['balances']) {
    const res = await this.client.sdk.balances(params);
    return res.data.balances;
  }
}

export default BalanceResolver.create();
