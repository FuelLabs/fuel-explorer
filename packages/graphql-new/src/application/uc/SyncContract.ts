import { RetryAfterError } from 'inngest';
import { ContractRepository } from '~/domain/Contract/ContractRepository';
import { GQLContract } from '~/generated/types';
import { inngest } from '~/infra/inngest/InngestClient';

type Input = {
  contract: GQLContract;
};

export class SyncContract {
  async execute({ contract }: Input) {
    const repository = new ContractRepository();
    await repository.insertOne(contract);
  }
}

export const syncContract = inngest
  .client()
  .createFunction(
    { id: 'sync:contract', concurrency: 500 },
    { event: 'indexer/sync:contract' },
    async ({ event: { data }, attempt }) => {
      try {
        console.log(`Syncing contract ${data.contract.id}...`);
        const syncContract = new SyncContract();
        await syncContract.execute(data);
      } catch (error) {
        console.error(error);
        throw new RetryAfterError(`Sync contract attempt ${attempt}`, '1s');
      }
    },
  );
