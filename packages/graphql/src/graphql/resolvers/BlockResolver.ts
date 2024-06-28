import { logger } from '~/core/Logger';
import { Paginator } from '~/core/Paginator';
import { ResolverAdapter } from '~/core/Resolver';
import { BlocksTable } from '~/domain/Block/BlockModel';
import { BlockRepository } from '~/domain/Block/BlockRepository';
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

export class BlockResolver extends ResolverAdapter<Source> {
  private constructor() {
    super();
    this.setResolvers({
      Query: {
        block: this.block.bind(this),
        blocks: this.blocks.bind(this),
      },
    });
  }

  static create() {
    return new BlockResolver().getResolvers();
  }

  async block(
    _: Source,
    { id, height }: Params['block'],
    { conn }: GraphQLContext,
  ) {
    logger.debugRequest('BlockResolver.block', { id, height });
    if (!id && !height) {
      throw new Error('Either id or height must be provided');
    }

    const blockRepository = new BlockRepository(conn);
    if (id) {
      logger.debug('Finding block by hash');
      const item = await blockRepository.findByHash(id);
      const response = item?.toGQLNode() ?? null;
      logger.debugDone('BlockResolver.block', { response });
      return response;
    }

    logger.debug('Finding block by height');
    const item = await blockRepository.findByHeight(Number(height));
    const response = item?.toGQLNode() ?? null;
    logger.debugDone('BlockResolver.block', { response });
    return response;
  }

  async blocks(_: Source, params: Params['blocks'], { conn }: GraphQLContext) {
    logger.debugRequest('BlockResolver.blocks', { params });
    const paginator = new Paginator(BlocksTable, params, conn);
    const blockRepository = new BlockRepository(conn);
    const blocks = await blockRepository.findMany(paginator);
    logger.debugResponse('BlockResolver.blocks', { blocks });
    const startCursor = paginator.getStartCursor(blocks);
    const endCursor = paginator.getEndCursor(blocks);
    const result = paginator.createPaginatedResult(
      blocks,
      startCursor,
      endCursor,
      (item) => item.toGQLNode(),
    );
    logger.debugDone('BlockResolver.blocks', { result });
    return result;
  }
}
