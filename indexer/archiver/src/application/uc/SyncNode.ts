import { NodeRepository } from '@core/domain/Node/NodeRepository';
import { BlockRepository, type QueueData } from '@fuel-indexer/core';
import type { QueueInputs, QueueNames } from '~/queue';

type Props = QueueInputs[QueueNames.SYNC_NODE];

export class SyncNode {
  async execute({ block }: Props) {
    const nodeRepo = new NodeRepository();
    await nodeRepo.upsertOne(block, 'Block');
  }
}

export const syncNode = async ({ data }: QueueData<Props>) => {
  const { height } = data.block.header;
  try {
    console.log(`-- Syncing node for block #${height}`);
    const sync = new SyncNode();
    await sync.execute(data);
  } catch (error) {
    console.error(error);
    throw new Error(`Sync node #${height} failed`, {
      cause: error,
    });
  }
};
