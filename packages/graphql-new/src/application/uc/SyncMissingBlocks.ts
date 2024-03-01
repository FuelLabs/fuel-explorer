import { IUseCase } from '~/core/UseCase';
import { BlockRepository } from '~/domain/Block/BlockRepository';
import { inngest } from '~/infra/inngest/InngestClient';

export class SyncMissingBlocks implements IUseCase<unknown, void> {
  async execute() {
    const repo = new BlockRepository();
    const latest = await repo.findLatestAdded();
    const id = latest?.data.header.height ?? null;
    if (!id) {
      throw new Error('No blocks found');
    }

    const page = Math.ceil(Number(id) / 1000);
    await inngest.syncBlocks(page);
  }
}
