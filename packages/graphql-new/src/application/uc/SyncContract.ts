import { RetryAfterError } from 'inngest';
import { ContractRepository } from '~/domain/Contract/ContractRepository';
import { GQLContract } from '~/graphql/generated/sdk';
import { InngestEvents, inngest } from '~/infra/inngest/InngestClient';

type Props = {
  contract: GQLContract;
};

export class SyncContract {
  async execute({ contract }: Props) {
    const repository = new ContractRepository();
    await repository.insertOne(contract);
  }
}

export const syncContract = inngest
  .client()
  .createFunction(
    { id: 'sync:contract', concurrency: 100 },
    { event: InngestEvents.SYNC_CONTRACT },
    async ({ event: { data }, attempt }) => {
      try {
        console.log(`Syncing contract ${data.contract.id}...`);
        const syncContract = new SyncContract();
        await syncContract.execute(data);
      } catch (error) {
        console.error(error);
        throw new RetryAfterError(`Sync contract attempt ${attempt}`, '1s', {
          cause: error,
        });
      }
    },
  );
