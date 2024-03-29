import { GetStepTools, RetryAfterError } from 'inngest';
import { BlockRepository } from '~/domain/Block/BlockRepository';
import { InngestEvents, inngest } from '~/infra/inngest/InngestClient';

type Step = GetStepTools<typeof inngest._client, InngestEvents.SYNC_MISSING>;

export class SyncMissingBlocks {
  constructor(private readonly step: Step) {}

  async execute() {
    const repo = new BlockRepository();
    const latest = await repo.findLatestAdded();
    const after = latest ? Number(latest.data.header.height) : undefined;

    await this.step.sendEvent('sync:blocks', {
      name: InngestEvents.SYNC_BLOCKS,
      data: { after, first: 5 },
    });
  }
}

export const syncMissingBlocks = inngest.client().createFunction(
  { id: 'sync:missing' },
  {
    event: InngestEvents.SYNC_MISSING,
    concurrency: 1,
    debounce: { period: '2s' },
  },
  async ({ step, attempt }) => {
    try {
      console.log('Syncing missing blocks');
      const syncMissingBlocks = new SyncMissingBlocks(step);
      await syncMissingBlocks.execute();
    } catch (error) {
      console.error(error);
      throw new RetryAfterError(`Sync missing attempt ${attempt}`, '1s', {
        cause: error,
      });
    }
  },
);
