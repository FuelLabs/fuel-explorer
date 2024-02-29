import { RetryAfterError } from 'inngest';
import { inngest } from '~/infra/inngest/InngestClient';

export const SyncBlocksEvent = inngest
  .client()
  .createFunction(
    { id: 'sync:blocks', concurrency: 500 },
    { event: 'sync/sync:blocks' },
    async ({ event: { data }, attempt }) => {
      try {
        console.log(`Syncing block page ${data.page}`);
        // await Sync.syncBlocks(data.page);
      } catch (error) {
        console.error(error);
        throw new RetryAfterError(`Sync block attempt ${attempt}`, '1s');
      }
    },
  );
