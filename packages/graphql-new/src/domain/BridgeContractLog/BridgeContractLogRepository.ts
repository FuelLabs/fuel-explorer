import { Paginator, PaginatorParams } from '~/core/Paginator';
import {
  BridgeBlocksTable,
  BridgeContractLogsTable,
} from '~/infra/database/DbSchema';

import { eq } from 'drizzle-orm';
import { BridgeContractLogEntity } from './BridgeContractLogEntity';

export class BridgeContractLogRepository {
  async findMany(params: PaginatorParams) {
    const paginator = new Paginator(BridgeContractLogsTable, params);
    const config = await paginator.getQueryPaginationConfig();
    const query = paginator.getPaginatedResult(config);
    const results = await query.innerJoin(
      BridgeBlocksTable,
      eq(BridgeBlocksTable._id, BridgeContractLogsTable.blockId),
    );

    return results.map((item) =>
      BridgeContractLogEntity.create(
        item.bridge_contract_logs,
        item.bridge_blocks,
      ),
    );
  }

  async insertMany() {
    console.log('@TODO: Implement it');
    return Promise.resolve();
  }
}
