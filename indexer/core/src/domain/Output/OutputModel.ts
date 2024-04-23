import { SerialID } from '@core/application/vo/SerialID';
import { TransactionRef } from '@core/domain/Transaction/vo/TransactionRef';
import { index, pgTable } from 'drizzle-orm/pg-core';
import { OutputData } from './vo/OutputData';

export const OutputsTable = pgTable(
  'outputs',
  {
    _id: SerialID.type(),
    data: OutputData.type(),
    transactionId: TransactionRef.type(),
  },
  (table) => ({
    outputIdIdx: index().on(table._id),
  }),
);

export type OutputItem = typeof OutputsTable.$inferSelect;
export type OutputPayload = Omit<OutputItem, '_id'>;
