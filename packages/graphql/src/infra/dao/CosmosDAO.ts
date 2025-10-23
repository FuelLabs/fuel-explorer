import { DatabaseConnectionReplica } from '../database/DatabaseConnectionReplica';

export default class CosmosDAO {
  databaseConnection: DatabaseConnectionReplica;

  constructor() {
    this.databaseConnection = DatabaseConnectionReplica.getInstance();
  }

  async getCosmosEvents(type: string, key: string, value: string) {
    const events = await this.databaseConnection.query(
      'select r.*, e.* from indexer.cosmos_responses r join indexer.cosmos_events e on (e.cosmos_response_id = r._id) where type = $1 and key = $2 and value = $3',
      [type, key, value],
    );
    return events;
  }
}
