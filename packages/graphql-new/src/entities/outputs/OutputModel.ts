import { index, pgTable } from 'drizzle-orm/pg-core';
import { HashID, Timestamp } from '~/shared/vo';
import { SerialID } from '~/shared/vo/SerialID';
import { TransactionRef } from '../transactions/vo/TransactionRef';
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
