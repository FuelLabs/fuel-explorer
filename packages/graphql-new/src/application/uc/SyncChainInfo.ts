import { RetryAfterError } from 'inngest';
import { ChainRepository } from '~/domain/Chain/ChainRepository';
import { InngestEvents, inngest } from '~/infra/inngest/InngestClient';

export class SyncChainInfo {
  async execute(): Promise<void> {
    const chainRepository = new ChainRepository();
    const chain = await chainRepository.chainInfoFromNode();
    await chainRepository.insertOne(chain);
  }
}

export const syncChainInfo = inngest
  .client()
  .createFunction(
    { id: 'sync:chain-info', concurrency: 1 },
    { event: InngestEvents.SYNC_CHAIN_INFO },
    async ({ attempt }) => {
      try {
        console.log('Syncing chain info');
        const syncChainInfo = new SyncChainInfo();
        await syncChainInfo.execute();
      } catch (error) {
        console.error(error);
        throw new RetryAfterError(`Sync chain info attempt ${attempt}`, '1s', {
          cause: error,
        });
      }
    },
  );
