import { Hash256 } from '~/application/vo';
import { ParsedTime } from '~/application/vo/ParsedTime';
import { Entity } from '~/core/Entity';
import type { GQLBlock, GQLTransaction } from '~/graphql/generated/sdk';
import { BlockRef } from '../Block/vo/BlockRef';
import { ContractEntity } from '../Contract/ContractEntity';
import { InputEntity } from '../Input/InputEntity';
import type { TransactionItem } from './TransactionModel';
import { AccountIndex } from './vo/AccountIndex';
import { TransactionData } from './vo/TransactionData';
import { TransactionGroupedInputs } from './vo/TransactionGroupedInputs';
import { TransactionGroupedOutputs } from './vo/TransactionGroupedOutputs';
import { TransactionModelID } from './vo/TransactionModelID';
import { TransactionStatus } from './vo/TransactionStatus';
import { TransactionTimestamp } from './vo/TransactionTimestamp';

import { OperationEntity } from '../Operation/OperationEntity';

type TransactionInputProps = {
  accountIndex: AccountIndex;
  blockId: BlockRef;
  data: TransactionData;
  groupedInputs: TransactionGroupedInputs;
  groupedOutputs: TransactionGroupedOutputs;
  status: TransactionStatus;
  time: ParsedTime;
  timestamp: TransactionTimestamp;
  txHash: Hash256;
  operations?: OperationEntity[];
};

export class TransactionEntity extends Entity<
  TransactionInputProps,
  TransactionModelID
> {
  static create(transaction: TransactionItem) {
    const item = transaction.data;
    if (!item) throw new Error('Transaction data is required');
    const id = TransactionModelID.create(transaction);
    const accountIndex = AccountIndex.create(item);
    const blockRef = BlockRef.create(transaction.blockId);
    const data = TransactionData.create(item);
    const groupedInputs = TransactionGroupedInputs.create(item);
    const groupedOutputs = TransactionGroupedOutputs.create(item);
    const status = TransactionStatus.create(item);
    const time = ParsedTime.create(timeFromStatus(transaction));
    const timestamp = TransactionTimestamp.create(item);
    const txHash = Hash256.create(item.id);
    const operations = transaction.operations?.map((o) =>
      OperationEntity.create(o, o._id),
    );

    const props = {
      blockId: blockRef,
      status,
      txHash,
      data,
      time,
      timestamp,
      accountIndex,
      groupedInputs,
      groupedOutputs,
      operations,
    };

    return new TransactionEntity(props, id);
  }

  static toDBItem(
    block: GQLBlock,
    transaction: GQLTransaction,
    index: number,
  ): TransactionItem {
    return {
      _id: TransactionModelID.createSerial(block, index).value(),
      txHash: Hash256.create(transaction.id).value(),
      data: TransactionData.create(transaction).value(),
      timestamp: TransactionTimestamp.create(transaction).value(),
      accountIndex: AccountIndex.create(transaction).value(),
      blockId: BlockRef.create(Number(block.header.height)).value(),
    };
  }

  toGQLNode(): GQLTransaction {
    return {
      ...this.data,
      blockHeight: this.blockHeight,
      groupedInputs: this.groupedInputs,
      groupedOutputs: this.groupedOutputs,
      hasPredicate: this.hasPredicate,
      statusType: this.status.value(),
      operations: this.operations,
      time: this.parsedTime,
      title: this.title,
    };
  }

  get txHash() {
    return this.props.txHash.value();
  }

  get data() {
    return this.props.data.value();
  }

  get receipts() {
    return this.data.receipts;
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

  get blockHeight() {
    return this.props.blockId.value().toString();
  }

  get title() {
    const transaction = this.data;
    if (transaction.isMint) return 'Mint';
    if (transaction.isCreate) return 'Contract Created';
    return 'Script';
  }

  get groupedInputs() {
    return this.props.groupedInputs.value();
  }

  get groupedOutputs() {
    return this.props.groupedOutputs.value();
  }

  get operations() {
    return this.props.operations?.map((o) => o.toGQLNode()) ?? [];
  }

  get status() {
    return this.props.status;
  }

  get hasPredicate() {
    const transactionId = this._id.value();
    return Boolean(
      this.data.inputs?.some((input) => {
        return InputEntity.create({ data: input, transactionId }).hasPredicate;
      }),
    );
  }

  getContractsCreated() {
    if (!this.status.is('Success')) return [];
    return ContractEntity.fromOutputs(this.data.outputs);
  }
}

function timeFromStatus(item?: TransactionItem) {
  if (!item) return null;
  if (item.data.status?.__typename === 'SqueezedOutStatus') return null;
  return item.data.status?.time;
}
