import { db } from '../core/Database';
import { transactions } from '../core/Schema';
import { GQLTransaction } from '../generated/types';
import { tai64toDate } from '../utils/date';

export class TransactionRepository {
  async insert(transaction: GQLTransaction, blockId: number) {
    const [{ transactionId }] = await db
      .connection()
      .insert(transactions)
      .values(this.parseTransaction(transaction, blockId))
      .returning({
        transactionId: transactions._id,
      });

    return transactionId;
  }

  async insertMany(txs: GQLTransaction[], blockId: number) {
    return db.connection().transaction(async (trx) => {
      const queries = txs.map(async (tx) => {
        const [{ transactionId }] = await trx
          .insert(transactions)
          .values(this.parseTransaction(tx, blockId))
          .returning({
            transactionId: transactions._id,
          });
        return transactionId;
      });
      return Promise.all(queries);
    });
  }

  private parseTransaction(transaction: GQLTransaction, blockId: number) {
    return {
      id: transaction.id,
      data: transaction,
      blockId,
      accountsIndex: this._getAccounts(transaction),
      timestamp:
        transaction.status && 'time' in transaction.status
          ? tai64toDate(transaction.status.time)
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
