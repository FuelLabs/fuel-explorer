import { relations } from 'drizzle-orm';
import {
  index,
  integer,
  jsonb,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core';
import { GQLTransaction } from '../../generated/types';
import { BlocksTable } from '../blocks/BlockEntity';
import { InputsTable } from '../inputs/InputEntity';
import { OutputsTable } from '../outputs/OutputEntity';

export const TransactionsTable = pgTable(
  'transactions',
  {
    _id: serial('_id').primaryKey(),
    id: varchar('id', { length: 66 }).notNull().unique(),
    timestamp: timestamp('timestamp'),
    data: jsonb('data').$type<GQLTransaction>(),
    accountsIndex: text('accountsIndex').notNull().default(''),
    blockId: integer('block_id')
      .notNull()
      .references(() => BlocksTable._id),
  },
  (table) => ({
    timestampIdx: index().on(table.timestamp),
    idIdx: index().on(table.id),
  }),
);

export const transactionsReletaions = relations(
  TransactionsTable,
  ({ one, many }) => ({
    inputs: many(InputsTable, { relationName: 'transaction_inputs' }),
    outputs: many(OutputsTable, { relationName: 'transaction_outputs' }),
    block: one(BlocksTable, {
      fields: [TransactionsTable.blockId],
      references: [BlocksTable._id],
      relationName: 'transaction_block',
    }),
  }),
);
