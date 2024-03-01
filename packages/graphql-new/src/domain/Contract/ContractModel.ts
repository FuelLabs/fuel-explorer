import { index, pgTable } from 'drizzle-orm/pg-core';
import { HashID } from '~/application/vo';
import { SerialID } from '~/application/vo/SerialID';
import { ContractData } from './vo/ContractData';

export const ContractsTable = pgTable(
  'contracts',
  {
    _id: SerialID.type(),
    contractId: HashID.type(),
    data: ContractData.type(),
  },
  (table) => ({
    idIdx: index().on(table._id),
    contractIdIdx: index().on(table.contractId),
  }),
);

export type ContractItem = typeof ContractsTable.$inferSelect;
