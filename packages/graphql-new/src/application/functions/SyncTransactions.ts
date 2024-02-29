import { RetryAfterError } from 'inngest';
import { inngest } from '~/infra/inngest/InngestClient';

export const SyncTransactions = inngest
  .client()
  .createFunction(
    { id: 'sync:transactions' },
    { event: 'sync/sync:transactions', concurrency: 500 },
    async ({ attempt, event: { data } }) => {
      try {
        console.log(`Syncing transactions for block ${data.blockId}`);
        // await Sync.syncTransactions(data.block, data.blockId);
      } catch (error) {
        console.error(error);
        throw new RetryAfterError(`Sync transactions attempt ${attempt}`, '1s');
      }
    },
  );
