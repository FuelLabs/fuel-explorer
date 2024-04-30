import { NodeRepository } from '@core/domain/Node/NodeRepository';
import { BlockRepository, type QueueData } from '@fuel-indexer/core';
import { type QueueInputs, QueueNames, queue } from '~/queue';

type Props = QueueInputs[QueueNames.SYNC_NODES];

export class SyncNodes {
  async execute({ first = 10, after = undefined, checkNext = true }: Props) {
    const nodeRepo = new NodeRepository();
    const blockRepo = new BlockRepository();
    const { blocks, endCursor } = await blockRepo.blocksFromNode(first, after);
    const hasBlocks = blocks.length > 0;

    if (hasBlocks) {
      await nodeRepo.upsertMany(blocks, 'Block');
    }
    if (checkNext) {
      // If current page don't have blocks, we keep trying the same page
      // until we have blocks after the final cursor
      const cursor = !hasBlocks ? after : endCursor;
      await this.syncNext(first, cursor);
    }
  }

  private async syncNext(first: number, after?: number) {
    console.log(`Syncing next block after cursor ${after}`);
    await queue.push(QueueNames.SYNC_NODES, {
      first,
      after,
    });
  }
}

export const syncNodes = async ({ data }: QueueData<Props>) => {
  try {
    console.log(`Syncing block after cursor ${data.after}`);
    const sync = new SyncNodes();
    await sync.execute(data);
  } catch (error) {
    console.error(error);
    throw new Error('Sync block attempt failed!', {
      cause: error,
    });
  }
};
