import { GQLBlock } from '~/generated/types';
import { HashID, Timestamp } from '~/shared/vo';
import { BlockItem } from './BlockModel';
import { BlockResolver } from './BlockResolver';
import { BlockData } from './vo/BlockData';
import { BlockID } from './vo/BlockID';

export type CreatedBlock = {
  blockId: number;
  block: GQLBlock;
};

export class BlockDomain {
  private _id: BlockID;
  private id: HashID;
  private data: BlockData;
  private timestamp: Timestamp;

  constructor(block: BlockItem) {
    this._id = BlockID.create(block.data);
    this.id = HashID.create(block.id);
    this.data = BlockData.create(block.data);
    this.timestamp = Timestamp.create(block.data.header.time);
  }

  getInternalId() {
    return this._id.get();
  }
  getId() {
    return this.id.get();
  }
  getData() {
    return this.data.get();
  }
  getTimestamp() {
    return this.timestamp.get();
  }

  static getResolvers() {
    return new BlockResolver().getResolvers();
  }
}
