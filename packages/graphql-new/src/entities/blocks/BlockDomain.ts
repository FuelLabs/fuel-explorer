import { GQLBlock } from '~/generated/types';
import { PaginatorParams } from '~/helpers/Paginator';
import { PromiseHelper } from '~/helpers/Promise';
import { GraphQLContext } from '~/infra/graphql/GraphQLServer';
import { inngest } from '~/infra/inngest/Inngest';
import { BlockRepository } from './BlockRepository';

export type CreatedBlock = {
  blockId: number;
  block: GQLBlock;
};

export class BlockDomain {
  async syncBlocks(page: number, perPage: number) {
    const repository = new BlockRepository();
    const { blocks, hasNext } = await repository.blocksFromNode(page, perPage);
    const created = await repository.insertMany(blocks);

    await PromiseHelper.executeInQueue(created, async (block) => {
      await inngest.syncTransactions(block);
    });

    return { blocks, hasNext };
  }

  createResolvers() {
    return {
      Query: {
        blocks: this.blocks,
      },
    };
  }

  async blocks(_ctx: GraphQLContext, params: PaginatorParams) {
    const repository = new BlockRepository();
    return repository.findMany(params);
  }
}
