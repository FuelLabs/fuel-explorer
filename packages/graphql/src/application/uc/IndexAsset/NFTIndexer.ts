import { DatabaseConnection } from '~/infra/database/DatabaseConnection';

export default class NFTIndexer {
  async execute(asset: any) {
    const connection = DatabaseConnection.getInstance();
    try {
      const [collection] = await connection.query(
        'select * from indexer.collections where contract_id = $1',
        [asset.contractId],
      );
      if (!collection) return;
      const url = collection.url.replace('{subId}', Number(asset.subId));
      const response = await fetch(url);
      const metadata = await response.json();
      asset.metadata = {
        ...asset.metadata,
        ...metadata,
      };
      await connection.query(
        'update indexer.assets_contracts set metadata = $1 where asset_id = $2',
        [asset.metadata, asset.assetId],
      );
    } catch (_e: any) {}
  }
}
