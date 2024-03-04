import { index, pgTable } from 'drizzle-orm/pg-core';
import { HashID } from '~/application/vo';
import { SerialID } from '~/application/vo/SerialID';
import { ContractData } from './vo/ContractData';

export const ContractsTable = pgTable(
  'contracts',
  {
    _id: SerialID.type(),
    contractHash: HashID.type(),
    data: ContractData.type(),
  },
  (table) => ({
    contractIdIdx: index().on(table._id),
    contractHashIdx: index().on(table.contractHash),
  }),
);

export type ContractItem = typeof ContractsTable.$inferSelect;
