import { Paginator } from '~/core/Paginator';
import { ResolverAdapter } from '~/core/Resolver';
import { BlocksTable } from '~/domain/Block/BlockModel';
import { BlockRepository } from '~/domain/Block/BlockRepository';
import {
  GQLBlock,
  GQLQueryBlockArgs,
  GQLQueryBlocksArgs,
} from '~/graphql/generated/sdk';

type Source = GQLBlock;
type Params = {
  blocks: GQLQueryBlocksArgs;
  block: GQLQueryBlockArgs;
};

class BlockResolver extends ResolverAdapter<Source> {
  private constructor(
    private readonly blockRepository = new BlockRepository(),
  ) {
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

  async block(_: Source, { id, height }: Params['block']) {
    if (!id && !height) {
      throw new Error('Either id or height must be provided');
    }

    if (id) {
      const item = await this.blockRepository.findById(id);
      return item?.toGQLNode();
    }

    const item = await this.blockRepository.findByHeight(Number(height));
    return item?.toGQLNode();
  }

  async blocks(_: Source, params: Params['blocks']) {
    const paginator = new Paginator(BlocksTable, params);
    const blocks = await this.blockRepository.findMany(params);
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

export default BlockResolver.create();
