import { Hash256 } from '@core/application/vo';
import { Bytecode } from '@core/application/vo/Bytecode';
import { SerialID } from '@core/application/vo/SerialID';
import { index, pgTable } from 'drizzle-orm/pg-core';

export const PredicatesTable = pgTable(
  'predicates',
  {
    _id: SerialID.type(),
    bytecode: Bytecode.type(),
    address: Hash256.type('address').unique(),
  },
  (table) => ({
    predicateIdIdx: index().on(table._id),
    predicateAddressIdx: index().on(table.address),
  }),
);

export type PredicateItem = typeof PredicatesTable.$inferSelect;
export type PredicatePayload = Omit<PredicateItem, '_id'>;
