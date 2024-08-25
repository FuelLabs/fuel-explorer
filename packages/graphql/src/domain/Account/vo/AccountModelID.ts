import { integer } from 'drizzle-orm/pg-core';
import { Identifier } from '../../../core/Identifier';

export class AccountModelID extends Identifier<number> {
  private constructor(id: number) {
    super(id);
  }

  static type() {
    return integer('_id').primaryKey();
  }

  static create(account: any) {
    return new AccountModelID(Number(account._id));
  }
}
