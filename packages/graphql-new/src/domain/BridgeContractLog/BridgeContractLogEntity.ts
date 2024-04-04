import { Hash256, Jsonb } from '~/application/vo';
import { Entity } from '~/core/Entity';

import { BridgeContractLogItem } from './BridgeContractLogModel';

import { BridgeBlockEntity } from '../BridgeBlock/BridgeBlockEntity';
import { BridgeBlockItem } from '../BridgeBlock/BridgeBlockModel';
import { BridgeContractLogBlockRef } from '../BridgeBlock/vo/BridgeBlockRef';
import { BridgeContractLogData, Log } from './vo/BridgeContractLogData';
import { BridgeContractLogId } from './vo/BridgeContractLogId';
import { BridgeContractLogIndex } from './vo/BridgeContractLogIndex';
import { BridgeContractLogName } from './vo/BridgeContractLogName';

type BridgeContractLogInputProps = {
  _id: BridgeContractLogId;
  name: BridgeContractLogName;
  contractId: Hash256;
  sender: Hash256;
  recipient: Hash256;
  logIndex: BridgeContractLogIndex;
  block: BridgeBlockEntity;
  data: BridgeContractLogData;
};

export class BridgeContractLogEntity extends Entity<
  BridgeContractLogInputProps,
  BridgeContractLogId
> {
  static create(
    log: BridgeContractLogItem,
    block: BridgeBlockItem,
  ): BridgeContractLogEntity {
    const _id = BridgeContractLogId.create(log._id);
    const name = BridgeContractLogName.create(log.name);
    const contractId = Hash256.create(log.contractId);
    const sender = Hash256.create(log.sender);
    const recipient = Hash256.create(log.recipient);
    const logIndex = BridgeContractLogIndex.create(log.logIndex);
    const data = BridgeContractLogData.create(log.data);

    const props: BridgeContractLogInputProps = {
      _id,
      name,
      contractId,
      sender,
      recipient,
      logIndex,
      block: BridgeBlockEntity.create(block),
      data,
    };

    return new BridgeContractLogEntity(props, _id);
  }

  static toDBItem(log: Log): BridgeContractLogItem {
    const args = log.args as { sender: string; recipient: string };

    const logIndex = BridgeContractLogIndex.create(log.logIndex).value();
    const blockNumber = BridgeContractLogBlockRef.create(
      log.blockNumber,
    ).value();

    return {
      _id: BridgeContractLogId.create(`${logIndex}-${blockNumber}`).value(),
      name: BridgeContractLogName.create(log.eventName).value(),
      contractId: Hash256.create(log.address).value(),
      sender: Hash256.create(args.sender).value(),
      recipient: Hash256.create(args.recipient).value(),
      logIndex,
      blockNumber,
      data: Jsonb.create(log).value(),
    };
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

  get logIndex() {
    return this.props.logIndex.value();
  }

  get block() {
    return this.props.block.toGQLNode();
  }

  get data() {
    return this.props.data.value();
  }

  toGQLNode() {
    return {
      name: this.name,
      contractId: this.contractId,
      sender: this.sender,
      recipient: this.recipient,
      logIndex: this.logIndex,
      block: this.block,
      data: this.data,
    };
  }
}
