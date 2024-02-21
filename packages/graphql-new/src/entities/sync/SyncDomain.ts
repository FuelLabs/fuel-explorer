import { inngest } from '~/infra/inngest/Inngest';
import { BlockDomain } from '../blocks/BlockDomain';
import { BlockRepository } from '../blocks/BlockRepository';

export class SyncDomain {
  static async syncBlocks(page = 1, perPage = 1000) {
    const { hasNext } = await BlockDomain.syncBlocks(page, perPage);

    if (hasNext) {
      await inngest.syncBlocks(page + 1, perPage);
    }
  }

  static async syncMissingBlocks() {
    const blockRepository = new BlockRepository();
    const latest = await blockRepository.findLatestAdded();
    const id = latest?.data.header.height ?? null;
    if (!id) {
      throw new Error('No blocks found');
    }

    const page = Math.ceil(Number(id) / 1000);
    await SyncDomain.syncBlocks(page);
  }
}
