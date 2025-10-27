import { sleep } from 'fuels';
import { GraphQLError } from 'graphql';
import { logger } from '~/core/Logger';
import type {
  GQLBlock,
  GQLQueryBlockArgs,
  GQLQueryBlocksArgs,
} from '~/graphql/generated/sdk-provider';
import DataCache from '~/infra/cache/DataCache';
import BlockDAO from '~/infra/dao/BlockDAO';
import { convertToUsd } from '~/infra/dao/utils';
import AssetGateway from '~/infra/gateway/AssetGateway';
import PaginatedParams from '~/infra/paginator/PaginatedParams';
import type { GraphQLContext } from '../GraphQLContext';

type Source = GQLBlock;
type Params = {
  blocks: GQLQueryBlocksArgs;
  block: GQLQueryBlockArgs;
  tps: null;
  getBlocksDashboard: null;
};

export class BlockResolver {
  getBlocksDashboardData: Awaited<
    ReturnType<Awaited<typeof BlockResolver.prototype._getBlocksDashboard>>
  > | null = null;
  statisticsData: Awaited<
    ReturnType<Awaited<typeof BlockResolver.prototype._statistics>>
  > | null = null;
  tpsData: Awaited<
    ReturnType<Awaited<typeof BlockResolver.prototype._tps>>
  > | null = null;

  static create() {
    const resolvers = new BlockResolver();
    return {
      startPoolingAnalytics: resolvers.startPoolingAnalytics,
      Query: {
        block: resolvers.block.bind(resolvers),
        blocks: resolvers.blocks.bind(resolvers),
        tps: resolvers.tps.bind(resolvers),
        statistics: resolvers.statistics.bind(resolvers),
        getBlocksDashboard: resolvers.getBlocksDashboard.bind(resolvers),
      },
    };
  }

  startPoolingAnalytics = async ({
    chainId,
    baseAssetId,
  }: { chainId: number; baseAssetId: string }) => {
    try {
      logger.debug('GraphQL', 'BlockResolver.startPoolingAnalytics START');
      this.getBlocksDashboardData = await this._getBlocksDashboard(
        {} as any,
        null,
        { chainId, baseAssetId },
      );
      this.statisticsData = await this._statistics({} as any, null, {
        chainId,
        baseAssetId,
      });
      this.tpsData = await this._tps({} as any, null);
      logger.debug('GraphQL', 'BlockResolver.startPoolingAnalytics END');
    } catch (e) {
      logger.error('GraphQL', 'BlockResolver.startPoolingAnalytics', e);
    } finally {
      await sleep(7_000);
      this.startPoolingAnalytics({ chainId, baseAssetId });
    }
  };

  async block(_: Source, { id, height }: Params['block']) {
    logger.debug('GraphQL', 'BlockResolver.block');
    if (!id && !height) {
      throw new Error('Either id or height must be provided');
    }

    if (id) {
      const blockDAO = new BlockDAO();
      const block = await blockDAO.getByHash(id);
      return block?.toGQLNode();
    }

    if (!height) throw new Error();
    const blockDAO = new BlockDAO();
    const block = await blockDAO.getByHeight(Number.parseInt(height));
    return block?.toGQLNode();
  }

  async blocks(_: Source, params: Params['blocks']) {
    logger.debug('GraphQL', 'BlockResolver.blocks');
    if (!params.first && !params.last) {
      throw new GraphQLError('Either first or last must be provided');
    }
    const blockDAO = new BlockDAO();
    const blocks = await blockDAO.getPaginatedBlocks(
      new PaginatedParams(params),
    );
    return blocks;
  }

  async getBlocksDashboard(
    _: Source,
    _params: Params['getBlocksDashboard'],
    context: GraphQLContext,
  ) {
    // If background data is available, return it (fast path)
    if (this.getBlocksDashboardData) {
      return this.getBlocksDashboardData;
    }

    const chainId = context.chain?.chainId;
    const baseAssetId = context.chain?.data.consensusParameters.baseAssetId;

    // Fallback: compute on-demand if background process hasn't run yet
    logger.debug('GraphQL', 'BlockResolver.getBlocksDashboard - FALLBACK');
    return this._getBlocksDashboard(_, _params, {
      chainId: Number.parseInt(chainId || '0'),
      baseAssetId,
    });
  }

  async _getBlocksDashboard(
    _: Source,
    _params: Params['getBlocksDashboard'],
    { chainId, baseAssetId }: { chainId?: number; baseAssetId?: string },
  ) {
    logger.debug('GraphQL', 'BlockResolver.getBlocksDashboard');
    const assetGateway = new AssetGateway();
    const baseAsset = await assetGateway.getAsset(
      baseAssetId || '',
      chainId || 0,
    );
    const blockDAO = new BlockDAO();
    const blocks = await blockDAO.getBlocksDashboard();
    for (const block of blocks.nodes) {
      block.totalFeeInUsd = baseAsset?.rate
        ? convertToUsd(
            String(block.totalFee),
            baseAsset.decimals,
            baseAsset.rate,
          )?.formatted
        : '';
      block.gasUsedInUsd = baseAsset?.rate
        ? convertToUsd(
            String(block.gasUsed),
            baseAsset.decimals,
            baseAsset.rate,
          )?.formatted
        : '';
    }
    return blocks;
  }

  async tps(_: Source, _params: Params['tps']) {
    // If background data is available, return it (fast path)
    if (this.tpsData) {
      return this.tpsData;
    }

    // Fallback: compute on-demand if background process hasn't run yet
    logger.debug('GraphQL', 'BlockResolver.tps - FALLBACK');
    return this._tps(_, _params);
  }

  async _tps(_: Source, _params: Params['tps']) {
    logger.debug('GraphQL', 'BlockResolver.tps');
    const cachedTps = DataCache.getInstance().get('tps');
    if (cachedTps) return cachedTps;
    const blockDAO = new BlockDAO();
    const tps = await blockDAO.tps();
    DataCache.getInstance().save('tps', 60000, tps);
    return tps;
  }

  async statistics(_: Source, __: any, context: GraphQLContext) {
    // If background data is available, return it (fast path)
    if (this.statisticsData) {
      return this.statisticsData;
    }

    const chainId = context.chain?.chainId;
    const baseAssetId = context.chain?.data.consensusParameters.baseAssetId;

    // Fallback: compute on-demand if background process hasn't run yet
    logger.debug('GraphQL', 'BlockResolver.statistics - FALLBACK');
    return this._statistics(_, __, {
      chainId: Number.parseInt(chainId || '0'),
      baseAssetId,
    });
  }

  async _statistics(
    _: Source,
    __: any,
    { chainId, baseAssetId }: { chainId?: number; baseAssetId?: string },
  ) {
    logger.debug('GraphQL', 'BlockResolver.statistics');
    const assetGateway = new AssetGateway();
    const baseAsset = await assetGateway.getAsset(
      baseAssetId || '',
      chainId || 0,
    );
    const cachedTps = DataCache.getInstance().get('statistics');
    if (cachedTps) return cachedTps;
    const blockDAO = new BlockDAO();

    // Parallel execution of all database queries
    const [
      totalTps,
      averageTps,
      maxTps,
      totalGasUsed,
      averageGasUsed,
      maxGasUsed,
      totalFee,
    ] = await Promise.all([
      blockDAO.getTotalTps(),
      blockDAO.getAverageTps(),
      blockDAO.getMaxTps(),
      blockDAO.getTotalGasUsed(),
      blockDAO.getAverageGasUsed(),
      blockDAO.getMaxGasUsed(),
      blockDAO.getTotalFee() as any,
    ]);

    let totalFee24hrs = 0;
    for (const fee of totalFee) {
      totalFee24hrs += Number(fee.value);
      fee.valueInUsd = baseAsset?.rate
        ? convertToUsd(String(fee.value), baseAsset.decimals, baseAsset.rate)
            ?.formatted
        : null;
    }

    const totalFee24hrsInUsd = baseAsset?.rate
      ? convertToUsd(String(totalFee24hrs), baseAsset.decimals, baseAsset.rate)
          ?.formatted
      : null;

    const statistics = {
      nodes: {
        totalTps,
        averageTps,
        maxTps,
        totalGasUsed,
        averageGasUsed,
        maxGasUsed,
        totalFee,
        totalFee24hrs: totalFee24hrsInUsd,
      },
    };
    DataCache.getInstance().save('statistics', 60000, statistics);
    return statistics;
  }
}
