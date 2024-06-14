import { Hash256, type SerialID } from '~/application/vo';
import { Entity } from '~/core/Entity';
import type { GQLOperation } from '~/graphql/generated/sdk-provider';
import type { TransactionItem } from '../Transaction/TransactionModel';
import { TransactionRef } from '../Transaction/vo/TransactionRef';
import type { OperationItem } from './OperationModel';
import { OperationData } from './vo/OperationData';

type OperationProps = {
  data: OperationData;
  transactionId: TransactionRef;
  transactionHash: Hash256;
};

export class OperationEntity extends Entity<OperationProps, SerialID> {
  static create(operation: GQLOperation, txId: string, txHash: string) {
    const data = OperationData.create(operation);
    const transactionId = TransactionRef.create(txId);
    const transactionHash = Hash256.create(txHash);
    const props = {
      data,
      transactionId,
      transactionHash,
    };
    return new OperationEntity(props);
  }

  static toDBItem(
    operation: GQLOperation,
    transactionId: TransactionItem['_id'],
    transactionHash: TransactionItem['txHash'],
  ): Omit<OperationItem, '_id'> {
    return {
      data: operation,
      transactionId,
      transactionHash,
    };
  }

  get data() {
    return this.props.data.value();
  }

  get transactionId() {
    return this.props.transactionId.value();
  }

  get transactionHash() {
    return this.props.transactionHash.value();
  }

  toGQLNode() {
    const data = this.data;
    return { ...data, id: `${this.transactionId}-${this.transactionHash}` };
  }
}
