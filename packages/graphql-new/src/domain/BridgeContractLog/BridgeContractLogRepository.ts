import { SQL, and, desc, eq, sql } from 'drizzle-orm';

import { Paginator } from '~/core/Paginator';
import { GQLQueryBridgeContractLogsArgs } from '~/graphql/generated/sdk';
import { db } from '~/infra/database/Db';
import {
  BridgeBlocksTable,
  BridgeContractLogsTable,
} from '~/infra/database/DbSchema';

import { BridgeContractLogEntity } from './BridgeContractLogEntity';
import { Log } from './vo/BridgeContractLogData';

export class BridgeContractLogRepository {
  async findMany(
    params: GQLQueryBridgeContractLogsArgs,
  ): Promise<BridgeContractLogEntity[]> {
    // Filtering by args
    const where: SQL[] = [];
    if (params?.args) {
      const args = params.args;
      const sqls = {
        recipient: sql`${BridgeContractLogsTable.args} ->> 'recipient' = ${args.recipient}`,
        messageId: sql`${BridgeContractLogsTable.args} ->> 'messageId' = ${args.messageId}`,
      };
      for (const key of Object.keys(params.args)) {
        where.push(sqls[key]);
      }
    }

    // Regular filtering
    if (params?.name) {
      where.push(eq(BridgeContractLogsTable.name, params.name));
    }

    // Default pagination and sorting
    const paginator = new Paginator(BridgeContractLogsTable, params);
    const config = await paginator.getQueryPaginationConfig();
    const query = paginator.getPaginatedResult(config, and(...where));
    const results = await query.innerJoin(
      BridgeBlocksTable,
      eq(BridgeBlocksTable._id, BridgeContractLogsTable.blockNumber),
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
        target: BridgeContractLogsTable._id,
        set: {
          name: sql.raw('excluded.name'),
          contractId: sql.raw('excluded.contract_id'),
          args: sql.raw('excluded.args'),
          data: sql.raw('excluded.data'),
        },
      })
      .returning();
  }

  async findLatestAdded(): Promise<BridgeContractLogEntity | null> {
    const latest = await db
      .connection()
      .query.BridgeContractLogsTable.findFirst({
        orderBy: [desc(BridgeContractLogsTable.blockNumber)],
        with: {
          block: true,
        },
      });

    if (!latest) return null;

    const { block, ...log } = latest;

    return BridgeContractLogEntity.create(log, block);
  }
}
