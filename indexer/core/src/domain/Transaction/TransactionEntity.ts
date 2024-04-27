import { Hash256 } from '@core/application/vo';
import { ParsedTime } from '@core/application/vo/ParsedTime';
import type { GQLBlock, GQLTransaction } from '@core/generated/gql-types';
import { Entity } from '@core/shared/Entity';
import { BlockRef } from '../Block/vo/BlockRef';
import { ContractEntity } from '../Contract/ContractEntity';
import { InputEntity } from '../Input/InputEntity';
import type { TransactionItem, TransactionPayload } from './TransactionModel';
import { AccountIndex } from './vo/AccountIndex';
import { TransactionGroupedInputs } from './vo/TransactionGroupedInputs';
import { TransactionGroupedOutputs } from './vo/TransactionGroupedOutputs';
import { TransactionModelID } from './vo/TransactionModelID';
import { TransactionNodeRef } from './vo/TransactionNodeRef';
import { TransactionStatus } from './vo/TransactionStatus';
import { TransactionTimestamp } from './vo/TransactionTimestamp';

import type { NodeItem } from '../Node/NodeModel';
import { OperationEntity } from '../Operation/OperationEntity';

type TransactionInputProps = {
  accountIndex: AccountIndex;
  blockId: BlockRef;
  data: TransactionNodeRef;
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
  static create(payload: TransactionPayload) {
    if (!payload) {
      throw new Error('Payload is required for create TransactionEntity');
    }

    const data = TransactionNodeRef.create(payload.node);
    const transaction = data.value();
    const id = TransactionModelID.create(payload);
    const accountIndex = AccountIndex.create(transaction);
    const blockRef = BlockRef.create(payload.blockId);
    const groupedInputs = TransactionGroupedInputs.create(transaction);
    const groupedOutputs = TransactionGroupedOutputs.create(transaction);
    const status = TransactionStatus.create(transaction);
    const time = ParsedTime.create(timeFromStatus(payload.node));
    const timestamp = TransactionTimestamp.create(transaction);
    const txHash = Hash256.create(transaction.id);
    const operations = payload.operations?.map((o) =>
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
    node: NodeItem,
    block: GQLBlock,
    index: number,
  ): TransactionItem {
    const transaction = node.data as GQLTransaction;
    return {
      _id: TransactionModelID.createSerial(block, index).value(),
      txHash: Hash256.create(transaction.id).value(),
      nodeRef: TransactionNodeRef.create(node).id(),
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

function timeFromStatus(item?: NodeItem | null) {
  if (!item) return null;
  const data = item.data as GQLTransaction;
  if (data.status?.__typename === 'SqueezedOutStatus') return null;
  return data.status?.time;
}
