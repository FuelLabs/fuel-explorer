import { ResolverAdapter } from '~/core/Resolver';
import {
  GQLBalance,
  GQLQueryBalanceArgs,
  GQLQueryBalancesArgs,
  GQLQueryCoinsArgs,
} from '~/graphql/generated/sdk';
import { GraphQLSDK } from '../GraphQLSDK';

type Source = GQLBalance;
type Params = {
  balance: GQLQueryBalanceArgs;
  balances: GQLQueryBalancesArgs;
  utxos: GQLQueryCoinsArgs['filter'];
};

class BalanceResolver extends ResolverAdapter<Source> {
  private constructor(private client = new GraphQLSDK()) {
    super();
    this.setResolvers({
      Query: {
        balance: this.balance.bind(this),
        balances: this.balances.bind(this),
      },
      Balance: {
        utxos: this.utoxs.bind(this),
      },
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

  // TODO: need to check how to implement this using Postgres
  async utoxs(_: Source, params: Params['utxos']) {
    const res = await this.client.sdk.coins({ first: 100, filter: params });
    return res.data.coins.nodes;
  }
}

export default BalanceResolver.create();
