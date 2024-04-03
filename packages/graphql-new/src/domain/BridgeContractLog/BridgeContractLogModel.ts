import { relations } from 'drizzle-orm';
import { index, pgTable } from 'drizzle-orm/pg-core';

import { Hash256 } from '~/application/vo';

import { BridgeBlocksTable } from '../BridgeBlock/BridgeBlockModel';
import { BridgeContractLogBlockRef } from '../BridgeBlock/vo/BridgeBlockRef';
import { BridgeContractLogData } from './vo/BridgeContractLogData';
import { BridgeContractLogId } from './vo/BridgeContractLogId';
import { BridgeContractLogIndex } from './vo/BridgeContractLogIndex';
import { BridgeContractLogName } from './vo/BridgeContractLogName';

export const BridgeContractLogsTable = pgTable(
  'bridge_contract_logs',
  {
    _id: BridgeContractLogId.type(),
    name: BridgeContractLogName.type(),
    contractId: Hash256.type('contract_id'),
    sender: Hash256.type('sender'),
    recipient: Hash256.type('recipient'),
    logIndex: BridgeContractLogIndex.type(),
    blockNumber: BridgeContractLogBlockRef.type(),
    data: BridgeContractLogData.type(),
  },
  (table) => ({
    bridgeContractLogBlockNumberIdx: index().on(table.blockNumber),
  }),
);

export const BridgeContractsLogsRelations = relations(
  BridgeContractLogsTable,
  ({ one }) => ({
    block: one(BridgeBlocksTable, {
      fields: [BridgeContractLogsTable.blockNumber],
      references: [BridgeBlocksTable._id],
    }),
  }),
);

export type BridgeContractLogItem = typeof BridgeContractLogsTable.$inferSelect;
