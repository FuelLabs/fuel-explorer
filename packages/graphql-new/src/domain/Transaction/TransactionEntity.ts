import { HashID } from '~/application/vo';
import { ParsedTime } from '~/application/vo/ParsedTime';
import { Entity } from '~/core/Entity';
import { GQLTransaction } from '~/graphql/generated/sdk';
import { BlockRef } from '../Block/vo/BlockRef';
import { ContractEntity } from '../Contract/ContractEntity';
import { TransactionItem } from './TransactionModel';
import { AccountIndex } from './vo/AccountIndex';
import { TransactionData } from './vo/TransactionData';
import { TransactionModelID } from './vo/TransactionModelID';
import { TransactionStatus } from './vo/TransactionStatus';
import { TransactionTimestamp } from './vo/TransactionTimestamp';

type TransactionProps = {
  status: TransactionStatus;
  txHash: HashID;
  data: TransactionData;
  timestamp: TransactionTimestamp;
  accountIndex: AccountIndex;
  blockId: BlockRef;
  time: ParsedTime;
};

export class TransactionEntity extends Entity<
  TransactionProps,
  TransactionModelID
> {
  static create(transaction: TransactionItem) {
    const item = transaction.data;
    const id = TransactionModelID.create(item);
    const status = TransactionStatus.create(item);
    const txHash = HashID.create(item.id);
    const data = TransactionData.create(item);
    const timestamp = TransactionTimestamp.create(item);
    const accountIndex = AccountIndex.create(item);
    const blockRef = BlockRef.create(transaction.blockId);
    const time = ParsedTime.create(timeFromStatus(transaction));
    const props = {
      status,
      txHash,
      data,
      time,
      timestamp,
      accountIndex,
      blockId: blockRef,
    };
    return new TransactionEntity(props, id);
  }

  static toDBItem(
    transaction: GQLTransaction,
    blockId: number,
  ): TransactionItem {
    return {
      _id: TransactionModelID.create(transaction).value(),
      txHash: HashID.create(transaction.id).value(),
      data: TransactionData.create(transaction).value(),
      timestamp: TransactionTimestamp.create(transaction).value(),
      accountsIndex: AccountIndex.create(transaction).value(),
      blockId: BlockRef.create(blockId).value(),
    };
  }

  toGQLNode() {
    return {
      ...this.data,
      time: this.parsedTime,
    };
  }

  get txHash() {
    return this.props.txHash.value();
  }

  get data() {
    return this.props.data.value();
  }

  get timestamp() {
    return this.props.timestamp.value();
  }

  get parsedTime() {
    return this.props.time.value();
  }

  get accountIndex() {
    return this.props.accountIndex.value();
  }

  get inputs() {
    return this.data.inputs;
  }

  get outputs() {
    return this.data.outputs;
  }

  get blockHeight() {
    return this.props.blockId.value();
  }

  get title() {
    const transaction = this.data;
    if (transaction.isMint) return 'Mint';
    if (transaction.isCreate) return 'Contract Created';
    return 'Script';
  }

  get status() {
    return this.props.status;
  }

  getContractsCreated() {
    if (!this.status.is('Success')) return [];
    return ContractEntity.fromOutputs(this.outputs);
  }
}

function timeFromStatus(item?: TransactionItem) {
  if (!item) return null;
  if (item.data.status?.__typename === 'SqueezedOutStatus') return null;
  return item.data.status?.time;
}
