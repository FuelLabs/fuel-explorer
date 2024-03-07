import { index, pgTable } from 'drizzle-orm/pg-core';
import { Hash256 } from '~/application/vo';
import { SerialID } from '~/application/vo/SerialID';
import { TransactionRef } from '~/domain/Transaction/vo/TransactionRef';
import { OperationData } from './vo/OperationData';

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

export type OperationItem = typeof OperationsTable.$inferSelect;
export type OperationPayload = Omit<OperationItem, '_id'>;
