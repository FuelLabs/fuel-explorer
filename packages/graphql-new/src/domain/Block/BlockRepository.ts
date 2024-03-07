import { desc, eq } from 'drizzle-orm';
import { Paginator, PaginatorParams } from '~/core/Paginator';
import { GraphQLSDK } from '~/graphql/GraphQLSDK';
import { GQLBlock } from '~/graphql/generated/sdk';
import { db } from '~/infra/database/Db';
import { BlockEntity } from './BlockEntity';
import { BlocksTable } from './BlockModel';

export class BlockRepository {
  async findByHash(blockHash: string) {
    const [first] = await db
      .connection()
      .select()
      .from(BlocksTable)
      .where(eq(BlocksTable.blockHash, blockHash));

    if (!first) return null;
    return BlockEntity.create(first);
  }

  async findByHeight(height: number) {
    const [first] = await db
      .connection()
      .select()
      .from(BlocksTable)
      .where(eq(BlocksTable._id, height));

    if (!first) return null;
    return BlockEntity.create(first);
  }

  async findMany(params: PaginatorParams) {
    const paginator = new Paginator(BlocksTable, params);
    const config = await paginator.getQueryPaginationConfig();
    const results = await paginator.getPaginatedResult(config);
    return results.map((item) => BlockEntity.create(item));
  }

  async findLatestAdded() {
    const [latest] = await db
      .connection()
      .select()
      .from(BlocksTable)
      .orderBy(desc(BlocksTable._id))
      .limit(1);

    return BlockEntity.create(latest);
  }

  async insertOne(block: GQLBlock) {
    const found = await this.findByHash(block.id);
    if (found) {
      throw new Error(`Block ${block.id} already exists`);
    }

    const [item] = await db
      .connection()
      .insert(BlocksTable)
      .values(BlockEntity.toDBItem(block))
      .returning();

    return BlockEntity.create(item);
  }

  async insertMany(blocks: GQLBlock[]) {
    return db.connection().transaction(async (trx) => {
      const queries = blocks.map(async (block) => {
        const found = await this.findByHash(block.id);
        if (found) {
          console.warn(`Block ${block.id} already exists`);
          return found;
        }

        const [item] = await trx
          .insert(BlocksTable)
          .values(BlockEntity.toDBItem(block))
          .returning();

        return BlockEntity.create(item);
      });
      return Promise.all(queries.filter(Boolean));
    });
  }

  async blocksFromNode(page: number, perPage: number) {
    const { sdk } = new GraphQLSDK();
    const after = (page - 1) * perPage;
    const { data } = await sdk.blocks({
      first: page > 1 ? perPage : perPage + 1,
      ...(page > 1 && { after: String(after) }),
    });

    const blocks = data.blocks.nodes as GQLBlock[];
    const hasNext = data.blocks.pageInfo.hasNextPage;
    const hasPrev = data.blocks.pageInfo.hasPreviousPage;
    return { blocks, hasNext, hasPrev };
  }

  async latestBlockFromNode() {
    const { sdk } = new GraphQLSDK();
    const { data } = await sdk.blocks({ last: 1 });
    return data.blocks.nodes[0] as GQLBlock;
  }
}
