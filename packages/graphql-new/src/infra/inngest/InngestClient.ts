import dotenv from 'dotenv';
import { EventSchemas, type GetEvents, Inngest } from 'inngest';
import { env } from '~/config';
import { GQLBlock } from '~/generated/types';

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
    data: {
      block: GQLBlock;
      blockId: number;
    };
  };
}>();

const client = new Inngest({
  schemas,
  id: 'fuel-indexer',
  eventKey: env.get('INNGEST_EVENT_KEY'),
});

export type Events = GetEvents<typeof client>;

export class InngestClient {
  client() {
    return client;
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

  async syncTransactions(block: { block: GQLBlock; blockId: number }) {
    await client.send({
      name: 'sync/sync:transactions',
      data: block,
    });
  }
}

export const inngest = new InngestClient();
