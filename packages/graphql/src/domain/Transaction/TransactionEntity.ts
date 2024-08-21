import { Hash256 } from '~/application/vo';
import { GasCosts } from '~/application/vo/GasCosts';
import { ParsedTime } from '~/application/vo/ParsedTime';
import { Entity } from '~/core/Entity';
import { BlockRef } from '~/domain/Block/vo/BlockRef';
import type { GQLTransaction } from '~/graphql/generated/sdk-provider';
import { ContractEntity } from '../Contract/ContractEntity';
import { InputEntity } from '../Input/InputEntity';
import { OperationEntity } from '../Operation/OperationEntity';
import ReceiptsParser from './ReceiptsParser';
import ReceiptsParserAdapter from './ReceiptsParserAdapter';
import { TransactionData } from './vo/TransactionData';
import { TransactionGroupedInputs } from './vo/TransactionGroupedInputs';
import { TransactionGroupedOutputs } from './vo/TransactionGroupedOutputs';
import { TransactionModelID } from './vo/TransactionModelID';
import { TransactionStatus } from './vo/TransactionStatus';
import { TransactionTimestamp } from './vo/TransactionTimestamp';

type TransactionInputProps = {
  id: TransactionModelID;
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
  static create(
    item: GQLTransaction,
    blockRef: BlockRef,
    id: TransactionModelID,
  ) {
    if (!item) throw new Error('Transaction data is required');

    const data = TransactionData.create(item);
    const gasCosts = GasCosts.create(item);
    const groupedInputs = TransactionGroupedInputs.create(item);
    const groupedOutputs = TransactionGroupedOutputs.create(item);
    const status = TransactionStatus.create(item);
    const time = ParsedTime.create(timeFromStatus(item));
    const timestamp = TransactionTimestamp.create(item);
    const txHash = Hash256.create(item.id);
    // TODO: this should come from the database relations
    let operations: any = [];
    const parser = new ReceiptsParserAdapter(new ReceiptsParser());
    // Should show for other status like FailureStatus?
    // @ts-ignore
    if (item.status?.receipts) {
      // @ts-ignore
      const receipts = item.status?.receipts || [];
      operations = parser.parse(receipts) as any;
      operations = operations.map((operation: any) =>
        OperationEntity.create(operation, item._id || '', item.id),
      );
    }
    const props = {
      id,
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

    const transactionEntity = new TransactionEntity(props, id);
    // console.log(JSON.stringify(transactionEntity.operations));
    return transactionEntity;
  }

  static createFromDB(item: any) {
    const id = TransactionModelID.create(item);
    const blockId = BlockRef.create(item.blockId);
    return TransactionEntity.create(item.data, blockId, id);
  }

  static createFromDAO(item: any) {
    const id = TransactionModelID.create(item);
    const blockId = BlockRef.create(item.block_id);
    return TransactionEntity.create(item.data, blockId, id);
  }

  static createFromGQL(
    item: GQLTransaction,
    blockHeight: number,
    index: number,
  ) {
    const id = TransactionModelID.createSerial(blockHeight, index);
    const blockId = BlockRef.create(blockHeight);
    return TransactionEntity.create(item, blockId, id);
  }

  static toDBItem(
    blockHeight: number,
    transaction: GQLTransaction,
    index: number,
  ): any {
    return {
      _id: TransactionModelID.createSerial(blockHeight, index).value(),
      txHash: transaction.id,
      data: transaction,
      timestamp: TransactionTimestamp.create(transaction).value(),
      blockId: blockHeight,
    };
  }

  toGQLNode(): GQLTransaction {
    return {
      ...this.data,
      _id: this._id.value(),
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

  get cursor() {
    return this._id.value();
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

function timeFromStatus(item?: GQLTransaction) {
  if (!item) return null;
  if (item.status?.__typename === 'SqueezedOutStatus') return null;
  return item.status?.time;
}
