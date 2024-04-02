import PgBoss, { Job } from 'pg-boss';
import { syncAllBlocks } from '~/application/uc/SyncAllBlocks';
import { syncBridgeContractLogs } from '~/application/uc/SyncBridgeContractLogs';
import { syncMissingBlocks } from '~/application/uc/SyncMissingBlocks';
import { syncTransactions } from '~/application/uc/SyncTransaction';
import { env } from '~/config';
import { GQLBlock } from '~/graphql/generated/sdk';

const DB_HOST = env.get('DB_HOST');
const DB_PORT = env.get('DB_PORT');
const DB_USER = env.get('DB_USER');
const DB_PASS = env.get('DB_PASS');
const DB_NAME = env.get('DB_NAME');

export enum QueueNames {
  SYNC_BLOCKS = 'indexer/sync:blocks',
  SYNC_MISSING = 'indexer/sync:missing',
  SYNC_TRANSACTION = 'indexer/sync:transaction',
  SYNC_BRIDGE_CONTRACT_LOGS = 'indexer/bridge/sync:contract-logs',
}

export type QueueInputs = {
  [QueueNames.SYNC_BLOCKS]: {
    first: number;
    after?: number;
    checkNext?: boolean;
  };
  [QueueNames.SYNC_MISSING]: undefined;
  [QueueNames.SYNC_TRANSACTION]: {
    index: number;
    block: GQLBlock;
    txHash: string;
  };
  [QueueNames.SYNC_BRIDGE_CONTRACT_LOGS]: {
    fromBlock: number;
    toBlock: number;
  };
};

export type QueueData<T = unknown> = Job<T>;

export class Queue extends PgBoss {
  static defaultJobOptions: PgBoss.RetryOptions = {
    retryLimit: 100,
    retryDelay: 1,
    retryBackoff: false,
  };

  push<Q extends QueueNames>(
    queue: Q,
    data: QueueInputs[Q],
    options?: PgBoss.JobOptions,
  ) {
    console.log(`Pushing job to queue ${queue}`);
    return this.send(queue, data as object, {
      ...Queue.defaultJobOptions,
      ...options,
    });
  }

  pushBatch<Q extends QueueNames>(queue: Q, data: Array<QueueInputs[Q]>) {
    const jobs: Array<PgBoss.JobInsert<object>> = data.map((job) => ({
      name: queue,
      data: job,
      ...Queue.defaultJobOptions,
    }));
    return this.insert(jobs);
  }

  async setupWorkers() {
    await this.start();
    await Promise.all([
      this.work(QueueNames.SYNC_BLOCKS, syncAllBlocks),
      this.work(QueueNames.SYNC_MISSING, syncMissingBlocks),
      this.work(QueueNames.SYNC_TRANSACTION, syncTransactions),
      this.work(QueueNames.SYNC_BRIDGE_CONTRACT_LOGS, syncBridgeContractLogs),
    ]);
    console.log('⚡️ Queue running');
  }
}

export const queue = new Queue({
  host: DB_HOST,
  port: Number(DB_PORT),
  user: DB_USER,
  password: DB_PASS,
  database: DB_NAME,
});
