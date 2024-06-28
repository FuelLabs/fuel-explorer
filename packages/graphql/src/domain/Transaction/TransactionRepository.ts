import { eq, like } from 'drizzle-orm';
import type { Paginator } from '~/core/Paginator';
import type {
  GQLBlock,
  GQLTransaction,
} from '~/graphql/generated/sdk-provider';
import type { DbConnection, DbTransaction } from '~/infra/database/Db';
import { TransactionEntity } from './TransactionEntity';
import { TransactionsTable } from './TransactionModel';

export class TransactionRepository {
  constructor(readonly conn: DbConnection | DbTransaction) {}

  async findByHash(id: string) {
    const transaction = await this.conn.query.TransactionsTable.findFirst({
      where: eq(TransactionsTable.txHash, id),
    });

    if (!transaction) return null;
    return TransactionEntity.create(transaction);
  }

  async findMany(paginator: Paginator<typeof TransactionsTable>) {
    const config = await paginator.getQueryPaginationConfig();
    const query = await paginator.getPaginatedQuery(config);
    const results = paginator.getPaginatedResult(query);
    return results.map((item) => TransactionEntity.create(item));
  }

  async findByOwner(
    paginator: Paginator<typeof TransactionsTable>,
    owner: string,
  ) {
    await paginator.validateParams();
    const config = await paginator.getQueryPaginationConfig();
    const paginateFn = like(TransactionsTable.accountIndex, `%${owner}%`);
    const query = await paginator.getPaginatedQuery(config, paginateFn);
    const results = paginator.getPaginatedResult(query);
    return Promise.all(results.map((item) => TransactionEntity.create(item)));
  }

  async upsertMany(
    inserts: {
      block: Omit<GQLBlock, 'transactions'>;
      transaction: GQLTransaction;
    }[],
    trx: DbTransaction,
  ) {
    const conn = trx || this.conn;
    const values = inserts.map((item, index) =>
      TransactionEntity.toDBItem(
        Number(item.block.header.height),
        this.addBlockToTx(item.transaction, item.block),
        index,
      ),
    );
    await conn.insert(TransactionsTable).values(values).onConflictDoNothing();
  }

  private addBlockToTx(
    item: GQLTransaction,
    block: Omit<GQLBlock, 'transactions'>,
  ) {
    if (
      item.status &&
      (item.status.__typename === 'FailureStatus' ||
        item.status.__typename === 'SuccessStatus')
    ) {
      item.status.block = block as GQLBlock;
    }
    return item;
  }
}
