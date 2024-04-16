import { eq } from 'drizzle-orm';
import type { GQLOutput } from '~/graphql/generated/sdk';
import { db } from '~/infra/database/Db';
import type { TxID } from '../Transaction/vo/TransactionModelID';
import { OutputEntity } from './OutputEntity';
import { OutputsTable } from './OutputModel';

export class OutputRepository {
  async findById(id: number) {
    const [first] = await db
      .connection()
      .select()
      .from(OutputsTable)
      .where(eq(OutputsTable._id, id));

    if (!first) return null;
    return OutputEntity.create(first, first._id);
  }

  async insertOne(output: GQLOutput, transactionId: TxID) {
    const [item] = await db
      .connection()
      .insert(OutputsTable)
      .values(OutputEntity.toDBItem(output, transactionId))
      .returning();

    return OutputEntity.create(item, item._id);
  }

  async insertMany(outputs: GQLOutput[], transactionId: TxID) {
    return db.connection().transaction(async (trx) => {
      const queries = outputs.map(async (output) => {
        const [item] = await trx
          .insert(OutputsTable)
          .values(OutputEntity.toDBItem(output, transactionId))
          .returning();

        return OutputEntity.create(item, item._id);
      });
      return Promise.all(queries.filter(Boolean));
    });
  }
}
