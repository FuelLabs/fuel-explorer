import { Address } from '~/core/Address';
import type { GQLBlock } from '~/graphql/generated/sdk';
import type { QueueData, QueueInputs, QueueNames } from '~/infra/queue/Queue';
import { pool } from '~/infra/worker/WorkerPool';

type Input = QueueInputs[QueueNames.SYNC_TRANSACTION];

export class SyncTransaction {
  constructor(
    readonly txAddr: Address,
    readonly block: GQLBlock,
  ) {}

  async execute(input: Input) {
    await pool.run(input);
  }
}

export const syncTransaction = async ({ data }: QueueData<Input>) => {
  try {
    const txAddr = new Address(data.txHash);
    const syncTransactions = new SyncTransaction(txAddr, data.block);
    return syncTransactions.execute(data);
  } catch (error) {
    console.error(error);
    throw new Error(`Sync transactions ${data.txHash}`, {
      cause: error,
    });
  }
};
