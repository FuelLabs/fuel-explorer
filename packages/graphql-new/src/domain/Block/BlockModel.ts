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
    blockId: HashID.type(),
    timestamp: Timestamp.type(),
    data: BlockData.type(),
  },
  (table) => ({
    timestampIdx: index().on(table.timestamp),
    blockIdIdx: index().on(table.blockId),
    idIdx: index().on(table._id),
  }),
);

export const BlocksRelations = relations(BlocksTable, ({ many }) => ({
  transactions: many(TransactionsTable, { relationName: 'block_transactions' }),
}));

export type BlockItem = typeof BlocksTable.$inferSelect;
