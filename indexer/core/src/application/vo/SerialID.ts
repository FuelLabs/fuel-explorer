import { Identifier } from '@core/shared/Identifier';
import { serial } from 'drizzle-orm/pg-core';

export class SerialID extends Identifier<number> {
  private constructor(id: number) {
    super(id);
  }

  static type() {
    return serial('_id').primaryKey();
  }

  static create(id: number) {
    return new SerialID(id);
  }
}
