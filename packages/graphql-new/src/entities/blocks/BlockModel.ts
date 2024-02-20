import { relations } from 'drizzle-orm';
import {
  index,
  integer,
  jsonb,
  pgTable,
  serial,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core';
import { GQLBlock } from '~/generated/types';
import { TransactionsTable } from '../transactions/TransactionModel';

export const BlocksTable = pgTable(
  'blocks',
  {
    _id: serial('_id').primaryKey(),
    id: varchar('id', { length: 66 }).notNull().unique(),
    timestamp: timestamp('timestamp').notNull(),
    height: integer('height').notNull(),
    data: jsonb('data').notNull().$type<GQLBlock>(),
  },
  (table) => ({
    heightIdx: index().on(table.height),
    timestampIdx: index().on(table.timestamp),
    idIdx: index().on(table.id),
  }),
);

export const BlocksRelations = relations(BlocksTable, ({ many }) => ({
  transactions: many(TransactionsTable, { relationName: 'block_transactions' }),
}));
