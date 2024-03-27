import { index, pgTable } from 'drizzle-orm/pg-core';
import { Hash256 } from '~/application/vo';
import { SerialID } from '~/application/vo/SerialID';

import { BridgeTransactionType } from './vo/BridgeTransactionType';

export const BridgeTransactionsTable = pgTable(
  'bridge_transactions',
  {
    _id: SerialID.type(),
    type: BridgeTransactionType.type(),
    ethTxId: Hash256.type('eth_tx_id'),
    fuelTxId: Hash256.type('fuel_tx_id'),
  },
  (table) => ({
    contractIdIdx: index().on(table._id),
  }),
);

export type BridgeTransactionItem = typeof BridgeTransactionsTable.$inferSelect;
