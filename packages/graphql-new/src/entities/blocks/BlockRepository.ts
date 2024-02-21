import { desc, eq } from 'drizzle-orm';
import { GQLBlock } from '~/generated/types';
import { db } from '~/infra/database/Db';
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
    await this._validateExists(block);
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
        await this._validateExists(block);
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

  private async _validateExists(block: GQLBlock) {
    const found = await this.findOne(block.id);
    if (found) {
      throw new Error(`Block ${block.id} already exists`);
    }
  }
}
