import { Hash256, SerialID } from '~/application/vo';
import { Entity } from '~/core/Entity';

import { BridgeContractLogItem } from './BridgeContractLogModel';

import { BridgeBlockItem } from '../BridgeBlock/BridgeBlockModel';
import { BridgeContractLogBlockRef } from '../BridgeBlock/vo/BridgeBlockRef';
import { BridgeContractLogData } from './vo/BridgeContractLogData';
import { BridgeContractLogName } from './vo/BridgeContractLogName';

type BridgeContractLogInputProps = {
  _id: SerialID;
  name: BridgeContractLogName;
  contractId: Hash256;
  sender: Hash256;
  recipient: Hash256;
  block: BridgeBlockItem;
  data: BridgeContractLogData;
};

export class BridgeContractLogEntity extends Entity<
  BridgeContractLogInputProps,
  SerialID
> {
  static create(log: BridgeContractLogItem, block: BridgeBlockItem) {
    const _id = SerialID.create(log._id);
    const name = BridgeContractLogName.create(log.name);
    const contractId = Hash256.create(log.contractId);
    const sender = Hash256.create(log.sender);
    const recipient = Hash256.create(log.recipient);
    const data = BridgeContractLogData.create(log.data);

    const props: BridgeContractLogInputProps = {
      _id,
      name,
      contractId,
      sender,
      recipient,
      block,
      data,
    };

    return new BridgeContractLogEntity(props, _id);
  }

  static toDBItem(log: BridgeContractLogItem): BridgeContractLogItem {
    return {
      _id: SerialID.create(log._id).value(),
      name: BridgeContractLogName.create(log.name).value(),
      contractId: Hash256.create(log.contractId).value(),
      sender: Hash256.create(log.sender).value(),
      recipient: Hash256.create(log.recipient).value(),
      blockId: BridgeContractLogBlockRef.create(log.blockId).value(),
      data: BridgeContractLogData.create(log.data).value(),
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
    return this.props.block;
  }

  get data() {
    return this.props.data.value();
  }

  toGQLNode() {
    return {
      _id: this.id,
      name: this.name,
      contractId: this.contractId,
      sender: this.sender,
      recipient: this.recipient,
      block: this.block,
      data: this.data,
    };
  }
}
