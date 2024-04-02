import { eq, sql } from 'drizzle-orm';

import { Paginator, PaginatorParams } from '~/core/Paginator';
import { db } from '~/infra/database/Db';
import {
  BridgeBlocksTable,
  BridgeContractLogsTable,
} from '~/infra/database/DbSchema';

import { BridgeContractLogEntity } from './BridgeContractLogEntity';
import { Log } from './vo/BridgeContractLogData';

export class BridgeContractLogRepository {
  async findMany(params: PaginatorParams): Promise<BridgeContractLogEntity[]> {
    const paginator = new Paginator(BridgeContractLogsTable, params);
    const config = await paginator.getQueryPaginationConfig();
    const query = paginator.getPaginatedResult(config);
    const results = await query.innerJoin(
      BridgeBlocksTable,
      eq(BridgeBlocksTable.number, BridgeContractLogsTable.blockNumber),
    );

    return results.map((item) =>
      BridgeContractLogEntity.create(
        item.bridge_contract_logs,
        item.bridge_blocks,
      ),
    );
  }

  async insertMany(logs: Log[]) {
    const items = logs.map((log) => BridgeContractLogEntity.toDBItem(log));

    return await db
      .connection()
      .insert(BridgeContractLogsTable)
      .values(items)
      .onConflictDoUpdate({
        target: [
          BridgeContractLogsTable.logIndex,
          BridgeContractLogsTable.blockNumber,
        ],
        set: {
          name: sql.raw('excluded.name'),
          contractId: sql.raw('excluded.contract_id'),
          sender: sql.raw('excluded.sender'),
          recipient: sql.raw('excluded.recipient'),
          data: sql.raw('excluded.data'),
        },
      })
      .returning();
  }

  // async findLatestAdded(): Promise<BridgeContractLogEntity | null> {
  //   const latest = await db
  //     .connection()
  //     .query.BridgeContractLogsTable.findFirst({
  //       orderBy: [desc(BridgeContractLogsTable.blockNumber)],
  //     });

  //   if (!latest) return null;

  //   return BridgeContractLogEntity.create(latest);
  // }
}
