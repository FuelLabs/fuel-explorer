import { desc } from 'drizzle-orm';

import { Paginator, PaginatorParams } from '~/core/Paginator';

import { db } from '~/infra/database/Db';
import { BridgeBlockEntity } from './BridgeBlockEntity';
import { BridgeBlocksTable } from './BridgeBlockModel';

export class BridgeBlockRepository {
  async findMany(params: PaginatorParams) {
    const paginator = new Paginator(BridgeBlocksTable, params);
    const config = await paginator.getQueryPaginationConfig();
    const results = await paginator.getPaginatedResult(config);
    return results.map((item) => BridgeBlockEntity.create(item));
  }

  async findLatestAdded() {
    const [latest] = await db
      .connection()
      .select()
      .from(BridgeBlocksTable)
      .orderBy(desc(BridgeBlocksTable.number))
      .limit(1);

    return BridgeBlockEntity.create(latest);
  }
}
