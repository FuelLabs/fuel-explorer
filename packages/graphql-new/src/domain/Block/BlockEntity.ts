import { Hash256, Timestamp } from '~/application/vo';
import { ParsedTime } from '~/application/vo/ParsedTime';
import { Entity } from '~/core/Entity';
import { GQLBlock } from '~/graphql/generated/sdk';
import { BlockItem } from './BlockModel';
import { BlockData } from './vo/BlockData';
import { BlockGasUsed } from './vo/BlockGasUsed';
import { BlockModelID } from './vo/BlockModelID';
import { BlockProducer } from './vo/BlockProducer';

type BlockInputProps = {
  blockHash: Hash256;
  data: BlockData;
  producer: BlockProducer;
  time: ParsedTime;
  totalGasUsed: BlockGasUsed;
};

export class BlockEntity extends Entity<BlockInputProps, BlockModelID> {
  static create(block: BlockItem) {
    if (!block) return null;
    const item = block.data;
    if (!item) {
      throw new Error('item is required');
    }

    const id = BlockModelID.create(item);
    const blockHash = Hash256.create(item.id);
    const data = BlockData.create(item);
    const timestamp = Timestamp.create(item.header.time);
    const time = ParsedTime.create(item.header.time);
    const totalGasUsed = BlockGasUsed.create(item);
    const producer = BlockProducer.create(item);
    const props = {
      blockHash,
      data,
      totalGasUsed,
      time,
      timestamp,
      producer,
    };

    return new BlockEntity(props, id);
  }

  static toDBItem(block: GQLBlock): BlockItem {
    return {
      _id: BlockModelID.create(block).value(),
      blockHash: Hash256.create(block.id).value(),
      data: BlockData.create(block).value(),
      producer: BlockProducer.create(block).value()?.toB256() ?? null,
      timestamp: Timestamp.create(block.header.time).value(),
      totalGasUsed: BlockGasUsed.create(block).value(),
    };
  }

  get blockHash() {
    return this.props.blockHash.value();
  }

  get data() {
    return this.props.data.value();
  }

  get producer() {
    return this.props.producer.value()?.toB256() ?? null;
  }

  get time() {
    return this.props.time.value();
  }

  get totalGasUsed() {
    return this.props.totalGasUsed.value();
  }

  toGQLNode(): GQLBlock {
    const data = this.data;
    return {
      ...data,
      producer: this.producer,
      time: this.time,
      totalGasUsed: this.totalGasUsed,
    };
  }
}
