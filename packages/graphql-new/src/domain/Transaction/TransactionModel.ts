import { relations } from 'drizzle-orm';
import { index, pgTable } from 'drizzle-orm/pg-core';
import { Hash256 } from '~/application/vo';
import { BlockItem, BlocksTable } from '~/domain/Block/BlockModel';
import { BlockRef } from '~/domain/Block/vo/BlockRef';
import { InputsTable } from '~/domain/Input/InputModel';
import { OutputsTable } from '~/domain/Output/OutputModel';
import { OperationItem, OperationsTable } from '../Operation/OperationModel';
import { AccountIndex } from './vo/AccountIndex';
import { TransactionData } from './vo/TransactionData';
import { TransactionModelID } from './vo/TransactionModelID';
import { TransactionTimestamp } from './vo/TransactionTimestamp';

export const TransactionsTable = pgTable(
  'transactions',
  {
    _id: TransactionModelID.type(),
    txHash: Hash256.type('tx_hash').unique(),
    timestamp: TransactionTimestamp.type(),
    data: TransactionData.type(),
    accountIndex: AccountIndex.type(),
    blockId: BlockRef.type(),
  },
  (table) => ({
    txTimestampIdx: index().on(table.timestamp),
    txIdIdx: index().on(table._id),
  }),
);

export const TransactionsRelations = relations(
  TransactionsTable,
  ({ one, many }) => ({
    inputs: many(InputsTable),
    outputs: many(OutputsTable),
    operations: many(OperationsTable),
    block: one(BlocksTable, {
      fields: [TransactionsTable.blockId],
      references: [BlocksTable._id],
    }),
  }),
);

type BaseTransactionItem = typeof TransactionsTable.$inferSelect;

export interface TransactionItem extends BaseTransactionItem {
  operations?: OperationItem[];
  block?: BlockItem;
}
