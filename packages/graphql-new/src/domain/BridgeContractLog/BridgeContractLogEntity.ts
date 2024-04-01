import { Hash256, SerialID } from '~/application/vo';
import { Entity } from '~/core/Entity';
import { GQLBridgeContractLog } from '~/graphql/generated/sdk';

import { BridgeContractLogItem } from './BridgeContractLogModel';

import { BridgeContractLogBlock } from './vo/BridgeContractLogBlock';
import { BridgeContractLogName } from './vo/BridgeContractLogName';

type BridgeContractLogInputProps = {
  _id: SerialID;
  name: BridgeContractLogName;
  contractId: Hash256;
  sender: Hash256;
  recipient: Hash256;
  block: BridgeContractLogBlock;
};

export class BridgeContractLogEntity extends Entity<
  BridgeContractLogInputProps,
  SerialID
> {
  static create(log: BridgeContractLogItem) {
    const _id = SerialID.create(log._id);
    const name = BridgeContractLogName.create(log.name);
    const contractId = Hash256.create(log.contract_id);
    const sender = Hash256.create(log.sender);
    const recipient = Hash256.create(log.recipient);
    const block = BridgeContractLogBlock.create(log.block);

    const props: BridgeContractLogInputProps = {
      _id,
      name,
      contractId,
      sender,
      recipient,
      block,
    };

    return new BridgeContractLogEntity(props, _id);
  }

  static toDBItem(log: GQLBridgeContractLog): BridgeContractLogItem {
    return {
      _id: SerialID.create(log._id).value(),
      name: BridgeContractLogName.create(log.name).value(),
      contract_id: Hash256.create(log.contractId).value(),
      sender: Hash256.create(log.sender).value(),
      recipient: Hash256.create(log.recipient).value(),
      block: BridgeContractLogBlock.create(log.block).value(),
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

  get block() {
    return this.props.block.value();
  }

  toGQLNode(): Omit<GQLBridgeContractLog, '__typename'> {
    return {
      _id: this.id,
      name: this.name,
      contractId: this.contractId,
      sender: this.sender,
      recipient: this.recipient,
      block: this.block,
    };
  }
}
