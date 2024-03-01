import { HashID } from '~/application/vo';
import { Entity } from '~/core/Entity';
import { GQLTransaction } from '~/generated/types';
import { BlockRef } from '../Block/vo/BlockRef';
import { TransactionItem } from './TransactionModel';
import { AccountIndex } from './vo/AccountIndex';
import { TransactionData } from './vo/TransactionData';
import { TransactionModelID } from './vo/TransactionModelID';
import { TransactionTimestamp } from './vo/TransactionTimestamp';

type TransactionProps = {
  transactionId: HashID;
  data: TransactionData;
  timestamp: TransactionTimestamp;
  accountIndex: AccountIndex;
  blockId: BlockRef;
};

export class TransactionEntity extends Entity<
  TransactionProps,
  TransactionModelID
> {
  private constructor(id: TransactionModelID, props: TransactionProps) {
    super(id, props);
  }

  get transactionId() {
    return this.props.transactionId.value();
  }
  get data() {
    return this.props.data.value();
  }
  get timestamp() {
    return this.props.timestamp.value();
  }
  get accountIndex() {
    return this.props.accountIndex.value();
  }
  get blockId() {
    return this.props.blockId.value();
  }

  static create(transaction: TransactionItem) {
    const item = transaction.data;
    const id = TransactionModelID.create(item);
    const transactionId = HashID.create(item.id);
    const data = TransactionData.create(item);
    const timestamp = TransactionTimestamp.create(item);
    const accountIndex = AccountIndex.create(item);
    const blockRef = BlockRef.create(transaction.blockId);
    return new TransactionEntity(id, {
      transactionId,
      data,
      timestamp,
      accountIndex,
      blockId: blockRef,
    });
  }

  static toDBItem(transaction: GQLTransaction, blockId: number) {
    return {
      _id: TransactionModelID.create(transaction).value(),
      transactionId: HashID.create(transaction.id).value(),
      data: TransactionData.create(transaction).value(),
      timestamp: TransactionTimestamp.create(transaction).value(),
      accountIndex: AccountIndex.create(transaction).value(),
      blockId: BlockRef.create(blockId).value(),
    };
  }

  toGQLNode(): GQLTransaction & { blockId: number; timestamp: Date | null } {
    return {
      ...this.data,
      blockId: this.blockId,
      timestamp: this.timestamp,
    };
  }
}
