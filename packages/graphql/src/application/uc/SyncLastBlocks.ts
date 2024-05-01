import { BlockRepository } from '~/domain/Block/BlockRepository';
import {
  type QueueData,
  type QueueInputs,
  QueueNames,
  queue,
} from '~/infra/queue/Queue';

type Props = QueueInputs[QueueNames.SYNC_LAST];

export class SyncLastBlocks {
  async execute(props: Props) {
    const repo = new BlockRepository();
    const lastBlock = await repo.latestBlockFromNode();
    const blockHeight = Number(lastBlock?.header.height ?? '0');
    const from = blockHeight - props.last;

    console.log(
      `Syncing last ${props.last} blocks from ${from} to ${blockHeight}`,
    );

    await queue.push(QueueNames.SYNC_BLOCKS, {
      cursor: from,
      offset: props.last,
    });
  }
}

export const syncLastBlocks = async ({ data }: QueueData<Props>) => {
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
