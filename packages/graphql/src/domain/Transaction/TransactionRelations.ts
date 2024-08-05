import { relations } from 'drizzle-orm';
import { BlocksTable } from '../Block/BlockModel';
import { InputsTable } from '../Input/InputModel';
import { OperationsTable } from '../Operation/OperationModel';
import { OutputsTable } from '../Output/OutputModel';
import { TransactionsTable } from './TransactionModel';

export const TransactionsRelations = relations(
  TransactionsTable,
  ({ one, many }) => ({
    inputs: many(InputsTable),
    outputs: many(OutputsTable),
    operations: many(OperationsTable),
    block: one(BlocksTable, {
      fields: [TransactionsTable.blockId],
      references: [BlocksTable._id],
    }),
  }),
);
