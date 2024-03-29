import { uniqBy } from 'lodash';
import { BlockEntity } from '~/domain/Block/BlockEntity';
import { BlockRepository } from '~/domain/Block/BlockRepository';
import { QueueData, QueueInputs, QueueNames, queue } from '~/infra/queue';

type Props = QueueInputs[QueueNames.SYNC_BLOCKS];

export class SyncAllBlocks {
  async execute({ first = 10, after = undefined, checkNext = true }: Props) {
    const repo = new BlockRepository();
    const { blocks, endCursor } = await repo.blocksFromNode(first, after);
    const hasBlocks = blocks.length > 0;

    if (hasBlocks) {
      const created = await repo.insertMany(blocks);
      await this.syncTransactions(created);
    }
    if (checkNext) {
      // If current page don't have blocks, we keep trying the same page
      // until we have blocks after the final cursor
      const cursor = !hasBlocks ? after : endCursor;
      await this.syncNext(first, cursor);
    }
  }

  private async syncTransactions(blocks: (BlockEntity | null)[]) {
    const filtered = blocks.filter(Boolean) as BlockEntity[];
    const events = filtered.flatMap((block) => {
      const txs = uniqBy(block.data.transactions, 'id');
      return txs.map<QueueInputs[QueueNames.SYNC_TRANSACTION]>(
        (transaction, idx) => ({
          index: idx,
          block: block.data,
          txHash: transaction.id,
        }),
      );
    });

    if (events.length) {
      await queue.pushBatch(QueueNames.SYNC_TRANSACTION, events);
    }
  }

  private async syncNext(first: number, after?: number) {
    await queue.push(QueueNames.SYNC_BLOCKS, { first, after });
  }
}

export const syncAllBlocks = async ({ data }: QueueData<Props>) => {
  try {
    console.log(`Syncing block after cursor ${data.after}`);
    const syncAllBlocks = new SyncAllBlocks();
    await syncAllBlocks.execute(data);
  } catch (error) {
    throw new Error('Sync block attempt failed!', {
      cause: error,
    });
  }
};
