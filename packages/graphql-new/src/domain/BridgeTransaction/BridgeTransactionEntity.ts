import { Hash256, SerialID } from '~/application/vo';
import { Entity } from '~/core/Entity';
import { GQLBridgeTransaction } from '~/graphql/generated/sdk';
import { BridgeTransactionItem } from './BridgeTransactionModel';
import { BridgeTransactionType } from './vo/BridgeTransactionType';

type BridgeTransactionInputProps = {
  id: SerialID;
  type: BridgeTransactionType;
  ethTxId: Hash256;
  fuelTxId: Hash256;
};

export class BridgeTransactionEntity extends Entity<
  BridgeTransactionInputProps,
  SerialID
> {
  static create(transaction: BridgeTransactionItem) {
    if (!transaction) {
      throw new Error('item is required');
    }

    const id = SerialID.create(transaction._id);
    const type = BridgeTransactionType.create(transaction.type);
    const ethTxId = Hash256.create(transaction.ethTxId);
    const fuelTxId = Hash256.create(transaction.fuelTxId);

    const props: BridgeTransactionInputProps = {
      id,
      type,
      ethTxId,
      fuelTxId,
    };

    return new BridgeTransactionEntity(props, id);
  }

  static toDBItem(transaction: GQLBridgeTransaction): BridgeTransactionItem {
    return {
      _id: SerialID.create(transaction.id).value(),
      type: BridgeTransactionType.create(transaction.type).value(),
      ethTxId: Hash256.create(transaction.ethTxId).value(),
      fuelTxId: Hash256.create(transaction.fuelTxId).value(),
    };
  }

  get type() {
    return this.props.type.value();
  }

  get ethTxId() {
    return this.props.ethTxId.value();
  }

  get fuelTxId() {
    return this.props.fuelTxId?.value() ?? null;
  }

  toGQLNode() {
    return {
      type: this.type,
      ethTxId: this.ethTxId,
      fuelTxId: this.fuelTxId,
    };
  }
}
