import { index, pgTable } from 'drizzle-orm/pg-core';
import { HashID, Timestamp } from '~/shared/vo';
import { SerialID } from '~/shared/vo/SerialID';
import { TransactionRef } from '../transactions/vo/TransactionRef';
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
