import { GraphQLError } from 'graphql';
import { logger } from '~/core/Logger';
import type {
  GQLBlock,
  GQLQueryBlockArgs,
  GQLQueryBlocksArgs,
} from '~/graphql/generated/sdk-provider';
import BlockDAO from '~/infra/dao/BlockDAO';
import PaginatedParams from '~/infra/paginator/PaginatedParams';

type Source = GQLBlock;
type Params = {
  blocks: GQLQueryBlocksArgs;
  block: GQLQueryBlockArgs;
};

export class BlockResolver {
  static create() {
    const resolvers = new BlockResolver();
    return {
      Query: {
        block: resolvers.block,
        blocks: resolvers.blocks,
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
}
