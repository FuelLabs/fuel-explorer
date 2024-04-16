import { eq } from 'drizzle-orm';
import { Paginator } from '~/core/Paginator';
import type {
  GQLOperation,
  GQLQueryOperationsArgs,
} from '~/graphql/generated/sdk';
import { db } from '~/infra/database/Db';
import { TransactionsTable } from '../Transaction/TransactionModel';
import type { TxID } from '../Transaction/vo/TransactionModelID';
import { OperationEntity } from './OperationEntity';
import { OperationsTable } from './OperationModel';

export class OperationRepository {
  async findById(id: number) {
    const [first] = await db
      .connection()
      .select()
      .from(OperationsTable)
      .where(eq(OperationsTable._id, id));

    if (!first) return null;
    return OperationEntity.create(first, first._id);
  }

  async findMany(params: GQLQueryOperationsArgs) {
    const txHash = params.filter.transactionHash;
    const paginator = new Paginator(OperationsTable, params);
    const where = eq(OperationsTable.transactionHash, txHash);
    const config = await paginator.getQueryPaginationConfig();
    const query = await paginator.getPaginatedQuery(config, where);
    const results = paginator.getPaginatedResult(query);
    return results.map((item) => OperationEntity.create(item, item._id));
  }

  async insertOne(operation: GQLOperation, transactionId: TxID) {
    const [transaction] = await db
      .connection()
      .select()
      .from(TransactionsTable)
      .where(eq(TransactionsTable._id, transactionId))
      .limit(1);

    const [item] = await db
      .connection()
      .insert(OperationsTable)
      .values(OperationEntity.toDBItem(operation, transaction))
      .returning();
    return OperationEntity.create(item, item._id);
  }

  async insertMany(operations: GQLOperation[], transactionId: TxID) {
    return db.connection().transaction(async (trx) => {
      const queries = operations.map(async (operation) => {
        const [transaction] = await trx
          .select()
          .from(TransactionsTable)
          .where(eq(TransactionsTable._id, transactionId))
          .limit(1);

        const [item] = await trx
          .insert(OperationsTable)
          .values(OperationEntity.toDBItem(operation, transaction))
          .returning();

        return OperationEntity.create(item, item._id);
      });
      return Promise.all(queries.filter(Boolean));
    });
  }
}
