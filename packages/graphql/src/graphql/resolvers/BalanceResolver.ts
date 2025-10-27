import { logger } from '~/core/Logger';
import type {
  GQLBalance,
  GQLQueryBalanceArgs,
  GQLQueryBalanceByBlockHeightArgs,
  GQLQueryBalancesArgs,
  GQLQueryCoinsArgs,
} from '~/graphql/generated/sdk-provider';
import BalanceDAO from '~/infra/dao/BalanceDAO';
import { convertToUsd } from '~/infra/dao/utils';
import AssetGateway from '~/infra/gateway/AssetGateway';
import type { GraphQLContext } from '../GraphQLContext';

type Source = GQLBalance;
type Params = {
  balance: GQLQueryBalanceArgs;
  balances: GQLQueryBalancesArgs;
  balanceByBlockHeight: GQLQueryBalanceByBlockHeightArgs;
  utxos: GQLQueryCoinsArgs['filter'];
};

export class BalanceResolver {
  static create() {
    const resolvers = new BalanceResolver();
    return {
      Query: {
        balance: resolvers.balance,
        balances: resolvers.balances,
        balanceByBlockHeight: resolvers.balanceByBlockHeight,
      },
      Balance: {
        utxos: resolvers.utxos,
      },
    };
  }

  async balance(
    _: Source,
    params: Params['balance'],
    { client, chain }: GraphQLContext,
  ) {
    logger.debug('GraphQL', 'BalanceResolver.balance');
    const assetGateway = new AssetGateway();
    const res = await client.sdk.balance(params);
    const balance = res.data.balance as any;
    const chainId = chain ? Number.parseInt(chain.chainId) : undefined;
    const asset = await assetGateway.getAsset(balance.assetId, chainId);
    if (asset) {
      balance.assetId = asset.assetId;
      balance.contractId = asset.contractId;
      balance.name = asset.name;
      balance.symbol = asset.symbol;
      balance.icon = asset.icon;
      balance.decimals = asset.decimals;
      balance.totalSupply = asset.totalSupply;
      balance.suspicious = asset.suspicious;
      balance.collection = asset.collection;
      balance.rate = asset.rate;
      balance.amountInUsd = asset.rate
        ? convertToUsd(balance.amount, balance.decimals, asset.rate).formatted
        : null;
    }
    return balance;
  }

  async balances(
    _: Source,
    params: Params['balances'],
    { client, chain }: GraphQLContext,
  ) {
    logger.debug('GraphQL', 'BalanceResolver.balances');
    const assetGateway = new AssetGateway();
    const res = (await client.sdk.balances(params)) as any;
    const balances = res.data.balances;
    for (const balance of balances.nodes) {
      const chainId = chain ? Number.parseInt(chain.chainId) : undefined;
      const asset = await assetGateway.getAsset(balance.assetId, chainId);
      if (asset) {
        balance.assetId = asset.assetId;
        balance.contractId = asset.contractId;
        balance.name = asset.name;
        balance.symbol = asset.symbol;
        balance.icon = asset.icon;
        balance.decimals = asset.decimals;
        balance.totalSupply = asset.totalSupply;
        balance.suspicious = asset.suspicious;
        if (asset.metadata?.image) {
          asset.metadata.image = asset.metadata.image.replace(
            'ipfs://',
            'https://ipfs.io/ipfs/',
          );
        }
        balance.metadata = JSON.stringify(asset.metadata);
        balance.collection = asset.collection;
        balance.rate = asset.rate;
        balance.amountInUsd = asset.rate
          ? convertToUsd(balance.amount, balance.decimals, asset.rate).formatted
          : null;
      }
    }
    return balances;
  }

  async balanceByBlockHeight(
    _: Source,
    params: Params['balanceByBlockHeight'],
    { chain }: GraphQLContext,
  ) {
    logger.debug('GraphQL', 'BalanceResolver.balanceByBlockHeight');
    const chainId = chain ? Number.parseInt(chain.chainId) : undefined;
    const balanceDAO = new BalanceDAO();
    const output = await balanceDAO.getBalance(
      params.accountHash,
      params.assetId,
      params.blockHeight || null,
    );
    if (!output) {
      return {};
    }
    const assetGateway = new AssetGateway();
    const asset = await assetGateway.getAsset(params.assetId, chainId);
    return {
      accountHash: output.account_hash,
      assetId: output.asset_id,
      blockHeight: output.block_height,
      balance: output.balance,
      balanceInUsd: asset.rate
        ? convertToUsd(output.balance, asset.decimals, asset.rate).formatted
        : null,
    };
  }

  async utxos(
    parent: Source,
    params: Params['utxos'],
    { client }: GraphQLContext,
  ) {
    logger.debug('GraphQL', 'BalanceResolver.utxos');
    const filter = !params?.owner
      ? {
          assetId: parent.assetId,
          owner: parent.owner,
        }
      : params;

    const res = await client.sdk.coins({ first: 2500, filter });
    return res.data.coins.nodes;
  }
}
