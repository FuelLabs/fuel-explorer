import { index, pgTable } from 'drizzle-orm/pg-core';
import { HashID, Timestamp } from '~/application/vo';
import { SerialID } from '~/application/vo/SerialID';
import { TransactionRef } from '~/domain/Transaction/vo/TransactionRef';
import { InputData } from './vo/InputData';

export const InputsTable = pgTable(
  'inputs',
  {
    _id: SerialID.type(),
    id: HashID.type(),
    timestamp: Timestamp.type(),
    data: InputData.type(),
    transactionId: TransactionRef.type(),
  },
  (table) => ({
    timestampIdx: index().on(table.timestamp),
    idIdx: index().on(table.id),
  }),
);

export type InputItem = typeof InputsTable.$inferSelect;
