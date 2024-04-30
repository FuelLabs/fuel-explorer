import type { GQLBlock } from '@core/generated/gql-types';
import { Queue, env } from '@fuel-indexer/core';

export enum QueueNames {
  SYNC_NODE = 'indexer/sync:node',
  SYNC_NODES = 'indexer/sync:nodes',
  SYNC_MISSING = 'indexer/sync:missing',
  SYNC_LAST = 'indexer/sync:last',
}

export type QueueInputs = {
  [QueueNames.SYNC_NODE]: {
    block: GQLBlock;
  };
  [QueueNames.SYNC_NODES]: {
    offset?: number;
    cursor?: number;
    last?: number;
    from?: number;
    to?: number;
  };
  [QueueNames.SYNC_MISSING]: undefined;
  [QueueNames.SYNC_LAST]: {
    offset?: number;
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
