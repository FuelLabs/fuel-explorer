import dotenv from 'dotenv';
import {
  EventSchemas,
  type GetEvents,
  Inngest,
  RetryAfterError,
} from 'inngest';
import { serve } from 'inngest/express';
import { env } from '~/config';
import { CreatedBlock } from '~/entities/blocks/BlockDomain';
import { SyncDomain } from '~/entities/sync/SyncDomain';
import { TransactionDomain } from '~/entities/transactions/TransactionDomain';

dotenv.config();

const schemas = new EventSchemas().fromRecord<{
  'sync/sync:blocks': {
    data: {
      page: number;
      perPage: number;
    };
  };
  'sync/sync:missing': {
    data: undefined;
  };
  'sync/sync:transactions': {
    data: CreatedBlock;
  };
}>();

const client = new Inngest({
  schemas,
  id: 'fuel-indexer',
  eventKey: env.get('INNGEST_EVENT_KEY'),
});

export type Events = GetEvents<typeof client>;

const functions = [
  client.createFunction(
    { id: 'sync:blocks', concurrency: 500 },
    { event: 'sync/sync:blocks' },
    async ({ event: { data }, attempt }) => {
      try {
        console.log(`Syncing block page ${data.page}`);
        await SyncDomain.syncBlocks(data.page);
      } catch (error) {
        console.error(error);
        throw new RetryAfterError(`Sync block attempt ${attempt}`, '1s');
      }
    },
  ),

  client.createFunction(
    { id: 'sync:missing' },
    { event: 'sync/sync:missing', concurrency: 500 },
    async ({ attempt }) => {
      try {
        console.log('Syncing missing blocks');
        await SyncDomain.syncMissingBlocks();
      } catch (error) {
        console.error(error);
        throw new RetryAfterError(`Sync missing attempt ${attempt}`, '1s');
      }
    },
  ),

  client.createFunction(
    { id: 'sync:transactions' },
    { event: 'sync/sync:transactions', concurrency: 500 },
    async ({ attempt, event: { data } }) => {
      try {
        console.log(`Syncing transactions for block ${data.blockId}`);
        await TransactionDomain.syncTransactions(data.block, data.blockId);
      } catch (error) {
        console.error(error);
        throw new RetryAfterError(`Sync transactions attempt ${attempt}`, '1s');
      }
    },
  ),
];

export class InngestClient {
  setup() {
    return serve({
      client: client,
      functions,
    });
  }

  async syncBlocks(page = 1, perPage = 1000) {
    await client.send({
      name: 'sync/sync:blocks',
      data: { page, perPage },
    });
  }

  async syncMissing() {
    await client.send({
      name: 'sync/sync:missing',
      data: undefined,
    });
  }

  async syncTransactions(block: CreatedBlock) {
    await client.send({
      name: 'sync/sync:transactions',
      data: block,
    });
  }
}

export const inngest = new InngestClient();
