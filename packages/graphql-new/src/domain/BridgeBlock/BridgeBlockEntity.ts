import { Hash256 } from '~/application/vo';
import { Entity } from '~/core/Entity';
import { GQLBridgeBlock } from '~/graphql/generated/sdk';

import { BridgeBlockItem } from './BridgeBlockModel';
import { BridgeBlockNumber } from './vo/BridgeBlockNumber';
import { BridgeBlockTimestamp } from './vo/BridgeBlockTimestamp';

type BridgeBlockInputProps = {
  hash: Hash256;
  number: BridgeBlockNumber;
  timestamp: BridgeBlockTimestamp;
};

export class BridgeBlockEntity extends Entity<
  BridgeBlockInputProps,
  undefined
> {
  static create(block: BridgeBlockItem) {
    const hash = Hash256.create(block.hash);
    const number = BridgeBlockNumber.create(block.number);
    const timestamp = BridgeBlockTimestamp.create(block.timestamp);

    const props = {
      hash,
      number,
      timestamp,
    };

    return new BridgeBlockEntity(props);
  }

  static toDBItem(block: GQLBridgeBlock): BridgeBlockItem {
    return {
      hash: Hash256.create(block.hash).value(),
      number: BridgeBlockNumber.create(block.number).value(),
      timestamp: BridgeBlockTimestamp.create(block.timestamp).value(),
    };
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

  toGQLNode(): Omit<GQLBridgeBlock, '__typename'> {
    return {
      hash: this.hash,
      number: this.number,
      timestamp: this.timestamp,
    };
  }
}
