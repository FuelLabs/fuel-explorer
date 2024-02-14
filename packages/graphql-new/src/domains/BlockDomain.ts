import { Context } from '../core/GraphQLServer';
import { PaginatorParams } from '../core/Paginator';
import { BlockRepository } from '../repositories/BlockRepository';

export class BlockDomain {
  createResolvers() {
    return {
      Query: {
        blocks: this.blocks,
      },
    };
  }

  async blocks(_ctx: Context, params: PaginatorParams) {
    const repository = new BlockRepository();
    return repository.findMany(params);
  }
}
