import { relations } from 'drizzle-orm';
import { index, pgTable } from 'drizzle-orm/pg-core';

import { Hash256 } from '@core/application/vo';
import { SerialID } from '@core/application/vo/SerialID';
import { TransactionRef } from '@core/domain/Transaction/vo/TransactionRef';
import { OperationData } from './vo/OperationData';

import { TransactionsTable } from '../Transaction/TransactionModel';

export const OperationsTable = pgTable(
  'operations',
  {
    _id: SerialID.type(),
    data: OperationData.type(),
    transactionId: TransactionRef.type(),
    transactionHash: Hash256.type('transaction_hash'),
  },
  (table) => ({
    operationIdIdx: index().on(table._id),
  }),
);

export const OperationsRelations = relations(OperationsTable, ({ one }) => ({
  transaction: one(TransactionsTable, {
    fields: [OperationsTable.transactionId],
    references: [TransactionsTable._id],
  }),
}));

export type OperationItem = typeof OperationsTable.$inferSelect;
export type OperationPayload = Omit<OperationItem, '_id'>;
