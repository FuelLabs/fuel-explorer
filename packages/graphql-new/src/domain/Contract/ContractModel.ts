import { index, pgTable } from 'drizzle-orm/pg-core';
import { Hash256 } from '~/application/vo';
import { SerialID } from '~/application/vo/SerialID';
import { ContractData } from './vo/ContractData';

export const ContractsTable = pgTable(
  'contracts',
  {
    _id: SerialID.type(),
    contractHash: Hash256.type('contract_hash').unique(),
    data: ContractData.type(),
  },
  (table) => ({
    contractIdIdx: index().on(table._id),
    contractHashIdx: index().on(table.contractHash),
  }),
);

export type ContractItem = typeof ContractsTable.$inferSelect;
