import { BlockRepository, type QueueData } from '@fuel-indexer/core';
import { type QueueInputs, QueueNames, queue } from '~/queue';

type Props = QueueInputs[QueueNames.SYNC_LAST];

export class SyncLastNodes {
  async execute(props: Props) {
    const repo = new BlockRepository();
    const lastBlock = await repo.latestBlockFromNode();
    const blockHeight = Number(lastBlock?.header.height ?? '0');
    const from = blockHeight - props.last;

    console.log(
      `Syncing last ${props.last} blocks from ${from} to ${blockHeight}`,
    );

    await queue.push(QueueNames.SYNC_NODES, {
      after: from,
      first: props.last,
      checkNext: false,
    });
  }
}

export const syncLastNodes = async ({ data }: QueueData<Props>) => {
  console.log('Syncing last nodes');
  try {
    const sync = new SyncLastNodes();
    await sync.execute(data);
  } catch (error) {
    console.error(error);
    throw new Error('Sync last', {
      cause: error,
    });
  }
};
