import { eq, like } from 'drizzle-orm';
import { Paginator, PaginatorParams } from '~/core/Paginator';
import { GQLTransaction } from '~/graphql/generated/sdk';
import { db } from '~/infra/database/Db';
import { TransactionEntity } from './TransactionEntity';
import { TransactionsTable } from './TransactionModel';

export class TransactionRepository {
  async findByHash(id: string) {
    const [transaction] = await db
      .connection()
      .select()
      .from(TransactionsTable)
      .where(eq(TransactionsTable.txHash, id));
    if (!transaction) return null;
    return TransactionEntity.create(transaction);
  }

  async findMany(params: PaginatorParams) {
    const paginator = new Paginator(TransactionsTable, params);
    const results = await paginator.getPaginatedResult();
    return results.map((item) => TransactionEntity.create(item));
  }

  async findByOwner(params: PaginatorParams & { owner: string }) {
    const { owner } = params;
    const paginator = new Paginator(TransactionsTable, params);
    await paginator.validateParams();
    const paginateFn = like(TransactionsTable.accountsIndex, `%${owner}%`);
    const results = await paginator.getPaginatedResult(paginateFn);
    return results.map((item) => TransactionEntity.create(item));
  }

  async insertOne(transaction: GQLTransaction, blockId: number) {
    const found = await this.findByHash(transaction.id);
    if (found) {
      throw new Error(`Transaction ${transaction.id} already exists`);
    }

    const [item] = await db
      .connection()
      .insert(TransactionsTable)
      .values(TransactionEntity.toDBItem(transaction, blockId))
      .returning();

    return TransactionEntity.create(item);
  }

  async insertMany(txs: GQLTransaction[], blockId: number) {
    return db.connection().transaction(async (trx) => {
      const queries = txs.map(async (transaction) => {
        const found = await this.findByHash(transaction.id);
        if (found) {
          throw new Error(`Transaction ${transaction.id} already exists`);
        }

        const [item] = await trx
          .insert(TransactionsTable)
          .values(TransactionEntity.toDBItem(transaction, blockId))
          .returning();

        return TransactionEntity.create(item);
      });
      return Promise.all(queries);
    });
  }
}
