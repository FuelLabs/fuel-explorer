import { index, pgTable } from 'drizzle-orm/pg-core';
import { SerialID } from '~/application/vo/SerialID';
import { TransactionRef } from '~/domain/Transaction/vo/TransactionRef';
import { InputData } from './vo/InputData';

export const InputsTable = pgTable(
  'inputs',
  {
    _id: SerialID.type(),
    data: InputData.type(),
    transactionId: TransactionRef.type(),
  },
  (table) => ({
    idIdx: index().on(table._id),
  }),
);

export type InputItem = typeof InputsTable.$inferSelect;
