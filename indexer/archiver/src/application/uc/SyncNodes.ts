import { BlockRepository, type QueueData } from '@fuel-indexer/core';
import { type QueueInputs, QueueNames, queue } from '~/queue';

type Props = QueueInputs[QueueNames.SYNC_NODES];

export class SyncNodes {
  async fetchRanges({ offset = 10, cursor = 0 }: Props) {
    const blockRepo = new BlockRepository();
    const lastBlock = await blockRepo.latestBlockFromNode();
    const lastBlockHeight = Number(lastBlock?.header.height ?? '0');

    const pages = Math.ceil(lastBlockHeight / offset);
    const events = Array.from({ length: pages }).map(async (_, i) => {
      if (i < cursor) return;
      const from = i === 0 ? 0 : i * offset;
      await queue.push(QueueNames.SYNC_NODES, { offset, from });
    });

    await Promise.all(events);
  }

  async execute({ from, offset = 10 }: Props) {
    const blockRepo = new BlockRepository();
    const { blocks } = await blockRepo.blocksFromNode(offset, from);
    const events = blocks.map(async (block) => {
      console.log(`Syncing block ${block.header.height}`);
      await queue.push(QueueNames.SYNC_NODE, { block });
    });

    await Promise.all(events);
  }
}

export const syncNodes = async ({ data }: QueueData<Props>) => {
  try {
    const sync = new SyncNodes();

    if (data.from) {
      await sync.execute(data);
      return;
    }

    await sync.fetchRanges(data);
  } catch (error) {
    console.error(error);
    throw new Error('Sync block attempt failed!', {
      cause: error,
    });
  }
};
