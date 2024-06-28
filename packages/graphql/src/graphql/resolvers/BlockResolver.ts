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
    if (!id && !height) {
      throw new Error('Either id or height must be provided');
    }

    const blockRepository = new BlockRepository(conn);
    if (id) {
      const item = await blockRepository.findByHash(id);
      return item?.toGQLNode() ?? null;
    }

    const item = await blockRepository.findByHeight(Number(height));
    return item?.toGQLNode() ?? null;
  }

  async blocks(_: Source, params: Params['blocks'], { conn }: GraphQLContext) {
    const paginator = new Paginator(BlocksTable, params, conn);
    const blockRepository = new BlockRepository(conn);
    const blocks = await blockRepository.findMany(paginator);
    const startCursor = paginator.getStartCursor(blocks);
    const endCursor = paginator.getEndCursor(blocks);
    return paginator.createPaginatedResult(
      blocks,
      startCursor,
      endCursor,
      (item) => item.toGQLNode(),
    );
  }
}
