import { BlockRepository } from '~/domain/Block/BlockRepository';
import {
  type QueueData,
  type QueueInputs,
  QueueNames,
  queue,
} from '~/infra/queue/Queue';

type Input = QueueInputs[QueueNames.ADD_BLOCK_RANGE];

export class AddBlockRange {
  async execute({ id, data }: QueueData<Input>) {
    const { from, to } = data;
    const repo = new BlockRepository();
    const { blocks } = await repo.blocksFromNode(to - from, from);
    await repo.upsertMany(blocks);
    await queue.push(QueueNames.SYNC_TRANSACTIONS, { blocks }, { priority: 1 });
    await queue.complete(id, blocks);
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
