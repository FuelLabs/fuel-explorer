import { BlockRepository } from '~/domain/Block/BlockRepository';
import {
  type QueueData,
  type QueueInputs,
  QueueNames,
  queue,
} from '~/infra/queue/Queue';

type Input = QueueInputs[QueueNames.ADD_BLOCK_RANGE];

export class AddBlockRange {
  async execute({ data }: QueueData<Input>) {
    const { blocks } = data;
    const repo = new BlockRepository();
    await repo.upsertMany(blocks);
    await queue.push(QueueNames.SYNC_TRANSACTIONS, { blocks });
  }
}

export const addBlockRange = async (input: QueueData<Input>) => {
  try {
    const { execute } = new AddBlockRange();
    await execute(input);
  } catch (error) {
    console.error(error);
    throw new Error('Sync transactions', {
      cause: error,
    });
  }
};
