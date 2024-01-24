import { isAddress } from 'viem';
import type { BridgeAsset } from '~/systems/Bridge';
import { db } from '~/systems/Core/utils/database';

export type AssetServiceInputs = {
  addAsset: { asset: BridgeAsset };
  removeAsset: { address?: string };
};

export class AssetService {
  static async upsertAsset(input: { data: BridgeAsset }) {
    return db.transaction('rw!', db.assets, async () => {
      const { address, ...updateData } = input.data;
      const asset = await db.assets.get({ address });
      if (asset) {
        await db.assets.update(address || '', updateData);
      } else {
        await db.assets.add(input.data);
      }

      return db.assets.get({ address });
    });
  }

  static async addAsset(input: AssetServiceInputs['addAsset']) {
    return db.transaction('rw', db.assets, async () => {
      await db.assets.add(input.asset);
      return db.assets.get({ address: input.asset.address });
    });
  }

  static async removeAsset({ address }: AssetServiceInputs['removeAsset']) {
    if (!isAddress(address || '')) {
      throw new Error('Invalid address');
    }
    return db.transaction('rw', db.assets, async () => {
      await db.assets.delete(address || '');

      return true;
    });
  }

  static async getAssets() {
    return db.transaction('r', db.assets, async () => {
      return db.assets.toArray();
    });
  }
}
