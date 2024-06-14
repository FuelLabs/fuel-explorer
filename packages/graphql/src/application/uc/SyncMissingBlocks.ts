import { BlockRepository } from '~/domain/Block/BlockRepository';
import { type QueueInputs, QueueNames, mq } from '~/infra/queue/Queue';

type Data = QueueInputs[QueueNames.SYNC_MISSING];

export class SyncMissingBlocks {
  async execute() {
    const repo = new BlockRepository();
    const latest = await repo.findLatestAdded();
    const cursor = latest ? Number(latest.data.header.height) : undefined;
    console.log('Syncing missing blocks from', cursor);
    await mq.send('block', QueueNames.SYNC_BLOCKS, { cursor, watch: true });
  }
}

export const syncMissingBlocks = async (_: Data) => {
  try {
    console.log('Syncing missing blocks');
    const syncMissingBlocks = new SyncMissingBlocks();
    await syncMissingBlocks.execute();
  } catch (error) {
    console.error(error);
    throw new Error('Sync missing', {
      cause: error,
    });
  }
};
