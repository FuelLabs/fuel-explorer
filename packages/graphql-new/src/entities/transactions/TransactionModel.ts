import { relations } from 'drizzle-orm';
import { index, pgTable } from 'drizzle-orm/pg-core';
import { HashID } from '~/shared/vo';
import { BlocksTable } from '../blocks/BlockModel';
import { BlockRef } from '../blocks/vo/BlockRef';
import { InputsTable } from '../inputs/InputModel';
import { OutputsTable } from '../outputs/OutputModel';
import { AccountIndex } from './vo/AccountIndex';
import { TransactionData } from './vo/TransactionData';
import { TransactionID } from './vo/TransactionID';
import { TransactionTimestamp } from './vo/TransactionTimestamp';

export const TransactionsTable = pgTable(
  'transactions',
  {
    _id: TransactionID.type(),
    id: HashID.type(),
    timestamp: TransactionTimestamp.type(),
    data: TransactionData.type(),
    accountsIndex: AccountIndex.type(),
    blockId: BlockRef.type(),
  },
  (table) => ({
    timestampIdx: index().on(table.timestamp),
    idIdx: index().on(table.id),
  }),
);

export const transactionsReletaions = relations(
  TransactionsTable,
  ({ one, many }) => ({
    inputs: many(InputsTable, { relationName: 'transaction_inputs' }),
    outputs: many(OutputsTable, { relationName: 'transaction_outputs' }),
    block: one(BlocksTable, {
      fields: [TransactionsTable.blockId],
      references: [BlocksTable._id],
      relationName: 'transaction_block',
    }),
  }),
);

export type TransactionItem = typeof TransactionsTable.$inferSelect;
