import { GQLBlock } from '~/generated/types';
import { GraphQLSDK } from '~/infra/graphql/GraphQLSDK';
import { inngest } from '~/infra/inngest/Inngest';
import { HashID, Timestamp } from '~/shared/vo';
import { BlockItem } from './BlockModel';
import { BlockRepository } from './BlockRepository';
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

  static async syncBlocks(page: number, perPage: number) {
    const repository = new BlockRepository();
    const { blocks, hasNext } = await BlockDomain.blocksFromNode(page, perPage);
    const created = await repository.insertMany(blocks);

    await Promise.all(
      created.map((block) => {
        if (!block) return;
        return inngest.syncTransactions(block);
      }),
    );

    return { blocks, hasNext };
  }

  static async blocksFromNode(page: number, perPage: number) {
    console.log('page', page);
    const { sdk } = new GraphQLSDK();
    const after = (page - 1) * perPage;
    const { data } = await sdk.QueryBlocks({
      first: perPage,
      ...(page > 1 && { after: String(after) }),
    });

    const blocks = data.blocks.nodes as GQLBlock[];
    const hasNext = data.blocks.pageInfo.hasNextPage;
    return { blocks, hasNext };
  }
}
