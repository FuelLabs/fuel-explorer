import dotenv from 'dotenv';
import { EventSchemas, type GetEvents, Inngest } from 'inngest';
import { env } from '~/config';
import { GQLBlock } from '~/graphql/generated/sdk';

dotenv.config();

export enum InngestEvents {
  SYNC_BLOCKS = 'indexer/sync:blocks',
  SYNC_MISSING = 'indexer/sync:missing',
  SYNC_TRANSACTION = 'indexer/sync:transaction',
}

export type InngestInputs = {
  [InngestEvents.SYNC_BLOCKS]: {
    after?: number;
    first: number;
    checkNext?: boolean;
  };
  [InngestEvents.SYNC_MISSING]: undefined;
  [InngestEvents.SYNC_TRANSACTION]: {
    index: number;
    block: GQLBlock;
    txHash: string;
  };
};

const schemas = new EventSchemas().fromRecord<{
  [InngestEvents.SYNC_BLOCKS]: {
    data: InngestInputs[InngestEvents.SYNC_BLOCKS];
  };
  [InngestEvents.SYNC_MISSING]: {
    data: InngestInputs[InngestEvents.SYNC_MISSING];
  };
  [InngestEvents.SYNC_TRANSACTION]: {
    data: InngestInputs[InngestEvents.SYNC_TRANSACTION];
  };
}>();

const client = new Inngest({
  schemas,
  id: 'fuel-indexer',
  eventKey: env.get('INNGEST_EVENT_KEY'),
});

export type Events = GetEvents<typeof client>;
export class InngestClient {
  _client = client;

  client() {
    return client;
  }

  async syncBlocks(data: InngestInputs[InngestEvents.SYNC_BLOCKS]) {
    await client.send({
      name: InngestEvents.SYNC_BLOCKS,
      data,
    });
  }

  async syncMissing() {
    await client.send({
      name: InngestEvents.SYNC_MISSING,
      data: undefined,
    });
  }

  async syncTransaction(block: InngestInputs[InngestEvents.SYNC_TRANSACTION]) {
    await client.send({
      name: InngestEvents.SYNC_TRANSACTION,
      data: block,
    });
  }
}

export const inngest = new InngestClient();
