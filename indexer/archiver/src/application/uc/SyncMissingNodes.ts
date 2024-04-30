import { BlockRepository } from '@fuel-indexer/core';
import { QueueNames, queue } from '~/queue';

export class SyncMissingNodes {
  async execute() {
    const repo = new BlockRepository();
    const latest = await repo.findLatestAdded();
    const after = latest ? Number(latest.data.header.height) : undefined;

    await queue.push(QueueNames.SYNC_NODES, {
      after,
      first: 10,
    });
  }
}

export const syncMissingNodes = async () => {
  try {
    console.log('Syncing missing blocks');
    const sync = new SyncMissingNodes();
    await sync.execute();
  } catch (error) {
    console.error(error);
    throw new Error('Sync missing', {
      cause: error,
    });
  }
};
