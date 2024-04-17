import { eq, like } from 'drizzle-orm';
import { Paginator, type PaginatorParams } from '~/core/Paginator';
import { GraphQLSDK } from '~/graphql/GraphQLSDK';
import type { GQLBlock, GQLTransaction } from '~/graphql/generated/sdk';
import { db } from '~/infra/database/Db';
import { TransactionEntity } from './TransactionEntity';
import { TransactionsTable } from './TransactionModel';

export class TransactionRepository {
  async findByHash(id: string) {
    const transaction = await db
      .connection()
      .query.TransactionsTable.findFirst({
        where: eq(TransactionsTable.txHash, id),
        with: {
          operations: true,
        },
      });

    if (!transaction) return null;

    return TransactionEntity.create(transaction);
  }

  async findMany(params: PaginatorParams) {
    const paginator = new Paginator(TransactionsTable, params);
    const config = await paginator.getQueryPaginationConfig();
    const query = await paginator.getPaginatedQuery(config);
    const results = paginator.getPaginatedResult(query);
    return results.map((item) => TransactionEntity.create(item));
  }

  async findByOwner(params: PaginatorParams & { owner: string }) {
    const { owner } = params;
    const paginator = new Paginator(TransactionsTable, params);
    await paginator.validateParams();

    const config = await paginator.getQueryPaginationConfig();
    const paginateFn = like(TransactionsTable.accountIndex, `%${owner}%`);
    const query = await paginator.getPaginatedQuery(config, paginateFn);
    const results = paginator.getPaginatedResult(query);

    return Promise.all(results.map((item) => TransactionEntity.create(item)));
  }

  async insertOne(txHash: string, block: GQLBlock, index: number) {
    const found = await this.findByHash(txHash);
    if (found) return null;

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
}
