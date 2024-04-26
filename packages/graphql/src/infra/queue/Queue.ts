import PgBoss, { type Job } from 'pg-boss';
import { syncAllBlocks } from '~/application/uc/SyncAllBlocks';
import { syncLastBlocks } from '~/application/uc/SyncLastBlocks';
import { syncMissingBlocks } from '~/application/uc/SyncMissingBlocks';
import { syncTransactions } from '~/application/uc/SyncTransaction';
import { env } from '~/config';
import type { GQLBlock } from '~/graphql/generated/sdk';

const DB_HOST = env.get('DB_HOST');
const DB_PORT = env.get('DB_PORT');
const DB_USER = env.get('DB_USER');
const DB_PASS = env.get('DB_PASS');
const DB_NAME = env.get('DB_NAME');

export enum QueueNames {
  SYNC_BLOCKS = 'indexer/sync:blocks',
  SYNC_MISSING = 'indexer/sync:missing',
  SYNC_TRANSACTION = 'indexer/sync:transaction',
  SYNC_LAST = 'indexer/sync:last',
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
  [QueueNames.SYNC_LAST]: {
    last: number;
  };
};

export type QueueData<T = unknown> = Job<T>;

export class Queue extends PgBoss {
  private workOpts = {
    teamSize: 250,
  };

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
    const opts = this.workOpts;
    this.work(QueueNames.SYNC_BLOCKS, opts, syncAllBlocks);
    this.work(QueueNames.SYNC_MISSING, opts, syncMissingBlocks);
    this.work(QueueNames.SYNC_TRANSACTION, opts, syncTransactions);
    this.work(QueueNames.SYNC_LAST, opts, syncLastBlocks);

    await this.start();
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
