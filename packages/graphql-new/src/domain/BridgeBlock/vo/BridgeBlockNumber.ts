import { bigint } from 'drizzle-orm/pg-core';

import { Identifier } from '~/core/Identifier';

export class BridgeBlockNumber extends Identifier<number> {
  private constructor(value: number) {
    super(value);
  }

  static type() {
    return bigint('number', { mode: 'number' }).notNull();
  }

  static create(value: number) {
    return new BridgeBlockNumber(value);
  }
}
