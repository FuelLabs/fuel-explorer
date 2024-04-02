import { relations } from 'drizzle-orm';
import { index, pgTable, unique } from 'drizzle-orm/pg-core';

import { Hash256, SerialID } from '~/application/vo';

import { BridgeBlocksTable } from '../BridgeBlock/BridgeBlockModel';
import { BridgeContractLogBlockRef } from '../BridgeBlock/vo/BridgeBlockRef';
import { BridgeContractLogData } from './vo/BridgeContractLogData';
import { BridgeContractLogIndex } from './vo/BridgeContractLogIndex';
import { BridgeContractLogName } from './vo/BridgeContractLogName';

export const BridgeContractLogsTable = pgTable(
  'bridge_contract_logs',
  {
    _id: SerialID.type(),
    name: BridgeContractLogName.type(),
    contractId: Hash256.type('contract_id'),
    sender: Hash256.type('sender'),
    recipient: Hash256.type('recipient'),
    logIndex: BridgeContractLogIndex.type(),
    blockNumber: BridgeContractLogBlockRef.type(),
    data: BridgeContractLogData.type(),
  },
  (table) => ({
    contractLogIdIdx: index().on(table._id),
    contractLogUnq: unique().on(table.logIndex, table.blockNumber),
  }),
);

export const BridgeContractsLogsRelations = relations(
  BridgeContractLogsTable,
  ({ one }) => ({
    block: one(BridgeBlocksTable, {
      fields: [BridgeContractLogsTable.blockNumber],
      references: [BridgeBlocksTable.number],
    }),
  }),
);

export type BridgeContractLogItem = typeof BridgeContractLogsTable.$inferSelect;
