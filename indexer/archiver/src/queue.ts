import { Queue, env } from '@fuel-indexer/core';

export enum QueueNames {
  SYNC_NODES = 'indexer/sync:nodes',
  SYNC_MISSING = 'indexer/sync:missing',
  SYNC_LAST = 'indexer/sync:last',
}

export type QueueInputs = {
  [QueueNames.SYNC_NODES]: {
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
