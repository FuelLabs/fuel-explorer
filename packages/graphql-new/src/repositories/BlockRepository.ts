import { asc, eq } from 'drizzle-orm';
import { db } from '../core/Database';
import { GraphQLSDK } from '../core/GraphQLSDK';
import { Paginator, PaginatorParams } from '../core/Paginator';
import { blocks } from '../core/Schema';
import { GQLBlock } from '../generated/types';
import { tai64toDate } from '../utils/date';
import { executeInQueue } from '../utils/promise';

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
      .from(blocks)
      .where(eq(blocks.id, id));
    return item[0];
  }

  async findMany(params: PaginatorParams) {
    const paginator = new Paginator(blocks, params);
    return paginator.queryPaginated();
  }

  async findLatestAdded() {
    const [latest] = await db
      .connection()
      .select()
      .from(blocks)
      .orderBy(asc(blocks.height))
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
      .insert(blocks)
      .values({
        id: block.id,
        data: block,
        timestamp: tai64toDate(block.header.time),
      })
      .returning({
        blockId: blocks._id,
      });

    return blockId;
  }

  async insertMany(blocks: GQLBlock[]) {
    const results = await executeInQueue(blocks, async (block) => {
      const blockId = await this.insertOne(block);
      if (!blockId) return null;
      return { blockId, block };
    });
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
