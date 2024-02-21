import { eq, like } from 'drizzle-orm';
import { GQLTransaction } from '~/generated/types';
import { db } from '~/infra/database/Db';
import { Paginator, PaginatorParams } from '~/shared/service';
import { HashID } from '~/shared/vo';
import { BlockRef } from '../blocks/vo/BlockRef';
import { TransactionsTable } from './TransactionModel';
import { AccountIndex } from './vo/AccountIndex';
import { TransactionData } from './vo/TransactionData';
import { TransactionID } from './vo/TransactionID';
import { TransactionTimestamp } from './vo/TransactionTimestamp';

export class TransactionRepository {
  async findById(id: string) {
    const [transaction] = await db
      .connection()
      .select()
      .from(TransactionsTable)
      .where(eq(TransactionsTable.id, id));
    if (!transaction) return null;
    return transaction;
  }

  async findMany(params: PaginatorParams) {
    const paginator = new Paginator(TransactionsTable, params);
    return paginator.queryPaginated();
  }

  async findByOwner(owner: string, params: PaginatorParams) {
    const paginator = new Paginator(TransactionsTable, params);
    await paginator.validateParams();
    const results = await paginator.getPaginatedResult(
      like(TransactionsTable.accountsIndex, `%${owner}%`),
    );
    return paginator.createPaginatedResult(results);
  }

  async insertOne(transaction: GQLTransaction, blockId: number) {
    const [{ transactionId }] = await db
      .connection()
      .insert(TransactionsTable)
      .values(this._createItem(transaction, blockId))
      .returning({
        transactionId: TransactionsTable._id,
      });

    return transactionId;
  }

  async insertMany(txs: GQLTransaction[], blockId: number) {
    return db.connection().transaction(async (trx) => {
      const queries = txs.map(async (transaction) => {
        const [{ transactionId }] = await trx
          .insert(TransactionsTable)
          .values(this._createItem(transaction, blockId))
          .returning({
            transactionId: TransactionsTable._id,
          });
        return transactionId;
      });
      return Promise.all(queries);
    });
  }

  private _createItem(transaction: GQLTransaction, blockId: number) {
    const _id = TransactionID.create(transaction);
    const id = HashID.create(transaction.id);
    const data = TransactionData.create(transaction);
    const blockIdRef = BlockRef.create(blockId);
    const accountsIndex = AccountIndex.create(transaction);
    const timestamp = TransactionTimestamp.create(transaction);
    return {
      _id: _id.get(),
      id: id.get(),
      data: data.get(),
      blockId: blockIdRef.get(),
      accountsIndex: accountsIndex.get(),
      timestamp: timestamp.get(),
    };
  }
}
