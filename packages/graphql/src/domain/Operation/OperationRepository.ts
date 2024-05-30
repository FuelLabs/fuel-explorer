import { eq } from 'drizzle-orm';
import { Paginator } from '~/core/Paginator';
import type {
  GQLOperation,
  GQLQueryOperationsArgs,
} from '~/graphql/generated/sdk';
import type { DbConnection, DbTransaction } from '~/infra/database/Db';
import type { TxID } from '../Transaction/vo/TransactionModelID';
import { OperationEntity } from './OperationEntity';
import { OperationsTable } from './OperationModel';

export class OperationRepository {
  constructor(readonly conn: DbConnection | DbTransaction) {}

  async findById(id: number) {
    const [first] = await this.conn
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

  async insertMany(
    operations: GQLOperation[],
    transactionId: TxID,
    transactionHash: string,
  ) {
    const values = operations.map((operation) =>
      OperationEntity.toDBItem(operation, transactionId, transactionHash),
    );
    await this.conn.insert(OperationsTable).values(values);
  }
}
