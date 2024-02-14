import { asc, eq } from 'drizzle-orm';
import { db } from '../core/Database';
import { GQLClient } from '../core/GraphQLSDK';
import { blocks } from '../core/Schema';
import { GQLBlock } from '../generated/types';
import { tai64toDate } from '../utils/date';
import { executeInQueue } from '../utils/promise';

export class BlockRepository {
  constructor(private sdk: GQLClient) {}

  async findOne(id: string) {
    const item = await db
      .connection()
      .select()
      .from(blocks)
      .where(eq(blocks.id, id));
    return item[0];
  }

  async insert(block: GQLBlock) {
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
      const blockId = await this.insert(block);
      if (!blockId) return null;
      return { blockId, block };
    });
    return results.filter(Boolean) as { blockId: number; block: GQLBlock }[];
  }

  async fetchBlocks({ page, perPage }: { page: number; perPage: number }) {
    const after = (page - 1) * perPage;
    const { data } = await this.sdk.QueryBlocks({
      first: perPage,
      after: String(after),
    });

    return data.blocks.nodes as GQLBlock[];
  }

  async findLatest() {
    const { data } = await this.sdk.QueryBlocks({ last: 1 });
    const block = data.blocks.nodes[0];
    const pageInfo = data.blocks.pageInfo;
    return { block, pageInfo };
  }

  async findLatestAdded() {
    const [latest] = await db
      .connection()
      .select()
      .from(blocks)
      .orderBy(asc(blocks.id))
      .limit(1);
    return latest;
  }
}
