import { relations } from 'drizzle-orm';
import { index, pgTable } from 'drizzle-orm/pg-core';
import { HashID, Timestamp } from '~/application/vo';
import { TransactionsTable } from '~/domain/Transaction/TransactionModel';
import { BlockData } from './vo/BlockData';
import { BlockModelID } from './vo/BlockModelID';

export const BlocksTable = pgTable(
  'blocks',
  {
    _id: BlockModelID.type(),
    blockHash: HashID.type(),
    timestamp: Timestamp.type(),
    data: BlockData.type(),
  },
  (table) => ({
    blockTimestampIdx: index().on(table.timestamp),
    blockHashIdx: index().on(table.blockHash),
    blockIdIdx: index().on(table._id),
  }),
);

export const BlocksRelations = relations(BlocksTable, ({ many }) => ({
  transactions: many(TransactionsTable, { relationName: 'block_transactions' }),
}));

export type BlockItem = typeof BlocksTable.$inferSelect;
