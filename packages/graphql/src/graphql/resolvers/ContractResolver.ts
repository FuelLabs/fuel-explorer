import { logger } from '~/core/Logger';
import type {
  GQLContract,
  GQLQueryContractArgs,
  GQLQueryContractBalanceArgs,
  GQLQueryContractBalancesArgs,
} from '~/graphql/generated/sdk-provider';
import ContractDAO from '~/infra/dao/ContractDAO';
import { convertToUsd } from '~/infra/dao/utils';
import AssetGateway from '~/infra/gateway/AssetGateway';
import PaginatedParams from '~/infra/paginator/PaginatedParams';
import type { GraphQLContext } from '../GraphQLContext';
import type { GQLContractBalance } from '../generated/sdk';

type Source = GQLContract;
type Params = {
  contracts: any;
  contract: GQLQueryContractArgs;
  contractBalance: GQLQueryContractBalanceArgs;
  contractBalances: GQLQueryContractBalancesArgs;
};

export class ContractResolver {
  static create() {
    const resolvers = new ContractResolver();
    return {
      Query: {
        contract: resolvers.contract,
        contracts: resolvers.contracts,
        contractBalance: resolvers.contractBalance,
        contractBalances: resolvers.contractBalances,
      },
    };
  }

  async contract(_: Source, { id }: Params['contract']) {
    logger.debug('GraphQL', 'ContractResolver.contract');
    if (!id) {
      throw new Error('Contract ID is required');
    }
    const contractDAO = new ContractDAO();
    const contract = await contractDAO.getByHash(id);
    return contract?.toGQLNode();
  }

  async contracts(_: Source, params: Params['contracts']) {
    logger.debug('GraphQL', 'ContractResolver.contracts');
    const contractDAO = new ContractDAO();
    const contracts = await contractDAO.getPaginatedContracts(
      new PaginatedParams(params),
    );
    return contracts;
  }

  async contractBalance(
    _: Source,
    params: Params['contractBalance'],
    { client }: GraphQLContext,
  ) {
    logger.debug('GraphQL', 'ContractResolver.contractBalance');
    const res = await client.sdk.contractBalance(params);
    return res.data.contractBalance;
  }

  async contractBalances(
    _: Source,
    params: Params['contractBalances'],
    { client, chain }: GraphQLContext,
  ) {
    logger.debug('GraphQL', 'ContractResolver.contractBalances');
    const assetGateway = new AssetGateway();
    params.first = 100;
    const res = await client.sdk.contractBalances(params);
    const chainId = chain ? Number.parseInt(chain.chainId) : undefined;
    const output = res.data.contractBalances;
    for (const edge of output.edges) {
      const node = edge.node as GQLContractBalance;
      if (node.assetId) {
        const asset = await assetGateway.getAsset(node.assetId, chainId);
        if (asset) {
          node.assetId = asset.assetId;
          node.name = asset.name;
          node.symbol = asset.symbol;
          node.decimals = asset.decimals;
          node.icon = asset.icon;
          node.suspicious = asset.suspicious;
          node.amountInUsd = convertToUsd(
            node.amount,
            Number(node.decimals),
            asset.rate,
          ).formatted;
        }
      }
    }
    return output;
  }
}
