import { relations } from 'drizzle-orm';
import { TransactionsTable } from '../Transaction/TransactionModel';
import { BlocksTable } from './BlockModel';

export const BlocksRelations = relations(BlocksTable, ({ many }) => ({
  transactions: many(TransactionsTable),
}));
