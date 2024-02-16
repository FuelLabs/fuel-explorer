import { BlockDomain } from '../domains/BlockDomain';
import { BlockRepository } from '../repositories/BlockRepository';
import { inngest } from './Inngest';

export class Sync {
  async syncBlocks(page = 1, perPage = 1000) {
    const domain = new BlockDomain();
    const { hasNext } = await domain.syncBlocks(page, perPage);

    if (hasNext) {
      await inngest.syncBlocks(page + 1, perPage);
    }
  }

  async syncMissingBlocks() {
    const blockRepository = new BlockRepository();
    const latest = await blockRepository.findLatestAdded();
    const id = latest?.data.header.height ?? null;
    if (!id) {
      throw new Error('No blocks found');
    }

    const page = Math.ceil(Number(id) / 1000);
    await this.syncBlocks(page);
  }
}
