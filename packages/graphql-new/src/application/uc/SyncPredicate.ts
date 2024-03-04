import { RetryAfterError } from 'inngest';
import { PredicatePayload } from '~/domain/Predicate/PredicateModel';
import { PredicateRepository } from '~/domain/Predicate/PredicateRepository';
import { InngestEvents, inngest } from '~/infra/inngest/InngestClient';

type Props = PredicatePayload;

export class SyncPredicate {
  async execute({ bytecode, address }: Props) {
    const repository = new PredicateRepository();
    await repository.insertOne({ bytecode, address });
  }
}

export const syncPredicate = inngest
  .client()
  .createFunction(
    { id: 'sync:predicate', concurrency: 100 },
    { event: InngestEvents.SYNC_PREDICATE },
    async ({ event: { data }, attempt }) => {
      if (!data) return;
      try {
        console.log(`Syncing predicate ${data.address}...`);
        const syncPredicate = new SyncPredicate();
        await syncPredicate.execute(data);
      } catch (error) {
        console.error(error);
        throw new RetryAfterError(`Sync predicate attempt ${attempt}`, '1s', {
          cause: error,
        });
      }
    },
  );
