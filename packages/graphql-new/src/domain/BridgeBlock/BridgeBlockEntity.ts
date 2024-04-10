import { Hash256, Jsonb } from '~/application/vo';
import { Entity } from '~/core/Entity';

import { Block } from 'viem';
import { BridgeBlockItem } from './BridgeBlockModel';
import { BridgeBlockNumber } from './vo/BridgeBlockNumber';
import { BridgeBlockTimestamp } from './vo/BridgeBlockTimestamp';

type BridgeBlockInputProps = {
  _id: BridgeBlockNumber;
  hash: Hash256;
  timestamp: BridgeBlockTimestamp;
  data: Jsonb<Block>;
};

export class BridgeBlockEntity extends Entity<
  BridgeBlockInputProps,
  BridgeBlockNumber
> {
  static create(block: BridgeBlockItem): BridgeBlockEntity {
    const _id = BridgeBlockNumber.create(block._id);
    const hash = Hash256.create(block.hash);
    const timestamp = BridgeBlockTimestamp.create(BigInt(block.timestamp));
    const data = Jsonb.create<Block>(block.data);

    const props = {
      _id,
      hash,
      timestamp,
      data,
    };

    return new BridgeBlockEntity(props, _id);
  }

  static toDBItem(block: Block): BridgeBlockItem {
    if (!block.hash || typeof block.number !== 'bigint' || !block.timestamp) {
      throw new Error('Block is not safe yet');
    }

    return {
      _id: BridgeBlockNumber.create(Number(block.number)).value(),
      hash: Hash256.create(block.hash).value(),
      timestamp: BridgeBlockTimestamp.create(block.timestamp).value(),
      data: Jsonb.create(block).value(),
    };
  }

  get id() {
    return this._id.value();
  }

  get hash() {
    return this.props.hash.value();
  }

  get number() {
    return this.props._id.value();
  }

  get timestamp() {
    return this.props.timestamp.value();
  }

  get data() {
    return this.props.data.value();
  }

  toGQLNode() {
    return {
      id: this.id,
      hash: this.hash,
      number: this.number,
      timestamp: this.timestamp,
      data: this.data,
    };
  }
}
