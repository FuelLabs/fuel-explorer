import { eq } from 'drizzle-orm';
import { db } from '~/infra/database/Db';
import { PredicateEntity } from './PredicateEntity';
import { type PredicatePayload, PredicatesTable } from './PredicateModel';

export class PredicateRepository {
  async findByAddress(address: string) {
    const [first] = await db
      .connection()
      .select()
      .from(PredicatesTable)
      .where(eq(PredicatesTable.address, address))
      .limit(1);

    if (!first) return null;
    return PredicateEntity.create(first, first._id);
  }

  async insertOne(predicate: PredicatePayload) {
    const found = await this.findByAddress(predicate.address);
    if (found) return;

    const [item] = await db
      .connection()
      .insert(PredicatesTable)
      .values(PredicateEntity.toDBItem(predicate))
      .returning();
    return PredicateEntity.create(item, item._id);
  }
}
