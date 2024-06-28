import { logger } from '~/core/Logger';
import { BlockRepository } from '~/domain/Block/BlockRepository';
import { db } from '~/infra/database/Db';
import { type QueueInputs, QueueNames, mq } from '~/infra/queue/Queue';

type Data = QueueInputs[QueueNames.SYNC_MISSING];

export class SyncMissingBlocks {
  async execute() {
    const conn = await db.connection();
    const repo = new BlockRepository(conn);
    const latest = await repo.findLatestAdded();
    const cursor = latest ? Number(latest.data.header.height) : undefined;
    logger.syncer.info('Syncing missing blocks from', cursor);
    await mq.send('block', QueueNames.SYNC_BLOCKS, { cursor, watch: true });
  }
}

export const syncMissingBlocks = async (_: Data) => {
  try {
    const syncMissingBlocks = new SyncMissingBlocks();
    await syncMissingBlocks.execute();
  } catch (error) {
    logger.error('Sync missing blocks failed', error);
    throw new Error('Sync missing', { cause: error });
  }
};
