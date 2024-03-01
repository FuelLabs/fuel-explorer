import { HashID, Timestamp } from '~/application/vo';
import { Entity } from '~/core/Entity';
import { GQLBlock } from '~/generated/types';
import { BlockItem } from './BlockModel';
import { BlockData } from './vo/BlockData';
import { BlockModelID } from './vo/BlockModelID';

export type CreatedBlock = {
  id: number;
  block: GQLBlock;
};

type BlockProps = {
  blockId: HashID;
  data: BlockData;
  timestamp: Timestamp;
};

export class BlockEntity extends Entity<BlockProps, BlockModelID> {
  private constructor(id: BlockModelID, props: BlockProps) {
    super(id, props);
  }

  get blockId() {
    return this.props.blockId.value();
  }

  get data() {
    return this.props.data.value();
  }

  get timestamp() {
    return this.props.timestamp.value();
  }

  static create(block: BlockItem) {
    const id = BlockModelID.create(block.data);
    const blockId = HashID.create(block.data.id);
    const data = BlockData.create(block.data);
    const timestamp = Timestamp.create(block.data.header.time);
    return new BlockEntity(id, {
      blockId,
      data,
      timestamp,
    });
  }

  static toDBItem(block: GQLBlock) {
    return {
      _id: BlockModelID.create(block).value(),
      blockId: HashID.create(block.id).value(),
      timestamp: Timestamp.create(block.header.time).value(),
      data: block,
    };
  }

  toGQLNode(): GQLBlock & { timestamp: Date } {
    const timestamp = this.timestamp;
    const data = this.data;
    return { timestamp, ...data };
  }
}
