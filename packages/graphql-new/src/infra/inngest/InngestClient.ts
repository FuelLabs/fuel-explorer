import dotenv from 'dotenv';
import { EventSchemas, type GetEvents, Inngest } from 'inngest';
import { env } from '~/config';
import { PredicatePayload } from '~/domain/Predicate/PredicateModel';
import {
  GQLBlock,
  GQLContract,
  GQLInput,
  GQLOutput,
} from '~/graphql/generated/sdk';

dotenv.config();

export enum InngestEvents {
  SYNC_BLOCKS = 'indexer/sync:blocks',
  SYNC_MISSING = 'indexer/sync:missing',
  SYNC_TRANSACTIONS = 'indexer/sync:transactions',
  SYNC_INPUTS = 'indexer/sync:inputs',
  SYNC_OUTPUTS = 'indexer/sync:outputs',
  SYNC_CONTRACT = 'indexer/sync:contract',
  SYNC_CHAIN_INFO = 'indexer/sync:chain-info',
  SYNC_PREDICATE = 'indexer/sync:predicate',
}

const schemas = new EventSchemas().fromRecord<{
  [InngestEvents.SYNC_BLOCKS]: {
    data: {
      page: number;
      perPage: number;
    };
  };
  [InngestEvents.SYNC_MISSING]: {
    data: undefined;
  };
  [InngestEvents.SYNC_TRANSACTIONS]: {
    data: {
      block: GQLBlock;
      blockId: number;
    };
  };
  [InngestEvents.SYNC_INPUTS]: {
    data: {
      inputs: GQLInput[];
      transactionId: number;
    };
  };
  [InngestEvents.SYNC_OUTPUTS]: {
    data: {
      outputs: GQLOutput[];
      transactionId: number;
    };
  };
  [InngestEvents.SYNC_CONTRACT]: {
    data: {
      contract: GQLContract;
    };
  };
  [InngestEvents.SYNC_CHAIN_INFO]: {
    data: {};
  };
  [InngestEvents.SYNC_PREDICATE]: {
    data: PredicatePayload | undefined;
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

  async syncBlocks(page = 1, perPage = 1000) {
    await client.send({
      name: InngestEvents.SYNC_BLOCKS,
      data: { page, perPage },
    });
  }

  async syncMissing() {
    await client.send({
      name: InngestEvents.SYNC_MISSING,
      data: undefined,
    });
  }

  async syncTransactions(block: { block: GQLBlock; blockId: number }) {
    await client.send({
      name: InngestEvents.SYNC_TRANSACTIONS,
      data: block,
    });
  }

  async syncInputs(inputs: { inputs: GQLInput[]; transactionId: number }) {
    await client.send({
      name: InngestEvents.SYNC_INPUTS,
      data: inputs,
    });
  }

  async syncOutputs(outputs: { outputs: GQLOutput[]; transactionId: number }) {
    await client.send({
      name: InngestEvents.SYNC_OUTPUTS,
      data: outputs,
    });
  }

  async syncContract(contract: { contract: GQLContract }) {
    await client.send({
      name: InngestEvents.SYNC_CONTRACT,
      data: contract,
    });
  }

  async syncPredicate(predicate: { bytecode: string; address: string }) {
    await client.send({
      name: InngestEvents.SYNC_PREDICATE,
      data: predicate,
    });
  }
}

export const inngest = new InngestClient();
