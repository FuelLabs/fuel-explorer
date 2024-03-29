import { uniqBy } from 'lodash';
import { BlockEntity } from '~/domain/Block/BlockEntity';
import { BlockRepository } from '~/domain/Block/BlockRepository';
import { QueueData, QueueInputs, QueueNames, queue } from '~/infra/queue';

type Props = QueueInputs[QueueNames.SYNC_BLOCKS];

export class SyncAllBlocks {
  async execute({ page = 1, perPage = 100, checkNext = true }: Props) {
    const repo = new BlockRepository();
    const { blocks, hasNext } = await repo.blocksFromNode(page, perPage);
    const created = await repo.insertMany(blocks);
    await this.syncTransactions(created);

    if (checkNext) {
      await this.syncNextOrDone(hasNext, page, perPage);
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

  private async syncNextOrDone(
    hasNext: boolean,
    page: number,
    perPage: number,
  ) {
    await queue.push(QueueNames.SYNC_BLOCKS, {
      page: hasNext ? page + 1 : page,
      perPage,
    });
  }
}

export const syncAllBlocks = async ({ data }: QueueData<Props>) => {
  try {
    console.log(`Syncing block page ${data.page}`);
    const syncAllBlocks = new SyncAllBlocks();
    await syncAllBlocks.execute(data);
  } catch (error) {
    throw new Error('Sync block attempt failed!', {
      cause: error,
    });
  }
};
