import { index, pgTable } from 'drizzle-orm/pg-core';
import { ChainData } from './vo/ChainData';
import { ChainModelID } from './vo/ChainModelID';

export const ChainsTable = pgTable(
  'chains',
  {
    _id: ChainModelID.type(),
    data: ChainData.type(),
  },
  (table) => ({
    idIdx: index().on(table._id),
  }),
);

export type ChainItem = typeof ChainsTable.$inferSelect;
