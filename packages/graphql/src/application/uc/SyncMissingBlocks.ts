import { BlockRepository } from '~/domain/Block/BlockRepository';
import { QueueNames, queue } from '~/infra/queue/Queue';

export class SyncMissingBlocks {
  async execute() {
    const repo = new BlockRepository();
    const latest = await repo.findLatestAdded();
    const after = latest ? Number(latest.data.header.height) : undefined;

    await queue.push(QueueNames.SYNC_BLOCKS, { after, first: 10 });
  }
}

export const syncMissingBlocks = async () => {
  try {
    console.log('Syncing missing blocks');
    const syncMissingBlocks = new SyncMissingBlocks();
    await syncMissingBlocks.execute();
  } catch (error) {
    console.error(error);
    throw new Error('Sync missing', {
      cause: error,
    });
  }
};
