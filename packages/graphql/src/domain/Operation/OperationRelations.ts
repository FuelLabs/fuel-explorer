import { relations } from 'drizzle-orm';
import { TransactionsTable } from '../Transaction/TransactionModel';
import { OperationsTable } from './OperationModel';

export const OperationsRelations = relations(OperationsTable, ({ one }) => ({
  transaction: one(TransactionsTable, {
    fields: [OperationsTable.transactionId],
    references: [TransactionsTable._id],
  }),
}));
