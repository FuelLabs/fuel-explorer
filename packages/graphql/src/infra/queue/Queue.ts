import c from 'chalk';
import PgBoss, { type Job } from 'pg-boss';
import { addBlockRange } from '~/application/uc/AddBlockRange';
import { syncBlocks } from '~/application/uc/SyncBlocks';
import { syncLastBlocks } from '~/application/uc/SyncLastBlocks';
import { syncMissingBlocks } from '~/application/uc/SyncMissingBlocks';
import { syncTransactions } from '~/application/uc/SyncTransactions';
import { env } from '~/config';
import type { GQLBlock } from '~/graphql/generated/sdk';

const DB_HOST = env.get('DB_HOST');
const DB_PORT = env.get('DB_PORT');
const DB_USER = env.get('DB_USER');
const DB_PASS = env.get('DB_PASS');
const DB_NAME = env.get('DB_NAME');

export enum QueueNames {
  SYNC_BLOCKS = 'indexer/sync-blocks',
  ADD_BLOCK_RANGE = 'indexer/add-block-range',
  SYNC_MISSING = 'indexer/sync-missing',
  SYNC_TRANSACTIONS = 'indexer/sync-transactions',
  SYNC_LAST = 'indexer/sync-last',
}

export type QueueInputs = {
  [QueueNames.SYNC_MISSING]: undefined;
  [QueueNames.SYNC_BLOCKS]: {
    cursor?: number;
    offset?: number;
    watch?: boolean;
  };
  [QueueNames.ADD_BLOCK_RANGE]: {
    from: number;
    to: number;
  };
  [QueueNames.SYNC_TRANSACTIONS]: {
    blocks: GQLBlock[];
  };
  [QueueNames.SYNC_LAST]: {
    last: number;
    watch?: boolean;
  };
};

export type QueueData<T = unknown> = Job<T>;

export class Queue extends PgBoss {
  private workOpts: PgBoss.WorkOptions = {
    teamSize: Number(env.get('QUEUE_CONCURRENCY')),
    teamConcurrency: Number(env.get('QUEUE_CONCURRENCY')),
    teamRefill: true,
  };

  static defaultJobOptions: PgBoss.RetryOptions = {
    retryLimit: 3,
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
    await this.work(QueueNames.ADD_BLOCK_RANGE, opts, addBlockRange);
    await this.work(QueueNames.SYNC_BLOCKS, opts, syncBlocks);
    await this.work(QueueNames.SYNC_MISSING, opts, syncMissingBlocks);
    await this.work(QueueNames.SYNC_TRANSACTIONS, opts, syncTransactions);
    await this.work(QueueNames.SYNC_LAST, opts, syncLastBlocks);
    await this.start();
    console.log('⚡️ Queue running');
  }

  async hasActiveJobs() {
    const batchSize = Number(env.get('QUEUE_CONCURRENCY'));
    const results = await Promise.all([
      queue.fetch(QueueNames.SYNC_BLOCKS, batchSize),
      queue.fetch(QueueNames.ADD_BLOCK_RANGE, batchSize),
      queue.fetch(QueueNames.SYNC_TRANSACTIONS, batchSize),
    ]);
    console.log(c.gray(`⌛️ Active Blocks: ${results[0]?.length ?? 0}`));
    console.log(c.gray(`⌛️ Active Range: ${results[1]?.length ?? 0}`));
    console.log(c.gray(`⌛️ Active Transactions: ${results[2]?.length ?? 0}`));
    return results.some((result) => Boolean(result?.length ?? 0 > 0));
  }
}

export const queue = new Queue({
  host: DB_HOST,
  port: Number(DB_PORT),
  user: DB_USER,
  password: DB_PASS,
  database: DB_NAME,
});
