import { desc, sql } from 'drizzle-orm';

import { Paginator, PaginatorParams } from '~/core/Paginator';

import { Block } from 'viem';
import { db } from '~/infra/database/Db';
import { BridgeBlockEntity } from './BridgeBlockEntity';
import { BridgeBlockItem, BridgeBlocksTable } from './BridgeBlockModel';

export class BridgeBlockRepository {
  async findMany(params: PaginatorParams) {
    const paginator = new Paginator(BridgeBlocksTable, params);
    const config = await paginator.getQueryPaginationConfig();
    const results = await paginator.getPaginatedResult(config);
    return results.map((item) => BridgeBlockEntity.create(item));
  }

  async insertOne(block: Block): Promise<BridgeBlockItem[]> {
    const item = BridgeBlockEntity.toDBItem(block);
    return await db
      .connection()
      .insert(BridgeBlocksTable)
      .values(item)
      .returning();
  }

  async insertMany(blocks: Block[]) {
    const items = blocks.map((block) => BridgeBlockEntity.toDBItem(block));

    return await db
      .connection()
      .insert(BridgeBlocksTable)
      .values(items)
      .onConflictDoUpdate({
        target: BridgeBlocksTable._id,
        set: {
          data: sql.raw('excluded.data'),
        },
      })
      .returning();
  }

  async findLatestAdded(): Promise<BridgeBlockEntity | null> {
    const latest = await db.connection().query.BridgeBlocksTable.findFirst({
      orderBy: [desc(BridgeBlocksTable._id)],
    });

    if (!latest) return null;

    return BridgeBlockEntity.create(latest);
  }
}
