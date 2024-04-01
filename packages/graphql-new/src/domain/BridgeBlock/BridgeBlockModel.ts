import { relations } from 'drizzle-orm';
import { index, pgTable } from 'drizzle-orm/pg-core';

import { Hash256 } from '~/application/vo';
import { BridgeContractLogsTable } from '~/domain/BridgeContractLog/BridgeContractLogModel';

import { BridgeBlockNumber } from './vo/BridgeBlockNumber';
import { BridgeBlockTimestamp } from './vo/BridgeBlockTimestamp';

export const BridgeBlocksTable = pgTable(
  'blocks',
  {
    hash: Hash256.type('hash').unique(),
    number: BridgeBlockNumber.type(),
    timestamp: BridgeBlockTimestamp.type(),
  },
  (table) => ({
    bridgeBlockHashIdx: index().on(table.hash),
    bridgeBlockNumberIdx: index().on(table.number),
    bridgeBlockTimestampIdx: index().on(table.timestamp),
  }),
);

export const BridgeBlocksRelations = relations(
  BridgeBlocksTable,
  ({ many }) => ({
    contractLogs: many(BridgeContractLogsTable, {
      relationName: 'bridge_block_contract_logs',
    }),
  }),
);

export type BridgeBlockItem = typeof BridgeBlocksTable.$inferSelect;
