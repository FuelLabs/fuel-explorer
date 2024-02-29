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
  constructor() {
    super();
    this.setResolvers({
      blocks: this.blocks.bind(this),
    });
  }

  async blocks(_: Source, params: Params['blocks']) {
    const repository = new BlockRepository();
    const paginator = new Paginator(BlocksTable, params);
    const blocks = await repository.findMany(params);
    return paginator.createPaginatedResult(blocks, (node) => node.toGQLNode());
  }
}
