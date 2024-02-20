import {
  index,
  integer,
  jsonb,
  pgTable,
  serial,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core';
import { TransactionsTable } from '../transactions/TransactionModel';

export const OutputsTable = pgTable(
  'outputs',
  {
    _id: serial('_id').primaryKey(),
    id: varchar('id', { length: 66 }).notNull().unique(),
    timestamp: timestamp('timestamp').notNull(),
    data: jsonb('data'),
    transactionId: integer('transaction_id')
      .notNull()
      .references(() => TransactionsTable._id),
  },
  (table) => ({
    timestampIdx: index().on(table.timestamp),
    idIdx: index().on(table.id),
  }),
);
