import { integer } from 'drizzle-orm/pg-core';
import { Identifier } from '../../../core/Identifier';

export class AccountModelID extends Identifier<number> {
  private constructor(id: number) {
    super(id);
  }

  static type() {
    return integer('_id').primaryKey();
  }

  static create(id: number): AccountModelID {
    if (typeof id !== 'number' || Number.isNaN(id)) {
      throw new Error('Invalid ID: ID must be a valid number.');
    }

    return new AccountModelID(id);
  }
}
