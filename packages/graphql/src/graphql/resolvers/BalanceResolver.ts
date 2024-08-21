import type {
  GQLBalance,
  GQLQueryBalanceArgs,
  GQLQueryBalancesArgs,
  GQLQueryCoinsArgs,
} from '~/graphql/generated/sdk-provider';
import type { GraphQLContext } from '../GraphQLContext';

type Source = GQLBalance;
type Params = {
  balance: GQLQueryBalanceArgs;
  balances: GQLQueryBalancesArgs;
  utxos: GQLQueryCoinsArgs['filter'];
};

export class BalanceResolver {
  static create() {
    const resolvers = new BalanceResolver();
    return {
      Query: {
        balance: resolvers.balance,
        balances: resolvers.balances,
      },
      Balance: {
        utxos: resolvers.utxos,
      },
    };
  }

  // TODO: need to check how to implement this using Postgres
  async balance(
    _: Source,
    params: Params['balance'],
    { client }: GraphQLContext,
  ) {
    const res = await client.sdk.balance(params);
    return res.data.balance;
  }

  // TODO: need to check how to implement this using Postgres
  async balances(
    _: Source,
    params: Params['balances'],
    { client }: GraphQLContext,
  ) {
    const res = await client.sdk.balances(params);
    return res.data.balances;
  }

  // TODO: need to check how to implement this using Postgres
  async utxos(
    parent: Source,
    params: Params['utxos'],
    { client }: GraphQLContext,
  ) {
    const filter = !params?.owner
      ? {
          assetId: parent.assetId,
          owner: parent.owner,
        }
      : params;

    const res = await client.sdk.coins({ first: 100, filter });
    return res.data.coins.nodes;
  }
}
