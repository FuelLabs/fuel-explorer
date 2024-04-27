import { Hash256 } from '@core/application/vo';
import { type BlockItem, BlocksTable } from '@core/domain/Block/BlockModel';
import { BlockRef } from '@core/domain/Block/vo/BlockRef';
import { type InputItem, InputsTable } from '@core/domain/Input/InputModel';
import { type OutputItem, OutputsTable } from '@core/domain/Output/OutputModel';
import { relations } from 'drizzle-orm';
import { index, pgTable } from 'drizzle-orm/pg-core';
import { type NodeItem, NodesTable } from '../Node/NodeModel';
import {
  type OperationItem,
  OperationsTable,
} from '../Operation/OperationModel';
import { AccountIndex } from './vo/AccountIndex';
import { TransactionModelID } from './vo/TransactionModelID';
import { TransactionNodeRef } from './vo/TransactionNodeRef';
import { TransactionTimestamp } from './vo/TransactionTimestamp';

export const TransactionsTable = pgTable(
  'transactions',
  {
    _id: TransactionModelID.type(),
    txHash: Hash256.type('tx_hash').unique(),
    timestamp: TransactionTimestamp.type(),
    nodeRef: TransactionNodeRef.type(),
    accountIndex: AccountIndex.type(),
    blockId: BlockRef.type(),
  },
  (table) => ({
    txTimestampIdx: index().on(table.timestamp),
    txIdIdx: index().on(table._id),
  }),
);

export const TransactionsRelations = relations(
  TransactionsTable,
  ({ one, many }) => ({
    inputs: many(InputsTable),
    outputs: many(OutputsTable),
    operations: many(OperationsTable),
    block: one(BlocksTable, {
      fields: [TransactionsTable.blockId],
      references: [BlocksTable._id],
    }),
    node: one(NodesTable, {
      fields: [TransactionsTable.nodeRef],
      references: [NodesTable.id],
    }),
  }),
);

export type TransactionItem = typeof TransactionsTable.$inferSelect;
export type TransactionPayload = TransactionItem & {
  inputs?: InputItem[];
  outputs?: OutputItem[];
  operations?: OperationItem[];
  block?: BlockItem;
  node?: NodeItem | null;
};
