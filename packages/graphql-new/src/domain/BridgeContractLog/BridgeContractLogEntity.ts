import { Hash256, Jsonb, SerialID } from '~/application/vo';
import { Entity } from '~/core/Entity';

import { Log } from 'viem';

import { BridgeContractLogItem } from './BridgeContractLogModel';

import { BridgeBlockItem } from '../BridgeBlock/BridgeBlockModel';
import { BridgeContractLogBlockRef } from '../BridgeBlock/vo/BridgeBlockRef';
import { BridgeContractLogIndex } from './vo/BridgeContractLogIndex';
import { BridgeContractLogName } from './vo/BridgeContractLogName';

type BridgeContractLogInputProps = {
  _id: SerialID;
  name: BridgeContractLogName;
  contractId: Hash256;
  sender: Hash256;
  recipient: Hash256;
  logIndex: BridgeContractLogIndex;
  block: BridgeBlockItem;
  data: Jsonb<Log>;
};

export class BridgeContractLogEntity extends Entity<
  BridgeContractLogInputProps,
  SerialID
> {
  static create(
    log: BridgeContractLogItem,
    block: BridgeBlockItem,
  ): BridgeContractLogEntity {
    const _id = SerialID.create(log._id);
    const name = BridgeContractLogName.create(log.name);
    const contractId = Hash256.create(log.contractId);
    const sender = Hash256.create(log.sender);
    const recipient = Hash256.create(log.recipient);
    const logIndex = BridgeContractLogIndex.create(log.logIndex);
    const data = Jsonb.create<Log>(log.data);

    const props: BridgeContractLogInputProps = {
      _id,
      name,
      contractId,
      sender,
      recipient,
      logIndex,
      block,
      data,
    };

    return new BridgeContractLogEntity(props, _id);
  }

  static toDBItem(log: Log): Omit<BridgeContractLogItem, '_id'> {
    // @TODO: Resolve this Log typescript, because these types really exist
    return {
      name: BridgeContractLogName.create(log.eventName).value(),
      contractId: Hash256.create(log.address).value(),
      sender: Hash256.create(log.args.sender).value(),
      recipient: Hash256.create(log.args.recipient).value(),
      logIndex: BridgeContractLogIndex.create(log.logIndex).value(),
      blockNumber: BridgeContractLogBlockRef.create(log.blockNumber).value(),
      data: Jsonb.create(log).value(),
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

  get logIndex() {
    return this.props.logIndex.value();
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
      logIndex: this.logIndex,
      block: this.block,
      data: this.data,
    };
  }
}
