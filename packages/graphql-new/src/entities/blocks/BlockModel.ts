import { relations } from 'drizzle-orm';
import { index, pgTable } from 'drizzle-orm/pg-core';
import { HashID, Timestamp } from '~/shared/vo';
import { TransactionsTable } from '../transactions/TransactionModel';
import { BlockData } from './vo/BlockData';
import { BlockID } from './vo/BlockID';

export const BlocksTable = pgTable(
  'blocks',
  {
    _id: BlockID.type(),
    id: HashID.type(),
    timestamp: Timestamp.type(),
    data: BlockData.type(),
  },
  (table) => ({
    timestampIdx: index().on(table.timestamp),
    idIdx: index().on(table.id),
  }),
);

export const BlocksRelations = relations(BlocksTable, ({ many }) => ({
  transactions: many(TransactionsTable, { relationName: 'block_transactions' }),
}));

export type BlockItem = typeof BlocksTable.$inferSelect;
