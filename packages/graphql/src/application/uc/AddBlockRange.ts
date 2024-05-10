import { performance } from 'node:perf_hooks';
import c from 'chalk';
import { BlockRepository } from '~/domain/Block/BlockRepository';
import { db } from '~/infra/database/Db';
import {
  type QueueData,
  type QueueInputs,
  type QueueNames,
  queue,
} from '~/infra/queue/Queue';
import { addTransactions } from './AddTransactions';

type Input = QueueInputs[QueueNames.ADD_BLOCK_RANGE];

export class AddBlockRange {
  async execute({ id, data }: QueueData<Input>) {
    const { blocks } = data;
    const from = blocks[0].header.height;
    const to = blocks[blocks.length - 1].header.height;
    console.log(c.green(`🔗 Adding blocks to sync: #${from} - #${to}`));
    const start = performance.now();
    await db.connection().transaction(async (trx) => {
      const repo = new BlockRepository(trx);
      await repo.upsertMany(blocks, trx);
      await addTransactions({ blocks, trx });
    });
    const end = performance.now();
    const secs = Number.parseInt(`${(end - start) / 1000}`);
    console.log(c.green(`✅ Synced blocks: #${from} - #${to} (${secs}s)`));
    await queue.complete(id);
  }
}

export const addBlockRange = async (input: QueueData<Input>) => {
  try {
    const { execute } = new AddBlockRange();
    await execute(input);
  } catch (error) {
    console.error(error);
    throw new Error('Sync transactions', {
      cause: error,
    });
  }
};
