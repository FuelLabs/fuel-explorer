import { eq } from 'drizzle-orm';
import type { GQLInput } from '~/graphql/generated/sdk';
import type { DbConnection, DbTransaction } from '~/infra/database/Db';
import type { TxID } from '../Transaction/vo/TransactionModelID';
import { InputEntity } from './InputEntity';
import { InputsTable } from './InputModel';

export class InputRepository {
  constructor(readonly conn: DbConnection | DbTransaction) {}

  async findById(id: number) {
    const [first] = await this.conn
      .select()
      .from(InputsTable)
      .where(eq(InputsTable._id, id));

    if (!first) return null;
    return InputEntity.create(first, first._id);
  }

  async insertOne(input: GQLInput, transactionId: TxID) {
    const [item] = await this.conn
      .insert(InputsTable)
      .values(InputEntity.toDBItem(input, transactionId))
      .returning();

    return InputEntity.create(item, item._id);
  }

  async insertMany(inputs: GQLInput[], transactionId: TxID) {
    const queries = inputs.map(async (input) => {
      const [item] = await this.conn
        .insert(InputsTable)
        .values(InputEntity.toDBItem(input, transactionId))
        .returning();

      return InputEntity.create(item, item._id);
    });
    return Promise.all(queries.filter(Boolean));
  }
}
