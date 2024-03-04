import { eq } from 'drizzle-orm';
import { GQLInput } from '~/graphql/generated/sdk';
import { db } from '~/infra/database/Db';
import { InputEntity } from './InputEntity';
import { InputsTable } from './InputModel';

export class InputRepository {
  async findById(id: number) {
    const [first] = await db
      .connection()
      .select()
      .from(InputsTable)
      .where(eq(InputsTable._id, id));

    if (!first) return null;
    return InputEntity.create(first, first._id);
  }

  async insertOne(input: GQLInput, transactionId: number) {
    const [item] = await db
      .connection()
      .insert(InputsTable)
      .values(InputEntity.toDBItem(input, transactionId))
      .returning();

    return InputEntity.create(item, item._id);
  }

  async insertMany(inputs: GQLInput[], transactionId: number) {
    return db.connection().transaction(async (trx) => {
      const queries = inputs.map(async (input) => {
        const [item] = await trx
          .insert(InputsTable)
          .values(InputEntity.toDBItem(input, transactionId))
          .returning();

        return InputEntity.create(item, item._id);
      });
      return Promise.all(queries.filter(Boolean));
    });
  }
}
