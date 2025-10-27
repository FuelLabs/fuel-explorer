import { logger } from '~/core/Logger';
import type { GQLQueryTransactionsArgs } from '~/graphql/generated/sdk-provider';
import AssetDAO from '~/infra/dao/AssetDAO';
import AssetGateway from '~/infra/gateway/AssetGateway';
import PaginatedParams from '~/infra/paginator/PaginatedParams';
import type { GraphQLContext } from '../GraphQLContext';

type Params = {
  asset: { contractId: string } & GQLQueryTransactionsArgs;
};

export class AssetResolver {
  static create() {
    const resolvers = new AssetResolver();
    return {
      Query: {
        assetsByContract: resolvers.assetsByContract,
      },
    };
  }

  // TODO: index data to Postgres instead of fetch from SDK
  async assetsByContract(
    _: any,
    params: Params['asset'],
    { chain }: GraphQLContext,
  ) {
    logger.debug('GraphQL', 'AssetResolver.assetsByContract');
    const assetGateway = new AssetGateway();
    const assetDAO = new AssetDAO();
    const chainId = chain ? Number.parseInt(chain.chainId) : undefined;
    const assets = await assetDAO.getPaginatedByContractId(
      params.contractId,
      new PaginatedParams(params),
    );
    for (const asset of assets.nodes) {
      const resolvedAsset = await assetGateway.getAsset(asset.assetId, chainId);
      asset.assetId = resolvedAsset.assetId;
      asset.contractId = resolvedAsset.contractId;
      asset.name = resolvedAsset.name;
      asset.symbol = resolvedAsset.symbol;
      asset.decimals = resolvedAsset.decimals;
      asset.icon = resolvedAsset.icon;
      asset.networks = resolvedAsset.networks;
      asset.suspicious = resolvedAsset.suspicious;
      asset.rate = resolvedAsset.rate;
    }
    return assets;
  }
}
