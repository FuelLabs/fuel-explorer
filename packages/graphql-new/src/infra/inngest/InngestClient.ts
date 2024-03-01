import dotenv from 'dotenv';
import { EventSchemas, type GetEvents, Inngest } from 'inngest';
import { env } from '~/config';
import { GQLBlock, GQLContract, GQLInput, GQLOutput } from '~/generated/types';

dotenv.config();

const schemas = new EventSchemas().fromRecord<{
  'indexer/sync:blocks': {
    data: {
      page: number;
      perPage: number;
    };
  };
  'indexer/sync:missing': {
    data: undefined;
  };
  'indexer/sync:transactions': {
    data: {
      block: GQLBlock;
      blockId: number;
    };
  };
  'indexer/sync:inputs': {
    data: {
      inputs: GQLInput[];
      transactionId: number;
    };
  };
  'indexer/sync:outputs': {
    data: {
      outputs: GQLOutput[];
      transactionId: number;
    };
  };
  'indexer/sync:contract': {
    data: {
      contract: GQLContract;
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
      name: 'indexer/sync:blocks',
      data: { page, perPage },
    });
  }

  async syncMissing() {
    await client.send({
      name: 'indexer/sync:missing',
      data: undefined,
    });
  }

  async syncTransactions(block: { block: GQLBlock; blockId: number }) {
    await client.send({
      name: 'indexer/sync:transactions',
      data: block,
    });
  }

  async syncInputs(inputs: { inputs: GQLInput[]; transactionId: number }) {
    await client.send({
      name: 'indexer/sync:inputs',
      data: inputs,
    });
  }

  async syncOutputs(outputs: { outputs: GQLOutput[]; transactionId: number }) {
    await client.send({
      name: 'indexer/sync:outputs',
      data: outputs,
    });
  }

  async syncContract(contract: { contract: GQLContract }) {
    await client.send({
      name: 'indexer/sync:contract',
      data: contract,
    });
  }
}

export const inngest = new InngestClient();
