import { GQLBlock } from '../generated/types';
import { BlockRepository } from '../repositories/BlockRepository';
import { TransactionRepository } from '../repositories/TransactionRepository';
import { executeInQueue } from '../utils/promise';

const NUM_PAGES = 1000;

export class BlockDomain {
  constructor(private blockRepository: BlockRepository) {}

  async syncAllBlocks() {
    await this._sync(1);
  }

  async syncMissingBlocks() {
    // const latestAddedBlock = await this.blockRepository.findLatestAdded();
    // const startPage = Math.ceil(latestAddedBlock._id / NUM_PAGES);
    // await this._sync(startPage);
  }

  async syncBlocksTransactions(blocks: { blockId: number; block: GQLBlock }[]) {
    const transactionRepository = new TransactionRepository();
    await executeInQueue(blocks, async ({ blockId, block }) => {
      console.log(`Syncing transactions for block ${blockId}`);
      await transactionRepository.insertMany(block.transactions, blockId);
    });
  }

  private async _sync(startPage: number) {
    const data = await this.blockRepository.findLatest();
    const latestBlockId = Number(data.pageInfo.endCursor ?? 1);
    const pages = Math.ceil(latestBlockId / NUM_PAGES);
    const iterationArray = Array.from({ length: pages }, (_, i) => i + 1);

    for (const page of iterationArray) {
      if (page < startPage) continue;
      const perPage = NUM_PAGES;
      console.log(`Fetching page ${page} of ${pages}`);
      const blocks = await this.blockRepository.fetchBlocks({ page, perPage });
      const blocksCreated = await this.blockRepository.insertMany(blocks);
      console.log(`Synced ${blocksCreated.length} blocks`);
      await this.syncBlocksTransactions(blocksCreated);
    }
  }
}
