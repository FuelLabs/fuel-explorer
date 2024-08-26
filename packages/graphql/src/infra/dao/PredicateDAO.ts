import { DatabaseConnection } from '../database/DatabaseConnection';
import Predicate from './Predicate';

export default class PredicateDAO {
  databaseConnection: DatabaseConnection;

  constructor() {
    this.databaseConnection = DatabaseConnection.getInstance();
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
        [address],
      )
    )[0];
    if (!predicateData) return;
    const predicate = new Predicate(predicateData);
    return predicate;
  }
}
