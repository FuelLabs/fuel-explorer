import type { Table } from 'dexie';
import Dexie from 'dexie';
import type { BridgeAsset } from '~/systems/Bridge';

export class FuelDB extends Dexie {
  assets!: Table<BridgeAsset, string>;

  constructor() {
    super('FuelDB');
    this.version(1).stores({
      assets: '&address, $symbol',
    });
  }

  async clear() {
    await Promise.all([this.assets.clear()]);
  }
}

export const db = new FuelDB();
