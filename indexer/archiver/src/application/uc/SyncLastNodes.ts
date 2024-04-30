import { BlockRepository, type QueueData } from '@fuel-indexer/core';
import { type QueueInputs, QueueNames, queue } from '~/queue';

type Props = QueueInputs[QueueNames.SYNC_LAST];

export class SyncLastNodes {
  async execute({ last, offset = 10 }: Props) {
    const repo = new BlockRepository();
    const lastBlock = await repo.latestBlockFromNode();
    const lastBlockHeight = Number(lastBlock?.header.height ?? '0');
    const cursor = lastBlockHeight - last;

    const pages = Math.ceil(last / offset);
    const events = Array.from({ length: pages }).map(async (_, i) => {
      const from = cursor + i * offset;
      await queue.push(QueueNames.SYNC_NODES, { offset, from });
    });

    await Promise.all(events);
  }
}

export const syncLastNodes = async ({ data }: QueueData<Props>) => {
  console.log('Syncing last nodes');
  try {
    const sync = new SyncLastNodes();
    await sync.execute(data);
  } catch (error) {
    console.error(error);
    throw new Error('Sync last', {
      cause: error,
    });
  }
};
