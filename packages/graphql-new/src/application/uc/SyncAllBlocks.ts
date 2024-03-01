import { RetryAfterError } from 'inngest';
import { BlockRepository } from '~/domain/Block/BlockRepository';
import { inngest } from '~/infra/inngest/InngestClient';

type Input = {
  page?: number;
  perPage?: number;
};

export class SyncAllBlocks {
  async execute({ page = 1, perPage = 1000 }: Input): Promise<void> {
    const repo = new BlockRepository();
    const { blocks, hasNext } = await repo.blocksFromNode(page, perPage);
    const created = await repo.insertMany(blocks);

    await Promise.all(
      created.map((block) => {
        if (!block) return;
        return inngest.syncTransactions({
          block: block.data,
          blockId: Number(block.data.header.height),
        });
      }),
    );

    if (hasNext) {
      await inngest.syncBlocks(page + 1, perPage);
    }
  }
}

export const syncAllBlocks = inngest
  .client()
  .createFunction(
    { id: 'sync:blocks', concurrency: 500 },
    { event: 'indexer/sync:blocks' },
    async ({ event: { data }, attempt }) => {
      try {
        console.log(`Syncing block page ${data.page}`);
        const syncAllBlocks = new SyncAllBlocks();
        await syncAllBlocks.execute(data);
      } catch (error) {
        console.error(error);
        throw new RetryAfterError(`Sync block attempt ${attempt}`, '1s');
      }
    },
  );
