import { GQLBlock } from '~/generated/types';
import { inngest } from '~/infra/inngest/Inngest';
import { BlockRepository } from '../blocks/BlockRepository';
import { TransactionRepository } from '../transactions/TransactionRepository';

export class SyncDomain {
  static async syncBlocks(page = 1, perPage = 1000) {
    const repository = new BlockRepository();
    const { blocks, hasNext } = await repository.blocksFromNode(page, perPage);
    const created = await repository.insertMany(blocks);

    await Promise.all(
      created.map((block) => {
        if (!block) return;
        return inngest.syncTransactions(block);
      }),
    );

    if (hasNext) {
      await inngest.syncBlocks(page + 1, perPage);
    }
  }

  static async syncMissingBlocks() {
    const blockRepository = new BlockRepository();
    const latest = await blockRepository.findLatestAdded();
    const id = latest?.data.header.height ?? null;
    if (!id) {
      throw new Error('No blocks found');
    }

    const page = Math.ceil(Number(id) / 1000);
    await SyncDomain.syncBlocks(page);
  }

  static async syncTransactions(block: GQLBlock, blockId: number) {
    const repository = new TransactionRepository();
    await repository.insertMany(block.transactions, blockId);
  }
}
