import { varchar } from 'drizzle-orm/pg-core';
import { Identifier } from '~/core/Identifier';

export type TxID = string;
export class TransactionModelID extends Identifier<TxID> {
  private constructor(id: TxID) {
    super(id);
  }

  static type() {
    return varchar('_id', { length: 66 }).notNull().primaryKey();
  }

  static create(transaction: any) {
    return new TransactionModelID(transaction._id);
  }

  static createSerial(blockHeight: number, index: number) {
    const height = String(blockHeight).padStart(32, '0');
    const indexStr = (index + 1).toString().padStart(16, '0');
    return new TransactionModelID(`${height}-${indexStr}`);
  }
}
