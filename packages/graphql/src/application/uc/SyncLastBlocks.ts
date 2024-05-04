import { BlockRepository } from '~/domain/Block/BlockRepository';
import {
  type QueueData,
  type QueueInputs,
  QueueNames,
  queue,
} from '~/infra/queue/Queue';

type Props = QueueInputs[QueueNames.SYNC_LAST];

export class SyncLastBlocks {
  async execute({ last, watch }: Props) {
    const repo = new BlockRepository();
    const lastBlock = await repo.latestBlockFromNode();
    const blockHeight = Number(lastBlock?.header.height ?? '0');
    const from = blockHeight - last;

    console.log(`Syncing last ${last} blocks from ${from} to ${blockHeight}`);
    await queue.push(QueueNames.SYNC_BLOCKS, { watch, cursor: from });
  }
}

export const syncLastBlocks = async ({ id, data }: QueueData<Props>) => {
  try {
    const syncLastBlocks = new SyncLastBlocks();
    await syncLastBlocks.execute(data);
    await queue.complete(id);
  } catch (error) {
    console.error(error);
    throw new Error('Sync last', {
      cause: error,
    });
  }
};
