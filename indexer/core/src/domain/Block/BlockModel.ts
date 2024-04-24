import { Hash256, Timestamp } from '@core/application/vo';
import {
  type TransactionItem,
  TransactionsTable,
} from '@core/domain/Transaction/TransactionModel';
import { relations } from 'drizzle-orm';
import { index, pgTable } from 'drizzle-orm/pg-core';
import { type NodeItem, NodesTable } from '../Node/NodeModel';
import { BlockGasUsed } from './vo/BlockGasUsed';
import { BlockModelID } from './vo/BlockModelID';
import { BlockNodeRef } from './vo/BlockNodeRef';
import { BlockProducer } from './vo/BlockProducer';

export const BlocksTable = pgTable(
  'blocks',
  {
    _id: BlockModelID.type(),
    blockHash: Hash256.type('id').unique(),
    timestamp: Timestamp.type(),
    nodeRef: BlockNodeRef.type(),
    totalGasUsed: BlockGasUsed.type(),
    producer: BlockProducer.type(),
  },
  (table) => ({
    blockTimestampIdx: index().on(table.timestamp),
    blockHashIdx: index().on(table.blockHash),
    blockIdIdx: index().on(table._id),
  }),
);

export const BlocksRelations = relations(BlocksTable, ({ many, one }) => ({
  transactions: many(TransactionsTable),
  node: one(NodesTable),
}));

export type BlockItem = typeof BlocksTable.$inferSelect;
export type BlockPayload = BlockItem & {
  transactions: TransactionItem[];
  node?: NodeItem | null;
};
