import { HashID, Timestamp } from '~/application/vo';
import { Entity } from '~/core/Entity';
import { GQLBlock } from '~/graphql/generated/sdk';
import { BlockItem } from './BlockModel';
import { BlockData } from './vo/BlockData';
import { BlockModelID } from './vo/BlockModelID';

type BlockProps = {
  blockHash: HashID;
  data: BlockData;
  timestamp: Timestamp;
};

export class BlockEntity extends Entity<BlockProps, BlockModelID> {
  private constructor(id: BlockModelID, props: BlockProps) {
    super(id, props);
  }

  get blockHash() {
    return this.props.blockHash.value();
  }

  get data() {
    return this.props.data.value();
  }

  get timestamp() {
    return this.props.timestamp.value();
  }

  static create(block: BlockItem) {
    if (!block?.data) {
      throw new Error('Block data is required');
    }

    const id = BlockModelID.create(block.data);
    const blockHash = HashID.create(block.data.id);
    const data = BlockData.create(block.data);
    const timestamp = Timestamp.create(block.data.header.time);
    return new BlockEntity(id, {
      blockHash,
      data,
      timestamp,
    });
  }

  static toDBItem(block: GQLBlock): BlockItem {
    return {
      _id: BlockModelID.create(block).value(),
      blockHash: HashID.create(block.id).value(),
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
