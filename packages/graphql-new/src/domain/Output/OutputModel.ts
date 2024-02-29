import { index, pgTable } from 'drizzle-orm/pg-core';
import { HashID, Timestamp } from '~/application/vo';
import { SerialID } from '~/application/vo/SerialID';
import { TransactionRef } from '~/domain/Transaction/vo/TransactionRef';
import { OutputData } from './vo/OutputData';

export const OutputsTable = pgTable(
  'outputs',
  {
    _id: SerialID.type(),
    id: HashID.type(),
    timestamp: Timestamp.type(),
    data: OutputData.type(),
    transactionId: TransactionRef.type(),
  },
  (table) => ({
    timestampIdx: index().on(table.timestamp),
    idIdx: index().on(table.id),
  }),
);

export type OutputItem = typeof OutputsTable.$inferSelect;
