import { BlockRepository } from '~/domain/Block/BlockRepository';
import { QueueNames, queue } from '~/infra/queue';

export class SyncMissingBlocks {
  async execute() {
    const repo = new BlockRepository();
    const latest = await repo.findLatestAdded();
    const id = latest?._id.value();
    const page = id ? Math.ceil(Number(id) / 1000) : 1;

    await queue.push(QueueNames.SYNC_BLOCKS, { page, perPage: 100 });
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
