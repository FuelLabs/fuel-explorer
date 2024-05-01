import { uniqBy } from 'lodash';
import type { BlockEntity } from '~/domain/Block/BlockEntity';
import { BlockRepository } from '~/domain/Block/BlockRepository';
import {
  type QueueData,
  type QueueInputs,
  QueueNames,
  queue,
} from '~/infra/queue/Queue';

type Props = QueueInputs[QueueNames.SYNC_BLOCKS];

export class SyncBlocks {
  private limit = 1000;

  async execute({ offset = 10, cursor = 0 }: Props) {
    const repo = new BlockRepository();
    const lastBlock = await repo.latestBlockFromNode();
    const lastBlockHeight = Number(lastBlock?.header.height ?? '0');
    const max = Math.ceil(lastBlockHeight / offset);
    const pages = max > this.limit ? this.limit : max;

    const events = Array.from({ length: pages }).map(async (_, page) => {
      const from = cursor + page * offset;
      console.log(`Syncing blocks from ${from} to ${from + offset}`);
      const { blocks, endCursor } = await repo.blocksFromNode(offset, from);
      const hasBlocks = blocks.length > 0;
      const created = await repo.insertMany(blocks);
      await this.syncTransactions(created);
      return { endCursor, hasBlocks };
    });

    const results = await Promise.all(events);
    return results[results.length - 1];
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
}

export const syncBlocks = async ({ data }: QueueData<Props>) => {
  try {
    const sync = new SyncBlocks();
    const { endCursor, hasBlocks } = await sync.execute(data);
    const cursor = !hasBlocks ? data.cursor : endCursor;
    await queue.pushSingleton(QueueNames.SYNC_BLOCKS, { ...data, cursor });
  } catch (error) {
    console.error(error);
    throw new Error('Sync block attempt failed!', {
      cause: error,
    });
  }
};
