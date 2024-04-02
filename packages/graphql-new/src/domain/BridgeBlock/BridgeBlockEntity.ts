import { Hash256, SerialID } from '~/application/vo';
import { Entity } from '~/core/Entity';
import { GQLBridgeBlock } from '~/graphql/generated/sdk';

import { BridgeBlockItem } from './BridgeBlockModel';
import { BridgeBlockNumber } from './vo/BridgeBlockNumber';
import { BridgeBlockTimestamp } from './vo/BridgeBlockTimestamp';

type BridgeBlockInputProps = {
  _id: SerialID;
  hash: Hash256;
  number: BridgeBlockNumber;
  timestamp: BridgeBlockTimestamp;
};

export class BridgeBlockEntity extends Entity<BridgeBlockInputProps, SerialID> {
  static create(block: BridgeBlockItem) {
    const _id = SerialID.create(block._id);
    const hash = Hash256.create(block.hash);
    const number = BridgeBlockNumber.create(block.number);
    const timestamp = BridgeBlockTimestamp.create(block.timestamp);

    const props = {
      _id,
      hash,
      number,
      timestamp,
    };

    return new BridgeBlockEntity(props, _id);
  }

  static toDBItem(block: GQLBridgeBlock): BridgeBlockItem {
    return {
      _id: SerialID.create(block._id).value(),
      hash: Hash256.create(block.hash).value(),
      number: BridgeBlockNumber.create(block.number).value(),
      timestamp: BridgeBlockTimestamp.create(block.timestamp).value(),
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

  toGQLNode() {
    return {
      _id: this.id,
      hash: this.hash,
      number: this.number,
      timestamp: this.timestamp,
    };
  }
}
