import { desc, eq } from 'drizzle-orm';
import { HashID, Timestamp } from '~/application/vo';
import { Paginator, PaginatorParams } from '~/core/Paginator';
import { GQLBlock } from '~/generated/types';
import { db } from '~/infra/database/Db';
import { BlockEntity } from './BlockEntity';
import { BlocksTable } from './BlockModel';
import { BlockModelID } from './vo/BlockModelID';

export class BlockRepository {
  async findOne(blockId: string) {
    const [first] = await db
      .connection()
      .select()
      .from(BlocksTable)
      .where(eq(BlocksTable.blockId, blockId));

    return BlockEntity.create(first);
  }

  async findMany(params: PaginatorParams) {
    const paginator = new Paginator(BlocksTable, params);
    const results = await paginator.getPaginatedResult();
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
    const found = await this.findOne(block.id);
    if (found) {
      throw new Error(`Block ${block.id} already exists`);
    }

    const values = this.parseBlock(block);
    const [item] = await db
      .connection()
      .insert(BlocksTable)
      .values(values)
      .returning();

    return BlockEntity.create(item);
  }

  async insertMany(blocks: GQLBlock[]) {
    return db.connection().transaction(async (trx) => {
      const queries = blocks.map(async (block) => {
        const found = await this.findOne(block.id);
        if (found) {
          console.warn(`Block ${block.id} already exists`);
          return null;
        }

        const [item] = await trx
          .insert(BlocksTable)
          .values(this.parseBlock(block))
          .returning();

        return BlockEntity.create(item);
      });
      return Promise.all(queries.filter(Boolean));
    });
  }

  private parseBlock(block: GQLBlock) {
    return {
      _id: BlockModelID.create(block).toValue(),
      blockId: HashID.create(block.id).get(),
      timestamp: Timestamp.create(block.header.time).get(),
      data: block,
    };
  }
}
