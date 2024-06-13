import { eq, like } from 'drizzle-orm';
import { Paginator, type PaginatorParams } from '~/core/Paginator';
import type { GQLTransaction } from '~/graphql/generated/sdk';
import type { DbConnection, DbTransaction } from '~/infra/database/Db';
import { TransactionEntity } from './TransactionEntity';
import { TransactionsTable } from './TransactionModel';

export class TransactionRepository {
  constructor(readonly conn: DbConnection | DbTransaction) {}

  async findByHash(id: string) {
    const transaction = await this.conn.query.TransactionsTable.findFirst({
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

  async upsertMany(
    inserts: { blockHeight: number; transaction: GQLTransaction }[],
    trx: DbTransaction,
  ) {
    const conn = trx || this.conn;
    const values = inserts.map((item, index) =>
      TransactionEntity.toDBItem(item.blockHeight, item.transaction, index),
    );
    await conn.insert(TransactionsTable).values(values).onConflictDoNothing();
  }
}
