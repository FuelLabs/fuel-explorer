import { eq, like } from 'drizzle-orm';
import { GQLTransaction } from '~/generated/types';
import { DateHelper } from '~/helpers/Date';
import { Paginator, PaginatorParams } from '~/helpers/Paginator';
import { db } from '~/infra/database/Db';
import { TransactionsTable } from './TransactionModel';

export class TransactionRepository {
  async findById(id: string) {
    const [transaction] = await db
      .connection()
      .select()
      .from(TransactionsTable)
      .where(eq(TransactionsTable.id, id));
    if (!transaction) return null;
    return transaction.data;
  }

  async findMany(params: PaginatorParams) {
    const paginator = new Paginator(TransactionsTable, params);
    return paginator.queryPaginated();
  }

  async findByOwner(owner: string, params: PaginatorParams) {
    const paginator = new Paginator(TransactionsTable, params);
    await paginator.validateParams();
    return paginator.getPaginatedResult(
      like(TransactionsTable.accountsIndex, `%${owner}%`),
    );
  }

  async insertOne(transaction: GQLTransaction, blockId: number) {
    const [{ transactionId }] = await db
      .connection()
      .insert(TransactionsTable)
      .values(this._parseTransaction(transaction, blockId))
      .returning({
        transactionId: TransactionsTable._id,
      });

    return transactionId;
  }

  async insertMany(txs: GQLTransaction[], blockId: number) {
    return db.connection().transaction(async (trx) => {
      const queries = txs.map(async (tx) => {
        const [{ transactionId }] = await trx
          .insert(TransactionsTable)
          .values(this._parseTransaction(tx, blockId))
          .returning({
            transactionId: TransactionsTable._id,
          });
        return transactionId;
      });
      return Promise.all(queries);
    });
  }

  private _parseTransaction(transaction: GQLTransaction, blockId: number) {
    return {
      id: transaction.id,
      data: transaction,
      blockId,
      accountsIndex: this._getAccounts(transaction),
      timestamp:
        transaction.status && 'time' in transaction.status
          ? DateHelper.tai64toDate(transaction.status.time)
          : null,
    };
  }

  private _getAccounts(transaction: GQLTransaction): string {
    return [
      ...new Set(
        [
          transaction.inputContract?.contract.id || '',
          ...(transaction.inputs || []).reduce(
            (acc, i) => {
              switch (i.__typename) {
                case 'InputCoin':
                  return acc.concat([i.owner]);
                case 'InputMessage':
                  return acc.concat([i.recipient, i.sender]);
                case 'InputContract':
                  return acc.concat([i.contract.id]);
                default:
                  return acc;
              }
            },
            [] as Array<string>,
          ),
          ...(transaction.outputs || []).reduce(
            (acc, i) => {
              switch (i.__typename) {
                case 'ChangeOutput':
                  return acc.concat([i.to]);
                case 'CoinOutput':
                  return acc.concat([i.to]);
                default:
                  return acc;
              }
            },
            [] as Array<string>,
          ),
        ]
          .map((a) => a.toLocaleLowerCase())
          .filter((i) => !!i),
      ),
    ]
      .sort()
      .join('|');
  }
}
