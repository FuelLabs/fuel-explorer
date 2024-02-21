import { TransactionsTable } from '~/infra/database/schema';
import { HashID } from '~/shared/vo';
import { TransactionResolver } from './TransactionResolver';
import { AccountIndex } from './vo/AccountIndex';
import { TransactionData } from './vo/TransactionData';
import { TransactionID } from './vo/TransactionID';
import { TransactionTimestamp } from './vo/TransactionTimestamp';

type TransactionItem = typeof TransactionsTable.$inferSelect;

export class TransactionDomain {
  private _id: TransactionID;
  private id: HashID;
  private timestamp: TransactionTimestamp;
  private data: TransactionData;
  private accountsIndex: AccountIndex;

  constructor(transaction: TransactionItem) {
    this._id = TransactionID.create(transaction.data);
    this.id = HashID.create(transaction.id);
    this.timestamp = TransactionTimestamp.create(transaction.data);
    this.data = TransactionData.create(transaction.data);
    this.accountsIndex = AccountIndex.create(transaction.data);
  }

  getInternalId() {
    return this._id.get();
  }
  getId() {
    return this.id.get();
  }
  getTimestamp() {
    return this.timestamp.get();
  }
  getData() {
    return this.data.get();
  }
  getAccountsIndex() {
    return this.accountsIndex.get();
  }

  static getResolvers() {
    return new TransactionResolver().getResolvers();
  }
}
