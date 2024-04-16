import { eq } from 'drizzle-orm';
import type { GQLInput } from '~/graphql/generated/sdk';
import { db } from '~/infra/database/Db';
import type { TxID } from '../Transaction/vo/TransactionModelID';
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

  async insertOne(input: GQLInput, transactionId: TxID) {
    const [item] = await db
      .connection()
      .insert(InputsTable)
      .values(InputEntity.toDBItem(input, transactionId))
      .returning();

    return InputEntity.create(item, item._id);
  }

  async insertMany(inputs: GQLInput[], transactionId: TxID) {
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
