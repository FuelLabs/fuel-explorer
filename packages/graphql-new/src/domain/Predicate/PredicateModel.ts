import { index, pgTable } from 'drizzle-orm/pg-core';
import { HashID } from '~/application/vo';
import { Bytecode } from '~/application/vo/Bytecode';
import { SerialID } from '~/application/vo/SerialID';

export const PredicatesTable = pgTable(
  'outputs',
  {
    _id: SerialID.type(),
    bytecode: Bytecode.type(),
    address: HashID.type(),
  },
  (table) => ({
    idIdx: index().on(table._id),
    addressIdx: index().on(table.address),
  }),
);

export type PredicateItem = typeof PredicatesTable.$inferSelect;
export type PredicatePayload = Omit<PredicateItem, '_id'>;
