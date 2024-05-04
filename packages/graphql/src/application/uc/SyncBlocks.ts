import { worker } from '~/infra/worker/Worker';

type Props = {
  cursor?: number;
  offset?: number;
  watch?: boolean;
};

export const syncBlocks = async (data: Props) => {
  worker.postMessage('SYNC_BLOCKS', data);
};
