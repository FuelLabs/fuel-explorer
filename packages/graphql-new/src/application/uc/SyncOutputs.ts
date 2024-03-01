import { RetryAfterError } from 'inngest';
import { OutputRepository } from '~/domain/Output/OutputRepository';
import { GQLOutput } from '~/graphql/generated/sdk';
import { InngestEvents, inngest } from '~/infra/inngest/InngestClient';

type Props = {
  outputs: GQLOutput[];
  transactionId: number;
};

export class SyncOutputs {
  async execute({ outputs, transactionId }: Props) {
    const repository = new OutputRepository();
    await repository.insertMany(outputs, transactionId);
  }
}

export const syncOutputs = inngest
  .client()
  .createFunction(
    { id: 'sync:outputs', concurrency: 100 },
    { event: InngestEvents.SYNC_OUTPUTS },
    async ({ event: { data }, attempt }) => {
      try {
        console.log(`Syncing outputs for transaction ${data.transactionId}...`);
        const syncoutputs = new SyncOutputs();
        await syncoutputs.execute(data);
      } catch (error) {
        console.error(error);
        throw new RetryAfterError(`Sync outputs attempt ${attempt}`, '1s', {
          cause: error,
        });
      }
    },
  );
