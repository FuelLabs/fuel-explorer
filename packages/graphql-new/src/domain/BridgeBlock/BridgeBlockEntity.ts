import { Hash256, SerialID } from '~/application/vo';
import { Entity } from '~/core/Entity';

import { Jsonb } from '~/application/vo/Jsonb';

import { Block } from 'viem';
import { BridgeBlockItem } from './BridgeBlockModel';
import { BridgeBlockNumber } from './vo/BridgeBlockNumber';
import { BridgeBlockTimestamp } from './vo/BridgeBlockTimestamp';

type BridgeBlockInputProps = {
  _id: SerialID;
  hash: Hash256;
  number: BridgeBlockNumber;
  timestamp: BridgeBlockTimestamp;
  data: Jsonb<Block>;
};

export class BridgeBlockEntity extends Entity<BridgeBlockInputProps, SerialID> {
  static create(block: BridgeBlockItem): BridgeBlockEntity {
    const _id = SerialID.create(block._id);
    const hash = Hash256.create(block.hash);
    const number = BridgeBlockNumber.create(BigInt(block.number));
    const timestamp = BridgeBlockTimestamp.create(BigInt(block.timestamp));
    const data = Jsonb.create<Block>(block.data);

    const props = {
      _id,
      hash,
      number,
      timestamp,
      data,
    };

    return new BridgeBlockEntity(props, _id);
  }

  static toDBItem(block: Block): Omit<BridgeBlockItem, '_id'> {
    if (!block.hash || !block.number || !block.timestamp) {
      throw new Error('Block is not safe yet');
    }

    return {
      hash: Hash256.create(block.hash).value(),
      number: BridgeBlockNumber.create(block.number).value(),
      timestamp: BridgeBlockTimestamp.create(block.timestamp).value(),
      data: Jsonb.create(block).value(),
    };
  }

  get id() {
    return this.props._id.value();
  }

  get hash() {
    return this.props.hash.value();
  }

  get number() {
    return this.props.number.value();
  }

  get timestamp() {
    return this.props.timestamp.value();
  }

  get data() {
    return this.props.data.value();
  }

  toGQLNode() {
    return {
      _id: this.id,
      hash: this.hash,
      number: this.number,
      timestamp: this.timestamp,
      data: this.data,
    };
  }
}
