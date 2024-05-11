import { BlockRepository } from '~/domain/Block/BlockRepository';
import { type QueueInputs, QueueNames, mq } from '~/infra/queue/Queue';

type Data = QueueInputs[QueueNames.SYNC_LAST];

export class SyncLastBlocks {
  async execute({ last, watch }: Data) {
    const repo = new BlockRepository();
    const lastBlock = await repo.latestBlockFromNode();
    const blockHeight = Number(lastBlock?.header.height ?? '0');
    const from = blockHeight - last;

    console.log(`Syncing last ${last} blocks from ${from} to ${blockHeight}`);
    await mq.send(QueueNames.SYNC_BLOCKS, { watch, cursor: from });
  }
}

export const syncLastBlocks = async (data: Data) => {
  try {
    const syncLastBlocks = new SyncLastBlocks();
    await syncLastBlocks.execute(data);
  } catch (error) {
    console.error(error);
    throw new Error('Sync last', {
      cause: error,
    });
  }
};
