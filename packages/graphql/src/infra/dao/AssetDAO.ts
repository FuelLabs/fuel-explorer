import { DatabaseConnection } from '../database/DatabaseConnection';

export default class BlockDAO {
  databaseConnection: DatabaseConnection;

  constructor() {
    this.databaseConnection = DatabaseConnection.getInstance();
  }

  async getByAssetId(assetId: string) {
    const assetData = (
      await this.databaseConnection.query(
        `
			select * from indexer.assets_contracts where asset_id = $1
		  `,
        [assetId],
      )
    )[0];
    if (!assetData) return;
    return {
      assetId: assetData.asset_id,
      contractId: assetData.contract_id,
      name: assetData.name,
      symbol: assetData.symbol,
      decimals: assetData.decimals,
    };
  }
}
