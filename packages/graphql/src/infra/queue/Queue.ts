import PgBoss, { type Job } from 'pg-boss';
import { syncBlocks } from '~/application/uc/SyncBlocks';
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
  [QueueNames.SYNC_MISSING]: undefined;
  [QueueNames.SYNC_BLOCKS]: {
    cursor?: number;
    offset?: number;
  };
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
  private workOpts: PgBoss.WorkOptions = {
    teamSize: 250,
    teamConcurrency: 250,
  };

  static defaultJobOptions: PgBoss.RetryOptions = {
    retryLimit: 1,
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

  pushBatch<Q extends QueueNames>(
    queue: Q,
    data: Array<QueueInputs[Q]>,
    opts?: Partial<PgBoss.JobInsert<object>>,
  ) {
    const jobs: Array<PgBoss.JobInsert<object>> = data.map((job) => ({
      ...Queue.defaultJobOptions,
      ...opts,
      name: queue,
      data: job,
    }));
    return this.insert(jobs);
  }

  async setupWorkers() {
    const opts = this.workOpts;
    await this.start();
    await this.work(QueueNames.SYNC_BLOCKS, opts, syncBlocks);
    await this.work(QueueNames.SYNC_MISSING, opts, syncMissingBlocks);
    await this.work(QueueNames.SYNC_TRANSACTION, opts, syncTransactions);
    await this.work(QueueNames.SYNC_LAST, opts, syncLastBlocks);
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
