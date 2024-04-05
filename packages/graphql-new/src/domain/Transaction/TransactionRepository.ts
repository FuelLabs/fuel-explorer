import { eq, like, sql } from 'drizzle-orm';
import { Paginator, PaginatorParams } from '~/core/Paginator';
import { GraphQLSDK } from '~/graphql/GraphQLSDK';
import { GQLBlock, GQLTransaction } from '~/graphql/generated/sdk';
import { db } from '~/infra/database/Db';
import { TransactionEntity } from './TransactionEntity';
import { TransactionsTable } from './TransactionModel';

export class TransactionRepository {
  async findByHash(id: string) {
    const [transaction] = await db
      .connection()
      .select()
      .from(TransactionsTable)
      .where(eq(TransactionsTable.txHash, id))
      .limit(1);
    if (!transaction) return null;
    return TransactionEntity.create(transaction);
  }

  async findMany(params: PaginatorParams) {
    const paginator = new Paginator(TransactionsTable, params);
    const lastSql = this.getLastSql();
    const config = await paginator.getQueryPaginationConfig(lastSql);
    const results = await paginator.getPaginatedResult(config);
    return results.map((item) => TransactionEntity.create(item));
  }

  async findByOwner(params: PaginatorParams & { owner: string }) {
    const { owner } = params;
    const paginator = new Paginator(TransactionsTable, params);
    await paginator.validateParams();

    const lastSql = this.getLastSql();
    const config = await paginator.getQueryPaginationConfig(lastSql);
    const paginateFn = like(TransactionsTable.accountIndex, `%${owner}%`);
    const results = await paginator.getPaginatedResult(config, paginateFn);

    return Promise.all(results.map((item) => TransactionEntity.create(item)));
  }

  async insertOne(txHash: string, block: GQLBlock, index: number) {
    const found = await this.findByHash(txHash);
    if (found) return found;
    const { sdk } = new GraphQLSDK();
    const res = await sdk.transaction({ id: txHash });
    const transaction = res.data?.transaction as GQLTransaction;
    if (!transaction) throw new Error('Transaction not found');

    const dbItem = await TransactionEntity.toDBItem(block, transaction, index);
    const [item] = await db
      .connection()
      .insert(TransactionsTable)
      .values(dbItem)
      .returning();
    return TransactionEntity.create(item);
  }

  private getLastSql() {
    const idField = TransactionsTable._id;
    return sql`MAX(CAST(SUBSTRING(${idField} FROM POSITION('-' IN ${idField}) + 1) AS INTEGER))`;
  }
}
