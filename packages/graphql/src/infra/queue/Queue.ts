import PgBoss, { type Job } from 'pg-boss';
import { addBlockRange } from '~/application/uc/AddBlockRange';
import { syncBlocks } from '~/application/uc/SyncBlocks';
import { syncLastBlocks } from '~/application/uc/SyncLastBlocks';
import { syncMissingBlocks } from '~/application/uc/SyncMissingBlocks';
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
  SYNC_LAST = 'indexer/sync-last',
}

export type QueueInputs = {
  [QueueNames.SYNC_MISSING]: null;
  [QueueNames.SYNC_BLOCKS]: {
    cursor?: number;
    offset?: number;
    watch?: boolean;
  };
  [QueueNames.ADD_BLOCK_RANGE]: {
    from: number;
    to: number;
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

  static defaultJobOptions = {
    retryLimit: 10,
    retryDelay: 1,
    retryBackoff: false,
    expireInSeconds: 120,
  };

  push<Q extends QueueNames>(
    queue: Q,
    data?: QueueInputs[Q] | null,
    options?: PgBoss.JobOptions,
  ) {
    // console.log(`Pushing job to queue ${queue}`);
    return this.send(queue, data as object, {
      ...Queue.defaultJobOptions,
      ...options,
    });
  }

  pushSingleton<Q extends QueueNames>(
    queue: Q,
    data?: QueueInputs[Q] | null,
    options?: PgBoss.JobOptions,
  ) {
    // console.log(`Pushing job to queue ${queue}`);
    return this.sendSingleton(queue, data as object, {
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
      data: job ?? {},
    }));
    return this.insert(jobs);
  }

  async setupWorkers() {
    const opts = this.workOpts;
    await this.start();
    await this.work(QueueNames.SYNC_BLOCKS, opts, syncBlocks);
    await this.work(QueueNames.SYNC_LAST, opts, syncLastBlocks);
    await this.work(QueueNames.SYNC_MISSING, opts, syncMissingBlocks);
    await this.work(QueueNames.ADD_BLOCK_RANGE, opts, addBlockRange);
    console.log('⚡️ Queue running');
  }

  async activeJobs() {
    return queue.getQueueSize(QueueNames.ADD_BLOCK_RANGE);
  }
}

export const queue = new Queue({
  host: DB_HOST,
  port: Number(DB_PORT),
  user: DB_USER,
  password: DB_PASS,
  database: DB_NAME,
  max: 10,
});
