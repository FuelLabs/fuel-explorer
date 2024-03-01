import { Paginator, type PaginatorParams } from '~/core/Paginator';
import { ResolverAdapter } from '~/core/Resolver';
import { BlocksTable } from '~/domain/Block/BlockModel';
import { BlockRepository } from '~/domain/Block/BlockRepository';
import { GQLBlock } from '~/generated/types';

type Source = GQLBlock;
type Params = {
  blocks: PaginatorParams;
};

export class BlockResolver extends ResolverAdapter<Source> {
  constructor(private readonly blockRepository = new BlockRepository()) {
    super();
    this.setResolvers({
      blocks: this.blocks.bind(this),
    });
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
