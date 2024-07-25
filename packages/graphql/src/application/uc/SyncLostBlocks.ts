import { logger } from '~/core/Logger';
import { QueueNames, mq } from '~/infra/queue/Queue';
import { db } from '../../infra/database/Db';

export class SyncLostBlocks {
  async execute() {
    logger.syncer.info('🔗 Syncing lost blocks');
    // TODO: move to repository
    const res = (await db.execSQL(
      'select bs._id from (select generate_series(0, (select max(_id) from blocks)) as _id) as bs where bs._id not in (select _id from blocks)',
    )) as any;
    const { rows } = res;
    if (rows.length === 0) {
      logger.syncer.info('🔗 Lost blocks not found');
    }
    for (const row of rows) {
      await mq.send('block', QueueNames.ADD_BLOCK_RANGE, {
        from: row._id,
        to: row._id,
      });
      console.log(`Syncing lost block #${row._id}`);
    }
  }
}

export const syncLostBlocks = async () => {
  try {
    const syncLastBlocks = new SyncLostBlocks();
    await syncLastBlocks.execute();
  } catch (error) {
    logger.error('Sync lost blocks error', error);
    throw new Error('Sync lost', { cause: error });
  }
};
