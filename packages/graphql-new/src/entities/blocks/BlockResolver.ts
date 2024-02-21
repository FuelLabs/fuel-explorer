import { GQLBlock } from '~/generated/types';
import { ResolverAdapter, ResolverInterface } from '~/shared/adapter/Resolver';
import { PaginatorParams } from '~/shared/service';
import { PaginatedResults } from '~/shared/service/Paginator';
import { BlockItem } from './BlockModel';
import { BlockRepository } from './BlockRepository';

type Source = GQLBlock;
type Params = {
  blocks: PaginatorParams;
};

export class BlockResolver implements ResolverInterface<Source> {
  private adapter: ResolverAdapter<Source> = new ResolverAdapter();

  constructor() {
    this.adapter.setResolvers({
      blocks: this.blocks.bind(this),
    });
  }

  getResolvers() {
    return this.adapter.getResolvers();
  }

  async blocks(_: Source, params: Params['blocks']) {
    const repository = new BlockRepository();
    const blocks = await repository.findMany(params);
    return this._parseMany(blocks);
  }

  private _parseMany(result: PaginatedResults<BlockItem>) {
    return {
      ...result,
      nodes: result.nodes.map((node) => ({
        ...node,
        ...node.data,
      })),
    };
  }
}
