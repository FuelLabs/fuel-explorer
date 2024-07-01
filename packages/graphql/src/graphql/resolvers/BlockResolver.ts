import { logger } from '~/core/Logger';
import { Paginator } from '~/core/Paginator';
import { BlocksTable } from '~/domain/Block/BlockModel';
import type {
  GQLBlock,
  GQLQueryBlockArgs,
  GQLQueryBlocksArgs,
} from '~/graphql/generated/sdk-provider';
import type { GraphQLContext } from '../GraphQLContext';

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

  async block(
    _: Source,
    { id, height }: Params['block'],
    { repositories }: GraphQLContext,
  ) {
    logger.debugRequest('BlockResolver.block', { id, height });
    if (!id && !height) {
      throw new Error('Either id or height must be provided');
    }

    if (id) {
      logger.debug('Finding block by hash');
      const item = await repositories.block.findByHash(id);
      const response = item?.toGQLNode() ?? null;
      logger.debugDone('BlockResolver.block', { response });
      return response;
    }

    logger.debug('Finding block by height');
    const item = await repositories.block.findByHeight(Number(height));
    const response = item?.toGQLNode() ?? null;
    logger.debugDone('BlockResolver.block', { response });
    return response;
  }

  async blocks(
    _: Source,
    params: Params['blocks'],
    { repositories, conn }: GraphQLContext,
  ) {
    logger.debugRequest('BlockResolver.blocks', { params });
    const paginator = new Paginator(BlocksTable, params, conn);
    const blocks = await repositories.block.findMany(paginator);
    logger.debugResponse('BlockResolver.blocks', { blocks });
    const startCursor = paginator.getStartCursor(blocks);
    const endCursor = paginator.getEndCursor(blocks);
    const result = await paginator.createPaginatedResult(
      blocks,
      startCursor,
      endCursor,
      (item) => ({ ...item.toGQLNode(), cursor: item.cursor }),
    );
    logger.debugDone('BlockResolver.blocks', { result });
    return result;
  }
}
