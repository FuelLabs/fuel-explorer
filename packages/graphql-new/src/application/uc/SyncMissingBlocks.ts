import { RetryAfterError } from 'inngest';
import { BlockRepository } from '~/domain/Block/BlockRepository';
import { inngest } from '~/infra/inngest/InngestClient';

export class SyncMissingBlocks {
  async execute() {
    const repo = new BlockRepository();
    const latest = await repo.findLatestAdded();
    const id = latest?.data.header.height ?? null;
    if (!id) {
      throw new Error('No blocks found');
    }

    const page = Math.ceil(Number(id) / 1000);
    await inngest.syncBlocks(page);
  }
}

export const syncMissingBlocks = inngest
  .client()
  .createFunction(
    { id: 'sync:missing' },
    { event: 'indexer/sync:missing', concurrency: 500 },
    async ({ attempt }) => {
      try {
        console.log('Syncing missing blocks');
        const syncMissingBlocks = new SyncMissingBlocks();
        await syncMissingBlocks.execute();
      } catch (error) {
        console.error(error);
        throw new RetryAfterError(`Sync missing attempt ${attempt}`, '1s');
      }
    },
  );
