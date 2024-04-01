import { index, pgTable } from 'drizzle-orm/pg-core';
import { Hash256 } from '~/application/vo';
import { SerialID } from '~/application/vo/SerialID';

import { BridgeContractLogBlock } from './vo/BridgeContractLogBlock';
import { BridgeContractLogName } from './vo/BridgeContractLogName';

export const BridgeContractLogsTable = pgTable(
  'bridge_contract_logs',
  {
    _id: SerialID.type(),
    name: BridgeContractLogName.type(),
    contract_id: Hash256.type('contract_id'),
    sender: Hash256.type('sender'),
    recipient: Hash256.type('recipient'),
    block: BridgeContractLogBlock.type(),
  },
  (table) => ({
    contractIdIdx: index().on(table._id),
  }),
);

export type BridgeContractLogItem = typeof BridgeContractLogsTable.$inferSelect;
