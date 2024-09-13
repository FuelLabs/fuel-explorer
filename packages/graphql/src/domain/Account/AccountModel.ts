import { integer, jsonb, pgTable, serial, text } from 'drizzle-orm/pg-core';

// Define the schema for the accounts table
export const AccountsTable = pgTable('accounts', {
  _id: serial('_id').primaryKey(),
  account_id: text('account_id').notNull().unique(),
  transaction_count: integer('transaction_count').notNull().default(0),
  data: jsonb('data').notNull().default({}),
});
