import type { Input } from 'fuels';
import type { QueueData, QueueInputs, QueueNames } from '~/infra/queue/Queue';
import { worker } from '~/infra/worker/Worker';

export type SyncBlocksProps = QueueInputs[QueueNames.SYNC_BLOCKS];

export const syncBlocks = async ({ data }: QueueData<Input>) => {
  worker.run(data);
};
