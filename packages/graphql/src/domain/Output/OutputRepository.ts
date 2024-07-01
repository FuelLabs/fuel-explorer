import { eq } from 'drizzle-orm';
import type { GQLOutput } from '~/graphql/generated/sdk-provider';
import type { DbConnection, DbTransaction } from '~/infra/database/Db';
import type { TxID } from '../Transaction/vo/TransactionModelID';
import { OutputEntity } from './OutputEntity';
import { OutputsTable } from './OutputModel';

export class OutputRepository {
  constructor(readonly conn: DbConnection | DbTransaction) {}

  async findById(id: number) {
    const [first] = await this.conn
      .select()
      .from(OutputsTable)
      .where(eq(OutputsTable._id, id));

    if (!first) return null;
    return OutputEntity.create(first, first._id);
  }

  async insertOne(output: GQLOutput, transactionId: TxID) {
    const [item] = await this.conn
      .insert(OutputsTable)
      .values(OutputEntity.toDBItem(output, transactionId))
      .returning();

    return OutputEntity.create(item, item._id);
  }

  async insertMany(outputs: GQLOutput[], transactionId: TxID) {
    const values = outputs.map((output) =>
      OutputEntity.toDBItem(output, transactionId),
    );
    await this.conn.insert(OutputsTable).values(values);
  }
}
