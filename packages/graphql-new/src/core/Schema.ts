import { relations } from 'drizzle-orm';
import {
  index,
  integer,
  jsonb,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core';
import { GQLBlock, GQLTransaction } from '../generated/types';

export const blocks = pgTable(
  'blocks',
  {
    _id: serial('_id').primaryKey(),
    id: varchar('id', { length: 66 }).notNull().unique(),
    timestamp: timestamp('timestamp').notNull(),
    height: integer('height').notNull(),
    data: jsonb('data').notNull().$type<GQLBlock>(),
  },
  (table) => ({
    heightIdx: index().on(table.height),
    timestampIdx: index().on(table.timestamp),
    idIdx: index().on(table.id),
  }),
);

export const transactions = pgTable(
  'transactions',
  {
    _id: serial('_id').primaryKey(),
    id: varchar('id', { length: 66 }).notNull().unique(),
    timestamp: timestamp('timestamp'),
    data: jsonb('data').$type<GQLTransaction>(),
    accountsIndex: text('accountsIndex').notNull().default(''),
    blockId: integer('block_id')
      .notNull()
      .references(() => blocks._id),
  },
  (table) => ({
    timestampIdx: index().on(table.timestamp),
    idIdx: index().on(table.id),
  }),
);

export const inputs = pgTable(
  'inputs',
  {
    _id: serial('_id').primaryKey(),
    id: varchar('id', { length: 66 }).notNull().unique(),
    timestamp: timestamp('timestamp').notNull(),
    data: jsonb('data'),
    transactionId: integer('transaction_id')
      .notNull()
      .references(() => transactions._id),
  },
  (table) => ({
    timestampIdx: index().on(table.timestamp),
    idIdx: index().on(table.id),
  }),
);

export const outputs = pgTable(
  'outputs',
  {
    _id: serial('_id').primaryKey(),
    id: varchar('id', { length: 66 }).notNull().unique(),
    timestamp: timestamp('timestamp').notNull(),
    data: jsonb('data'),
    transactionId: integer('transaction_id')
      .notNull()
      .references(() => transactions._id),
  },
  (table) => ({
    timestampIdx: index().on(table.timestamp),
    idIdx: index().on(table.id),
  }),
);

export const transactionsReletaions = relations(
  transactions,
  ({ one, many }) => ({
    inputs: many(inputs, { relationName: 'transaction_inputs' }),
    outputs: many(outputs, { relationName: 'transaction_outputs' }),
    block: one(blocks, {
      fields: [transactions.blockId],
      references: [blocks._id],
      relationName: 'transaction_block',
    }),
  }),
);

export const blocksRelations = relations(blocks, ({ many }) => ({
  transactions: many(transactions, { relationName: 'block_transactions' }),
}));

export const inputsRelations = relations(inputs, ({ one }) => ({
  transaction: one(transactions, {
    fields: [inputs.transactionId],
    references: [transactions._id],
    relationName: 'input_transaction',
  }),
}));

export const outputsRelations = relations(outputs, ({ one }) => ({
  transaction: one(transactions, {
    fields: [outputs.transactionId],
    references: [transactions._id],
    relationName: 'output_transaction',
  }),
}));

export class Schema {
  blocks: typeof blocks;
  transactions: typeof transactions;
  inputs: typeof inputs;
  outputs: typeof outputs;

  constructor() {
    this.blocks = blocks;
    this.transactions = transactions;
    this.inputs = inputs;
    this.outputs = outputs;
  }
}
