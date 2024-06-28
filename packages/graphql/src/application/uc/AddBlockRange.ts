import { performance } from 'node:perf_hooks';
import c from 'chalk';
import { BlockRepository } from '~/domain/Block/BlockRepository';
import { db } from '~/infra/database/Db';
import type { QueueInputs, QueueNames } from '~/infra/queue/Queue';
import { addTransactions } from './AddTransactions';

type Data = QueueInputs[QueueNames.ADD_BLOCK_RANGE];

export class AddBlockRange {
  async execute(data: Data, blockProducer: string | null) {
    const { from, to } = data;
    const res = await BlockRepository.blocksFromNode(to - from, to);
    const { blocks } = res;
    if (blocks.length === 0) {
      console.log(c.yellow(`⚠️ No blocks to sync: #${from} - #${to}`));
      return;
    }

    console.log(c.green(`🔗 Adding blocks to sync: #${from} - #${to}`));
    const start = performance.now();
    const conn = await db.connection();
    await conn.transaction(async (trx) => {
      try {
        const blockRepo = new BlockRepository(trx);
        await blockRepo.upsertMany(blockProducer, blocks, trx);
        const items = blocks.flatMap((block) => {
          const { transactions, ...rest } = block;
          return transactions.map((transaction) => ({
            block: rest,
            transaction,
          }));
        });
        await addTransactions(items, trx);
      } catch (e) {
        console.error(e);
      }
    });
    const end = performance.now();
    const secs = Number.parseInt(`${(end - start) / 1000}`);
    console.log(c.green(`✅ Synced blocks: #${from} - #${to} (${secs}s)`));
  }
}

export const createAddBlockRange =
  (blockProducer: string | null) => async (data: Data) => {
    try {
      const { execute } = new AddBlockRange();
      await execute(data, blockProducer);
    } catch (error) {
      console.error(error);
      throw new Error('Sync transactions', {
        cause: error,
      });
    }
  };
