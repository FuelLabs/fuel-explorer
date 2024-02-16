import { desc, eq } from 'drizzle-orm';
import { db } from '../../core/Database';
import { GraphQLSDK } from '../../core/GraphQLSDK';
import { GQLBlock } from '../../generated/types';
import { DateHelper } from '../../helpers/Date';
import { Paginator, PaginatorParams } from '../../helpers/Paginator';
import { PromiseHelper } from '../../helpers/Promise';
import { BlocksTable } from './BlockEntity';

export class BlockRepository {
  sdk: GraphQLSDK['sdk'];

  constructor() {
    const { sdk } = new GraphQLSDK();
    this.sdk = sdk;
  }

  async findOne(id: string) {
    const item = await db
      .connection()
      .select()
      .from(BlocksTable)
      .where(eq(BlocksTable.id, id));
    return item[0];
  }

  async findMany(params: PaginatorParams) {
    const paginator = new Paginator(BlocksTable, params);
    return paginator.queryPaginated();
  }

  async findLatestAdded() {
    const [latest] = await db
      .connection()
      .select()
      .from(BlocksTable)
      .orderBy(desc(BlocksTable.height))
      .limit(1);
    return latest;
  }

  async insertOne(block: GQLBlock) {
    const found = await this.findOne(block.id);
    if (found) {
      console.log(`Block ${block.id} already exists`);
      return;
    }

    const [{ blockId }] = await db
      .connection()
      .insert(BlocksTable)
      .values({
        id: block.id,
        data: block,
        height: Number(block.header.height),
        timestamp: DateHelper.tai64toDate(block.header.time),
      })
      .returning({
        blockId: BlocksTable._id,
      });

    return blockId;
  }

  async insertMany(blocks: GQLBlock[]) {
    const results = await PromiseHelper.executeInQueue(
      blocks,
      async (block) => {
        const blockId = await this.insertOne(block);
        if (!blockId) return null;
        return { blockId, block };
      },
    );
    return results.filter(Boolean) as { blockId: number; block: GQLBlock }[];
  }

  async blocksFromNode(page: number, perPage: number) {
    const after = (page - 1) * perPage;
    const { data } = await this.sdk.QueryBlocks({
      first: perPage,
      after: String(after),
    });

    const blocks = data.blocks.nodes as GQLBlock[];
    const hasNext = data.blocks.pageInfo.hasNextPage;
    return { blocks, hasNext };
  }
}
