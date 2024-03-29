import { GetStepTools, RetryAfterError } from 'inngest';
import { uniqBy } from 'lodash';
import { BlockEntity } from '~/domain/Block/BlockEntity';
import { BlockRepository } from '~/domain/Block/BlockRepository';
import {
  Events,
  InngestEvents,
  InngestInputs,
  inngest,
} from '~/infra/inngest/InngestClient';

type Step = GetStepTools<typeof inngest._client, InngestEvents.SYNC_BLOCKS>;
type Props = InngestInputs[InngestEvents.SYNC_BLOCKS];

export class SyncAllBlocks {
  constructor(private step: Step) {}
  async execute({ after = undefined, first = 100, checkNext = true }: Props) {
    const repo = new BlockRepository();
    const { blocks, endCursor } = await repo.blocksFromNode(first, after);
    const hasBlocks = blocks.length > 0;

    if (hasBlocks) {
      const created = await repo.insertMany(blocks);
      await this.syncTransactions(created);
    }
    if (checkNext) {
      // If current page don't have blocks, we keep trying the same page
      // until we have blocks after the final cursor
      const cursor = !hasBlocks ? after : endCursor;
      await this.syncNext(first, cursor);
    }
  }

  private async syncTransactions(blocks: (BlockEntity | null)[]) {
    const filtered = blocks.filter(Boolean) as BlockEntity[];
    const events = filtered.flatMap((block) => {
      const txs = uniqBy(block.data.transactions, 'id');
      return txs.map<Events[InngestEvents.SYNC_TRANSACTION]>(
        (transaction, idx) => ({
          name: InngestEvents.SYNC_TRANSACTION,
          data: {
            index: idx,
            block: block.data,
            txHash: transaction.id,
          },
        }),
      );
    });

    if (events.length) {
      await this.step.sendEvent('sync:transaction', events);
    }
  }

  private async syncNext(first: number, after?: number) {
    await this.step.sendEvent('sync:blocks', {
      name: InngestEvents.SYNC_BLOCKS,
      data: { first, after },
    });
  }
}

export const syncAllBlocks = inngest.client().createFunction(
  {
    id: 'sync:blocks',
    concurrency: 1,
    debounce: { period: '2s' },
  },
  { event: InngestEvents.SYNC_BLOCKS },
  async ({ step, event: { data }, attempt }) => {
    try {
      console.log(`Syncing blocks after ${data.after}`);
      const syncAllBlocks = new SyncAllBlocks(step);
      await syncAllBlocks.execute(data);
    } catch (error) {
      throw new RetryAfterError(`Sync block attempt ${attempt}`, '1s', {
        cause: error,
      });
    }
  },
);
