import { relations } from 'drizzle-orm';
import { index, pgTable } from 'drizzle-orm/pg-core';

import { Hash256, SerialID } from '~/application/vo';

import { BridgeBlocksTable } from '../BridgeBlock/BridgeBlockModel';
import { BridgeContractLogBlockID } from './vo/BridgeContractLogBlockID';
import { BridgeContractLogData } from './vo/BridgeContractLogData';
import { BridgeContractLogName } from './vo/BridgeContractLogName';

export const BridgeContractLogsTable = pgTable(
  'bridge_contract_logs',
  {
    _id: SerialID.type(),
    name: BridgeContractLogName.type(),
    contractId: Hash256.type('contract_id'),
    sender: Hash256.type('sender'),
    recipient: Hash256.type('recipient'),
    blockId: BridgeContractLogBlockID.type(),
    data: BridgeContractLogData.type(),
  },
  (table) => ({
    contractLogIdIdx: index().on(table._id),
  }),
);

export const BridgeContractsLogsRelations = relations(
  BridgeContractLogsTable,
  ({ one }) => ({
    block: one(BridgeBlocksTable, {
      fields: [BridgeContractLogsTable.blockId],
      references: [BridgeBlocksTable._id],
      relationName: 'bridge_contract_log_block',
    }),
  }),
);

export type BridgeContractLogItem = typeof BridgeContractLogsTable.$inferSelect;
