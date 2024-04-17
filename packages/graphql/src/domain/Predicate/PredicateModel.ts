import { index, pgTable } from 'drizzle-orm/pg-core';
import { Hash256 } from '~/application/vo';
import { Bytecode } from '~/application/vo/Bytecode';
import { SerialID } from '~/application/vo/SerialID';

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
