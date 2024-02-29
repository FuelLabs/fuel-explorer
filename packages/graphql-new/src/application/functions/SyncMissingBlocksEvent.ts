import { RetryAfterError } from 'inngest';
import { inngest } from '~/infra/inngest/InngestClient';

export const SyncMissingBlocksEvent = inngest
  .client()
  .createFunction(
    { id: 'sync:missing' },
    { event: 'sync/sync:missing', concurrency: 500 },
    async ({ attempt }) => {
      try {
        console.log('Syncing missing blocks');
        // await Sync.syncMissingBlocks();
      } catch (error) {
        console.error(error);
        throw new RetryAfterError(`Sync missing attempt ${attempt}`, '1s');
      }
    },
  );
