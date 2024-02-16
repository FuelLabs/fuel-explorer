import dotenv from 'dotenv';
import { EventSchemas, type GetEvents, Inngest } from 'inngest';
import { serve } from 'inngest/express';
import { CreatedBlock } from '../domains/BlockDomain';
import { SyncDomain } from '../domains/SyncDomain';
import { TransactionDomain } from '../domains/TransactionDomain';

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

const client = new Inngest({ id: 'fuel-indexer', schemas });
export type Events = GetEvents<typeof client>;

const functions = [
  client.createFunction(
    { id: 'sync:blocks', concurrency: 100 },
    { event: 'sync/sync:blocks' },
    async ({ event: { data } }) => {
      console.log(`Syncing block page ${data.page}`);
      const sync = new SyncDomain();
      await sync.syncBlocks(data.page);
    },
  ),

  client.createFunction(
    { id: 'sync:missing' },
    { event: 'sync/sync:missing' },
    async () => {
      console.log('Syncing missing blocks');
      const sync = new SyncDomain();
      await sync.syncMissingBlocks();
    },
  ),

  client.createFunction(
    { id: 'sync:transactions' },
    { event: 'sync/sync:transactions', concurrency: 10 },
    async ({ event: { data } }) => {
      console.log(`Syncing transactions for block ${data.blockId}`);
      const domain = new TransactionDomain();
      await domain.syncTransactions(data.block, data.blockId);
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
