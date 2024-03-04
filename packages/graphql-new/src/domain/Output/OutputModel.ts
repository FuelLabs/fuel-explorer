import { index, pgTable } from 'drizzle-orm/pg-core';
import { SerialID } from '~/application/vo/SerialID';
import { TransactionRef } from '~/domain/Transaction/vo/TransactionRef';
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
