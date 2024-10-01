import { GraphQLError } from 'graphql';
import { logger } from '~/core/Logger';
import type {
  GQLBlock,
  GQLQueryBlockArgs,
  GQLQueryBlockRewardStatisticsArgs,
  GQLQueryBlocksArgs,
  GQLQueryNewBlockStatisticsArgs,
} from '~/graphql/generated/sdk-provider';
import BlockDAO from '~/infra/dao/BlockDAO';
import PaginatedParams from '~/infra/paginator/PaginatedParams';

type Source = GQLBlock;
type Params = {
  blocks: GQLQueryBlocksArgs;
  block: GQLQueryBlockArgs;
  tps: null;
  getBlocksDashboard: null;
  newBlockStats: GQLQueryNewBlockStatisticsArgs;
  blockRewardStats: GQLQueryBlockRewardStatisticsArgs;
};

export class BlockResolver {
  static create() {
    const resolvers = new BlockResolver();
    return {
      Query: {
        block: resolvers.block,
        blocks: resolvers.blocks,
        tps: resolvers.tps,
        getBlocksDashboard: resolvers.getBlocksDashboard,
        newBlockStatistics: resolvers.getNewBlockStatistics,
        blockRewardStatistics: resolvers.getBlockRewardStatistics,
      },
    };
  }

  async block(_: Source, { id, height }: Params['block']) {
    logger.debug(`BlockResolver.block ${id} ${height}`);
    if (!id && !height) {
      throw new Error('Either id or height must be provided');
    }

    if (id) {
      logger.debug('Finding block by hash');
      const blockDAO = new BlockDAO();
      const block = await blockDAO.getByHash(id);
      return block?.toGQLNode();
    }

    logger.debug('Finding block by height');
    if (!height) throw new Error();
    const blockDAO = new BlockDAO();
    const block = await blockDAO.getByHeight(parseInt(height));
    return block?.toGQLNode();
  }

  async blocks(_: Source, params: Params['blocks']) {
    logger.debug('BlockResolver.blocks', params);
    if (!params.first && !params.last) {
      throw new GraphQLError('Either first or last must be provided');
    }
    const blockDAO = new BlockDAO();
    const blocks = await blockDAO.getPaginatedBlocks(
      new PaginatedParams(params),
    );
    return blocks;
  }

  async getBlocksDashboard(_: Source, _params: Params['getBlocksDashboard']) {
    const blockDAO = new BlockDAO();
    const blocks = await blockDAO.getBlocksDashboard();

    return blocks;
  }

  async tps(_: Source, _params: Params['tps']) {
    const blockDAO = new BlockDAO();
    const tps = await blockDAO.tps();

    return tps;
  }

  async getNewBlockStatistics(_: Source, _params: Params['newBlockStats']) {
    const blockDAO = new BlockDAO();
    const newBlockStats = await blockDAO.getNewBlockStatistics(
      _params.timeFilter ? _params.timeFilter : '',
    );

    return newBlockStats;
  }

  async getBlockRewardStatistics(
    _: Source,
    _params: Params['blockRewardStats'],
  ) {
    const blockDAO = new BlockDAO();
    const blockRewardStats = await blockDAO.getBlockRewardStatistics(
      _params.timeFilter ? _params.timeFilter : '',
    );

    return blockRewardStats;
  }
}
