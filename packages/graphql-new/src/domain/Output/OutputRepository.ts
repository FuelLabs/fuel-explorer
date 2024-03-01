import { eq } from 'drizzle-orm';
import { GQLOutput } from '~/generated/types';
import { db } from '~/infra/database/Db';
import { OutputEntity } from './OutputEntity';
import { OutputsTable } from './OutputModel';

export class OutputRepository {
  async findOneById(id: number) {
    const [first] = await db
      .connection()
      .select()
      .from(OutputsTable)
      .where(eq(OutputsTable._id, id));

    if (!first) return null;
    return OutputEntity.create(first);
  }

  async insertOne(output: GQLOutput, transactionId: number) {
    const [item] = await db
      .connection()
      .insert(OutputsTable)
      .values(OutputEntity.toDBItem(output, transactionId))
      .returning();

    return OutputEntity.create(item);
  }

  async insertMany(outputs: GQLOutput[], transactionId: number) {
    return db.connection().transaction(async (trx) => {
      const queries = outputs.map(async (output) => {
        const [item] = await trx
          .insert(OutputsTable)
          .values(OutputEntity.toDBItem(output, transactionId))
          .returning();

        return OutputEntity.create(item);
      });
      return Promise.all(queries.filter(Boolean));
    });
  }
}
