import { Queue, env } from '@fuel-indexer/core';
import { syncAllBlocks } from './application/uc/SyncAllBlocks';
import { syncLastBlocks } from './application/uc/SyncLastBlocks';
import { syncMissingBlocks } from './application/uc/SyncMissingBlocks';

export enum QueueNames {
  SYNC_BLOCKS = 'indexer/sync:blocks',
  SYNC_MISSING = 'indexer/sync:missing',
  SYNC_LAST = 'indexer/sync:last',
}

export type QueueInputs = {
  [QueueNames.SYNC_BLOCKS]: {
    first: number;
    last?: number;
    after?: number;
    checkNext?: boolean;
  };
  [QueueNames.SYNC_MISSING]: undefined;
  [QueueNames.SYNC_LAST]: {
    last: number;
  };
};

export const queue = new Queue({
  host: env.get('DB_HOST'),
  port: Number(env.get('DB_PORT')),
  user: env.get('DB_USER'),
  password: env.get('DB_PASS'),
  database: env.get('DB_NAME'),
});

queue.work(QueueNames.SYNC_BLOCKS, syncAllBlocks);
queue.work(QueueNames.SYNC_MISSING, syncMissingBlocks);
queue.work(QueueNames.SYNC_LAST, syncLastBlocks);
