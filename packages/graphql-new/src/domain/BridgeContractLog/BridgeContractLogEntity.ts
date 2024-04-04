import { Hash256 } from '~/application/vo';
import { Entity } from '~/core/Entity';

import { BridgeContractLogItem } from './BridgeContractLogModel';

import { decodeMessageSentData } from '@fuel-explorer/contract-ids';
import { BridgeBlockEntity } from '../BridgeBlock/BridgeBlockEntity';
import { BridgeBlockItem } from '../BridgeBlock/BridgeBlockModel';
import { BridgeContractLogBlockRef } from '../BridgeBlock/vo/BridgeBlockRef';
import { BridgeContractLogArgs } from './vo/BridgeContractLogArgs';
import { BridgeContractLogData, Log } from './vo/BridgeContractLogData';
import { BridgeContractLogId } from './vo/BridgeContractLogId';
import { BridgeContractLogIndex } from './vo/BridgeContractLogIndex';
import { BridgeContractLogName } from './vo/BridgeContractLogName';

type BridgeContractLogInputProps = {
  _id: BridgeContractLogId;
  name: BridgeContractLogName;
  contractId: Hash256;
  logIndex: BridgeContractLogIndex;
  block: BridgeBlockEntity;
  args: BridgeContractLogArgs;
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
    const logIndex = BridgeContractLogIndex.create(log.logIndex);
    const args = BridgeContractLogArgs.create(log.args);
    const data = BridgeContractLogData.create(log.data);

    const props: BridgeContractLogInputProps = {
      _id,
      name,
      contractId,
      logIndex,
      block: BridgeBlockEntity.create(block),
      args,
      data,
    };

    return new BridgeContractLogEntity(props, _id);
  }

  static toDBItem(log: Log): BridgeContractLogItem {
    const { args, eventName, address, logIndex, blockNumber, ...data } = log;

    const index = BridgeContractLogIndex.create(logIndex).value();
    const number = BridgeContractLogBlockRef.create(blockNumber).value();
    const decoded = decodeMessageSentData.erc20Deposit(
      (args as { data?: `0x${string}` }).data,
    );

    return {
      _id: BridgeContractLogId.create(`${number}-${index}`).value(),
      name: BridgeContractLogName.create(eventName).value(),
      contractId: Hash256.create(address).value(),
      logIndex: index,
      blockNumber: number,
      args: BridgeContractLogArgs.create({ ...args, decoded }).value(),
      data: BridgeContractLogData.create(data).value(),
    };
  }

  get name() {
    return this.props.name.value();
  }

  get contractId() {
    return this.props.contractId.value();
  }

  get logIndex() {
    return this.props.logIndex.value();
  }

  get block() {
    return this.props.block.toGQLNode();
  }

  get args() {
    return this.props.args.value();
  }

  get data() {
    return this.props.data.value();
  }

  toGQLNode() {
    return {
      name: this.name,
      contractId: this.contractId,
      logIndex: this.logIndex,
      block: this.block,
      args: this.args,
      data: this.data,
    };
  }
}
