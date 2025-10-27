import { DatabaseConnectionReplica } from '../database/DatabaseConnectionReplica';

export default class L1DAO {
  databaseConnection: DatabaseConnectionReplica;

  constructor() {
    this.databaseConnection = DatabaseConnectionReplica.getInstance();
  }

  async getContractEvent(
    contractHash: string,
    event: string,
    key: string,
    value: string,
  ) {
    const events = await this.databaseConnection.query(
      'select * from indexer.contract_l1_logs l join indexer.contract_l1_args a on (a.contract_l1_log_id = l._id) where contract_hash = $1 and event = $2 and key = $3 and value = $4',
      [contractHash, event, key, value],
    );
    return events;
  }
}
