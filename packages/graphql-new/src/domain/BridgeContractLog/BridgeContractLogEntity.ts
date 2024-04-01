import { Hash256, SerialID } from '~/application/vo';
import { Entity } from '~/core/Entity';
import { GQLBridgeContractLog } from '~/graphql/generated/sdk';

import { BridgeContractLogItem } from './BridgeContractLogModel';

import { BridgeContractLogBlockNumber } from './vo/BridgeContractLogBlockNumber';
import { BridgeContractLogName } from './vo/BridgeContractLogName';

type BridgeContractLogInputProps = {
  _id: SerialID;
  name: BridgeContractLogName;
  contractId: Hash256;
  sender: Hash256;
  recipient: Hash256;
  blockNumber: BridgeContractLogBlockNumber;
};

export class BridgeContractLogEntity extends Entity<
  BridgeContractLogInputProps,
  SerialID
> {
  static create(log: BridgeContractLogItem) {
    const _id = SerialID.create(log._id);
    const name = BridgeContractLogName.create(log.name);
    const contractId = Hash256.create(log.contractId);
    const sender = Hash256.create(log.sender);
    const recipient = Hash256.create(log.recipient);
    const blockNumber = BridgeContractLogBlockNumber.create(log.blockNumber);

    const props: BridgeContractLogInputProps = {
      _id,
      name,
      contractId,
      sender,
      recipient,
      blockNumber,
    };

    return new BridgeContractLogEntity(props, _id);
  }

  static toDBItem(log: GQLBridgeContractLog): BridgeContractLogItem {
    return {
      _id: SerialID.create(log._id).value(),
      name: BridgeContractLogName.create(log.name).value(),
      contractId: Hash256.create(log.contractId).value(),
      sender: Hash256.create(log.sender).value(),
      recipient: Hash256.create(log.recipient).value(),
      blockNumber: BridgeContractLogBlockNumber.create(log.blockNumber).value(),
    };
  }

  get id() {
    return this.props._id.value();
  }

  get name() {
    return this.props.name.value();
  }

  get contractId() {
    return this.props.contractId.value();
  }

  get sender() {
    return this.props.sender.value();
  }

  get recipient() {
    return this.props.recipient.value();
  }

  get blockNumber() {
    return this.props.blockNumber.value();
  }

  toGQLNode(): Omit<GQLBridgeContractLog, '__typename'> {
    return {
      _id: this.id,
      name: this.name,
      contractId: this.contractId,
      sender: this.sender,
      recipient: this.recipient,
      blockNumber: this.blockNumber,
    };
  }
}
