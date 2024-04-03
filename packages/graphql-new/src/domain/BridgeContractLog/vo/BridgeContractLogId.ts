import { varchar } from 'drizzle-orm/pg-core';

import { Identifier } from '~/core/Identifier';

export class BridgeContractLogId extends Identifier<string> {
  private constructor(value: string) {
    super(value);
  }

  static type() {
    return varchar('_id', { length: 66 }).notNull().primaryKey();
  }

  static create(value: string) {
    return new BridgeContractLogId(value);
  }
}
