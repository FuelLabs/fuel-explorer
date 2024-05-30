import { eq } from 'drizzle-orm';
import type { DbConnection, DbTransaction } from '~/infra/database/Db';
import { PredicateEntity } from './PredicateEntity';
import { type PredicatePayload, PredicatesTable } from './PredicateModel';

export class PredicateRepository {
  constructor(readonly conn: DbConnection | DbTransaction) {}

  async findByAddress(address: string) {
    const [first] = await this.conn
      .select()
      .from(PredicatesTable)
      .where(eq(PredicatesTable.address, address))
      .limit(1);

    if (!first) return null;
    return PredicateEntity.create(first, first._id);
  }

  async insertMany(predicates: PredicatePayload[]) {
    const values = predicates.map(PredicateEntity.toDBItem);
    await this.conn
      .insert(PredicatesTable)
      .values(values)
      .onConflictDoNothing();
  }
}
