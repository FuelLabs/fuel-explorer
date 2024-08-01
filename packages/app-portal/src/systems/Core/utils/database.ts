import type { Asset } from '@fuel-ts/account';
import type { Table } from 'dexie';
import Dexie from 'dexie';

export class FuelDB extends Dexie {
  assets!: Table<Asset, string>;

  constructor() {
    super('FuelDB');
    this.version(1).stores({
      assets: '&name, $symbol',
    });
  }

  async clear() {
    await Promise.all([this.assets.clear()]);
  }
}

export const db = new FuelDB();
