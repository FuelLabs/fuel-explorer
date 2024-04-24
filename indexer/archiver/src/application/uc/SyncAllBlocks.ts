import { BlockRepository, type QueueData } from '@fuel-indexer/core';
import { type QueueInputs, QueueNames, queue } from '~/queue';

type Props = QueueInputs[QueueNames.SYNC_BLOCKS];

export class SyncAllBlocks {
  async execute({ first = 10, after = undefined, checkNext = true }: Props) {
    const repo = new BlockRepository();
    const { blocks, endCursor } = await repo.blocksFromNode(first, after);
    const hasBlocks = blocks.length > 0;

    if (hasBlocks) {
      await repo.insertMany(blocks);
    }
    if (checkNext) {
      // If current page don't have blocks, we keep trying the same page
      // until we have blocks after the final cursor
      const cursor = !hasBlocks ? after : endCursor;
      await this.syncNext(first, cursor);
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
