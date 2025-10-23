import { DatabaseConnectionReplica } from '../database/DatabaseConnectionReplica';
import Predicate from './Predicate';

export default class PredicateDAO {
  databaseConnection: DatabaseConnectionReplica;

  constructor() {
    this.databaseConnection = DatabaseConnectionReplica.getInstance();
  }

  async getByAddress(address: string) {
    const predicateData = (
      await this.databaseConnection.query(
        `
		  select
			  p.*
		  from
			  indexer.predicates p
		  where
			  p.address = $1
		  `,
        [address.toLowerCase()],
      )
    )[0];
    if (!predicateData) return;
    const predicate = new Predicate(predicateData);
    return predicate;
  }
}
