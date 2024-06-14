import { Hash256 } from '~/application/vo';
import { GasCosts } from '~/application/vo/GasCosts';
import { ParsedTime } from '~/application/vo/ParsedTime';
import { Entity } from '~/core/Entity';
import type { GQLTransaction } from '~/graphql/generated/sdk-provider';
import { BlockRef } from '../Block/vo/BlockRef';
import { ContractEntity } from '../Contract/ContractEntity';
import { InputEntity } from '../Input/InputEntity';
import type { OperationEntity } from '../Operation/OperationEntity';
import { OperationsFactory } from '../Operation/factories/OperationsFactory';
import type { TransactionItem } from './TransactionModel';
import { AccountIndex } from './vo/AccountIndex';
import { TransactionData } from './vo/TransactionData';
import { TransactionGroupedInputs } from './vo/TransactionGroupedInputs';
import { TransactionGroupedOutputs } from './vo/TransactionGroupedOutputs';
import { TransactionModelID } from './vo/TransactionModelID';
import { TransactionStatus } from './vo/TransactionStatus';
import { TransactionTimestamp } from './vo/TransactionTimestamp';

type TransactionInputProps = {
  accountIndex: AccountIndex;
  blockId: BlockRef;
  data: TransactionData;
  gasCosts: GasCosts;
  groupedInputs: TransactionGroupedInputs;
  groupedOutputs: TransactionGroupedOutputs;
  operations?: OperationEntity[];
  status: TransactionStatus;
  time: ParsedTime;
  timestamp: TransactionTimestamp;
  txHash: Hash256;
};

export class TransactionEntity extends Entity<
  TransactionInputProps,
  TransactionModelID
> {
  static create(transaction: TransactionItem) {
    const item = transaction.data;
    if (!item) throw new Error('Transaction data is required');

    const accountIndex = AccountIndex.create(item);
    const blockRef = BlockRef.create(transaction.blockId);
    const data = TransactionData.create(item);
    const gasCosts = GasCosts.create(item);
    const groupedInputs = TransactionGroupedInputs.create(item);
    const groupedOutputs = TransactionGroupedOutputs.create(item);
    const id = TransactionModelID.create(transaction);
    const status = TransactionStatus.create(item);
    const time = ParsedTime.create(timeFromStatus(transaction));
    const timestamp = TransactionTimestamp.create(item);
    const txHash = Hash256.create(item.id);
    // TODO: this should come from the database relations
    const operations = OperationsFactory.create(item).entities(
      id.value(),
      txHash.value(),
    );

    const props = {
      accountIndex,
      blockId: blockRef,
      data,
      gasCosts,
      groupedInputs,
      groupedOutputs,
      operations,
      status,
      time,
      timestamp,
      txHash,
    };

    return new TransactionEntity(props, id);
  }

  static toDBItem(
    blockHeight: number,
    transaction: GQLTransaction,
    index: number,
  ): TransactionItem {
    return {
      _id: TransactionModelID.createSerial(blockHeight, index).value(),
      txHash: transaction.id,
      data: transaction,
      timestamp: TransactionTimestamp.create(transaction).value(),
      accountIndex: AccountIndex.create(transaction).value(),
      blockId: blockHeight,
    };
  }

  toGQLNode(): GQLTransaction {
    return {
      ...this.data,
      blockHeight: this.blockHeight,
      gasCosts: this.gasCosts,
      groupedInputs: this.groupedInputs,
      groupedOutputs: this.groupedOutputs,
      hasPredicate: this.hasPredicate,
      operations: this.operations,
      receipts: this.receipts,
      statusType: this.status.value(),
      status: this.status.data(),
      time: this.parsedTime,
      title: this.title,
    };
  }

  get gasCosts() {
    return this.props.gasCosts.value();
  }

  get txHash() {
    return this.props.txHash.value();
  }

  get data() {
    return this.props.data.value();
  }

  get receipts() {
    const status = this.props.status.data();
    if (status?.__typename !== 'SuccessStatus') return [];
    return status?.receipts ?? [];
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
