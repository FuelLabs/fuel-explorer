import { BlockRepository } from '~/domain/Block/BlockRepository';
import {
  type QueueData,
  type QueueInputs,
  QueueNames,
  queue,
} from '~/infra/queue/Queue';

type Props = QueueInputs[QueueNames.SYNC_MISSING];

export class SyncMissingBlocks {
  async execute() {
    const repo = new BlockRepository();
    const latest = await repo.findLatestAdded();
    const cursor = latest ? Number(latest.data.header.height) : undefined;
    await queue.push(QueueNames.SYNC_BLOCKS, {
      cursor,
      watch: true,
    });
  }
}

export const syncMissingBlocks = async ({ id }: QueueData<Props>) => {
  try {
    console.log('Syncing missing blocks');
    const syncMissingBlocks = new SyncMissingBlocks();
    await syncMissingBlocks.execute();
    await queue.complete(id);
  } catch (error) {
    console.error(error);
    throw new Error('Sync missing', {
      cause: error,
    });
  }
};
