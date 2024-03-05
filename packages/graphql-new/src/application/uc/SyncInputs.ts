import { GetStepTools, RetryAfterError } from 'inngest';
import { InputEntity } from '~/domain/Input/InputEntity';
import { InputRepository } from '~/domain/Input/InputRepository';
import { GQLInput } from '~/graphql/generated/sdk';
import { Events, InngestEvents, inngest } from '~/infra/inngest/InngestClient';

type Step = GetStepTools<typeof inngest._client, InngestEvents.SYNC_INPUTS>;
type Props = {
  inputs: GQLInput[];
  transactionId: number;
};

export class SyncInputs {
  constructor(private readonly step: Step) {}

  async execute({ inputs, transactionId }: Props) {
    const repository = new InputRepository();
    const created = await repository.insertMany(inputs, transactionId);
    await this.syncPredicates(created);
  }

  private async syncPredicates(inputs: InputEntity[]) {
    const predicates = inputs
      .map((input) => input.predicateData)
      .filter(Boolean);

    const events = predicates.map<Events[InngestEvents.SYNC_PREDICATE]>(
      (predicate) => ({
        name: InngestEvents.SYNC_PREDICATE,
        data: predicate,
      }),
    );

    await this.step.sendEvent('sync:predicates', events);
  }
}

export const syncInputs = inngest
  .client()
  .createFunction(
    { id: 'sync:inputs', concurrency: 100 },
    { event: InngestEvents.SYNC_INPUTS },
    async ({ event: { data }, attempt, step }) => {
      try {
        console.log(`Syncing inputs for transaction ${data.transactionId}...`);
        const syncInputs = new SyncInputs(step);
        await syncInputs.execute(data);
      } catch (error) {
        console.error(error);
        throw new RetryAfterError(`Sync inputs attempt ${attempt}`, '1s', {
          cause: error,
        });
      }
    },
  );
