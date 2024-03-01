import { GetStepTools, RetryAfterError } from 'inngest';
import { BlockEntity } from '~/domain/Block/BlockEntity';
import { BlockRepository } from '~/domain/Block/BlockRepository';
import { Events, InngestEvents, inngest } from '~/infra/inngest/InngestClient';

type Step = GetStepTools<typeof inngest._client, InngestEvents.SYNC_BLOCKS>;
type Input = {
  page?: number;
  perPage?: number;
};

export class SyncAllBlocks {
  constructor(private step: Step) {}
  async execute({ page = 1, perPage = 1000 }: Input) {
    const repo = new BlockRepository();
    const { blocks, hasNext } = await repo.blocksFromNode(page, perPage);
    const created = await repo.insertMany(blocks);
    await this.addTransactions(created);

    if (hasNext) {
      await this.step.sendEvent('sync:blocks', {
        name: InngestEvents.SYNC_BLOCKS,
        data: { page: page + 1, perPage },
      });
    } else {
      // Sync chain info after all blocks are synced
      await this.step.sendEvent('sync:chain', {
        name: InngestEvents.SYNC_CHAIN_INFO,
        data: {},
      });
    }
  }

  private async addTransactions(blocks: (BlockEntity | null)[]) {
    const filtered = blocks.filter(Boolean) as BlockEntity[];
    const events = filtered.map<Events[InngestEvents.SYNC_TRANSACTIONS]>(
      (block) => ({
        name: InngestEvents.SYNC_TRANSACTIONS,
        data: { block: block.data, blockId: block._id.value() },
      }),
    );
    if (events.length) {
      await this.step.sendEvent('sync:transactions', events);
    }
  }
}

export const syncAllBlocks = inngest
  .client()
  .createFunction(
    { id: 'sync:blocks', concurrency: 100 },
    { event: InngestEvents.SYNC_BLOCKS },
    async ({ step, event: { data }, attempt }) => {
      try {
        console.log(`Syncing block page ${data.page}`);
        const syncAllBlocks = new SyncAllBlocks(step);
        await syncAllBlocks.execute(data);
      } catch (error) {
        throw new RetryAfterError(`Sync block attempt ${attempt}`, '1s', {
          cause: error,
        });
      }
    },
  );
