import { performance } from 'node:perf_hooks';
import c from 'chalk';
import { logger } from '~/core/Logger';
import { BlockRepository } from '~/domain/Block/BlockRepository';
import { db } from '~/infra/database/Db';
import type { QueueInputs, QueueNames } from '~/infra/queue/Queue';
import { addTransactions } from './AddTransactions';

type Data = QueueInputs[QueueNames.ADD_BLOCK_RANGE];

export class AddBlockRange {
  async execute(data: Data, blockProducer: string | null) {
    const { from, to } = data;
    let size = Math.max(to - from, 1);
    size = from === 0 ? size + 1 : size;
    const after = Math.max(to - size, 0);
    const res = await BlockRepository.blocksFromNode(size, after);
    const { blocks } = res;
    if (blocks.length === 0) {
      logger.syncer.warn(c.yellow(`⚠️ No blocks to sync: #${from} - #${to}`));
      return;
    }

    logger.syncer.info(c.green(`🔗 Adding blocks to sync: #${from} - #${to}`));
    const start = performance.now();
    const conn = await db.conn();
    await conn.transaction(async (trx) => {
      try {
        const blockRepo = new BlockRepository(trx);
        await blockRepo.upsertMany(blockProducer, blocks, trx);
        const items = blocks.flatMap((block) => {
          const { transactions, ...rest } = block;
          return transactions.map((transaction, index) => ({
            block: rest,
            transaction,
            index,
          }));
        });
        await addTransactions(items, trx);
      } catch (e) {
        logger.error('Error adding blocks', e);
      }
    });
    const end = performance.now();
    const secs = Number.parseInt(`${(end - start) / 1000}`);
    logger.syncer.info(
      c.green(`✅ Synced blocks: #${from} - #${to} (${secs}s)`),
    );
  }
}

export const createAddBlockRange =
  (blockProducer: string | null) => async (data: Data) => {
    try {
      const { execute } = new AddBlockRange();
      await execute(data, blockProducer);
    } catch (error) {
      logger.error('Add block range failed', error);
      throw new Error('Add block range failed', { cause: error });
    }
  };
