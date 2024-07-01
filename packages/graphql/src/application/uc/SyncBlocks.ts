import type { QueueInputs, QueueNames } from '~/infra/queue/Queue';
import { worker } from '~/infra/worker/Worker';

export type SyncBlocksProps = QueueInputs[QueueNames.SYNC_BLOCKS];

export const syncBlocks = async (data: SyncBlocksProps) => {
  console.log('🔁 Syncing blocks', data);
  worker.run(data);
};
