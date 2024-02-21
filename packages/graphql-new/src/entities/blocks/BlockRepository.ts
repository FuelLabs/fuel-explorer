import { desc, eq } from 'drizzle-orm';
import { GQLBlock } from '~/generated/types';
import { db } from '~/infra/database/Db';
import { GraphQLSDK } from '~/infra/graphql/GraphQLSDK';
import { Paginator, PaginatorParams } from '~/shared/service';
import { HashID, Timestamp } from '~/shared/vo';
import { CreatedBlock } from './BlockDomain';
import { BlocksTable } from './BlockModel';
import { BlockData } from './vo/BlockData';
import { BlockID } from './vo/BlockID';

export class BlockRepository {
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
      .orderBy(desc(BlocksTable._id))
      .limit(1);
    return latest;
  }

  async insertOne(block: GQLBlock) {
    const found = await this.findOne(block.id);
    if (found) {
      throw new Error(`Block ${block.id} already exists`);
    }

    const [{ blockId }] = await db
      .connection()
      .insert(BlocksTable)
      .values(this._parseBlock(block))
      .returning({
        blockId: BlocksTable._id,
      });

    return blockId;
  }

  async insertMany(blocks: GQLBlock[]) {
    return db.connection().transaction(async (trx) => {
      const queries = blocks.map(async (block) => {
        const found = await this.findOne(block.id);
        if (found) {
          console.warn(`Block ${block.id} already exists`);
          return null;
        }

        const [{ blockId }] = await trx
          .insert(BlocksTable)
          .values(this._parseBlock(block))
          .returning({
            blockId: BlocksTable._id,
          });
        return { block, blockId } as CreatedBlock;
      });
      return Promise.all(queries.filter(Boolean));
    });
  }

  private _parseBlock(block: GQLBlock) {
    const _id = BlockID.create(block);
    const timestamp = Timestamp.create(block.header.time);
    const data = BlockData.create(block);
    const id = HashID.create(block.id);
    return {
      _id: _id.get(),
      id: id.get(),
      timestamp: timestamp.get(),
      data: data.get(),
    };
  }

  async blocksFromNode(page: number, perPage: number) {
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
