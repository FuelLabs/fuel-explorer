import { RetryAfterError } from 'inngest';
import { InputRepository } from '~/domain/Input/InputRepository';
import { GQLInput } from '~/generated/types';
import { inngest } from '~/infra/inngest/InngestClient';

type Input = {
  inputs: GQLInput[];
  transactionId: number;
};

export class SyncInputs {
  async execute({ inputs, transactionId }: Input) {
    const repository = new InputRepository();
    await repository.insertMany(inputs, transactionId);
  }
}

export const syncInputs = inngest
  .client()
  .createFunction(
    { id: 'sync:inputs', concurrency: 500 },
    { event: 'indexer/sync:inputs' },
    async ({ event: { data }, attempt }) => {
      try {
        console.log(`Syncing inputs for transaction ${data.transactionId}...`);
        const syncInputs = new SyncInputs();
        await syncInputs.execute(data);
      } catch (error) {
        console.error(error);
        throw new RetryAfterError(`Sync inputs attempt ${attempt}`, '1s');
      }
    },
  );
