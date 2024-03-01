import { RetryAfterError } from 'inngest';
import { OutputRepository } from '~/domain/Output/OutputRepository';
import { GQLOutput } from '~/generated/types';
import { inngest } from '~/infra/inngest/InngestClient';

type Output = {
  outputs: GQLOutput[];
  transactionId: number;
};

export class SyncOutputs {
  async execute({ outputs, transactionId }: Output) {
    const repository = new OutputRepository();
    await repository.insertMany(outputs, transactionId);
  }
}

export const syncAllBlocks = inngest
  .client()
  .createFunction(
    { id: 'sync:outputs', concurrency: 500 },
    { event: 'indexer/sync:outputs' },
    async ({ event: { data }, attempt }) => {
      try {
        console.log(`Syncing outputs for transaction ${data.transactionId}...`);
        const syncoutputs = new SyncOutputs();
        await syncoutputs.execute(data);
      } catch (error) {
        console.error(error);
        throw new RetryAfterError(`Sync outputs attempt ${attempt}`, '1s');
      }
    },
  );
