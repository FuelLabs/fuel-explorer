import {
  bigint,
  integer,
  jsonb,
  pgTable,
  serial,
  text,
} from 'drizzle-orm/pg-core';

// Define the schema for the accounts table
export const AccountsTable = pgTable('accounts', {
  _id: serial('_id').primaryKey(),
  address: text('address').notNull().unique(), // Account address (unique identifier)
  transaction_count: integer('transaction_count').notNull().default(0), // Number of transactions associated with the account
  balance: bigint('balance', { mode: 'bigint' }).notNull().default(0n), // Account balance as a bigint
  data: jsonb('data').notNull().default({}), // Additional account data stored as JSONB
});
