import { Hash256, SerialID } from '~/application/vo';
import { Entity } from '~/core/Entity';
import { GQLOperation } from '~/graphql/generated/sdk';
import { TransactionItem } from '../Transaction/TransactionModel';
import { TransactionRef } from '../Transaction/vo/TransactionRef';
import { OperationItem, OperationPayload } from './OperationModel';
import { OperationData } from './vo/OperationData';

type OperationProps = {
  data: OperationData;
  transactionId: TransactionRef;
  transactionHash: Hash256;
};

export class OperationEntity extends Entity<OperationProps, SerialID> {
  static create(operation: OperationPayload, operationId: number) {
    const id = SerialID.create(operationId);
    const data = OperationData.create(operation.data);
    const transactionId = TransactionRef.create(operation.transactionId);
    const transactionHash = Hash256.create(operation.transactionHash);
    const props = {
      data,
      transactionId,
      transactionHash,
    };
    return new OperationEntity(props, id);
  }

  static toDBItem(
    operation: GQLOperation,
    transaction: TransactionItem,
  ): Omit<OperationItem, '_id'> {
    const data = OperationData.create(operation).value();
    const transactionId = TransactionRef.create(transaction._id).value();
    const transactionHash = Hash256.create(transaction.txHash).value();
    return {
      data,
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
    return { ...data, id: this._id.value() };
  }
}
