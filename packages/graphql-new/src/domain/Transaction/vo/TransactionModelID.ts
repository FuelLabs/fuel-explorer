import { varchar } from 'drizzle-orm/pg-core';
import { Identifier } from '~/core/Identifier';
import { GQLBlock } from '~/graphql/generated/sdk';
import { TransactionItem } from '../TransactionModel';

export type TxID = string;
export class TransactionModelID extends Identifier<TxID> {
  private constructor(id: TxID) {
    super(id);
  }

  static type() {
    return varchar('_id', { length: 66 }).notNull().primaryKey();
  }

  static create(transaction: TransactionItem) {
    return new TransactionModelID(transaction._id);
  }

  static createSerial(block: GQLBlock, index: number) {
    const blockHeight = block.header.height.padStart(32, '0');
    const indexStr = (index + 1).toString().padStart(16, '0');
    return new TransactionModelID(`${blockHeight}-${indexStr}`);
  }
}
