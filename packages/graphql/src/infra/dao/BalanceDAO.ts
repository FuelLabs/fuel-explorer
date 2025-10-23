import { DatabaseConnectionReplica } from '../database/DatabaseConnectionReplica';

export default class BalanceDAO {
  databaseConnection: DatabaseConnectionReplica;

  constructor() {
    this.databaseConnection = DatabaseConnectionReplica.getInstance();
  }

  async getBalance(
    accountHash: string,
    assetId: string,
    blockHeight: number | null,
  ) {
    const [balanceData] = await this.databaseConnection.query(
      `
        select 
          block_height, 
          account_hash, 
          asset_id, 
          balance 
        from 
          indexer.balance 
        where 
          _id = (
            select 
              max(_id) 
            from 
              indexer.balance 
            where 
              account_hash = $1 and 
              asset_id = $2 and
              ($3::integer is null or block_height = $3)
          );
		  `,
      [accountHash, assetId, blockHeight],
    );
    return balanceData;
  }
}
