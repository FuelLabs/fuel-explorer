import { RetryAfterError } from 'inngest';
import { SyncAllBlocks } from '~/application/uc/SyncAllBlocks';
import { SyncMissingBlocks } from '~/application/uc/SyncMissingBlocks';
import { SyncTransactions } from '~/application/uc/SyncTransactions';
import { inngest } from './InngestClient';

export const inngestFunctions = [
  inngest
    .client()
    .createFunction(
      { id: 'sync:blocks', concurrency: 500 },
      { event: 'sync/sync:blocks' },
      async ({ event: { data }, attempt }) => {
        try {
          console.log(`Syncing block page ${data.page}`);
          const syncAllBlocks = new SyncAllBlocks();
          await syncAllBlocks.execute(data);
        } catch (error) {
          console.error(error);
          throw new RetryAfterError(`Sync block attempt ${attempt}`, '1s');
        }
      },
    ),
  inngest
    .client()
    .createFunction(
      { id: 'sync:missing' },
      { event: 'sync/sync:missing', concurrency: 500 },
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
    ),
  inngest
    .client()
    .createFunction(
      { id: 'sync:transactions' },
      { event: 'sync/sync:transactions', concurrency: 500 },
      async ({ attempt, event: { data: block } }) => {
        try {
          console.log(`Syncing transactions for block ${block.blockId}`);
          const syncTransactions = new SyncTransactions();
          await syncTransactions.execute(block);
        } catch (error) {
          console.error(error);
          throw new RetryAfterError(
            `Sync transactions attempt ${attempt}`,
            '1s',
          );
        }
      },
    ),
];
