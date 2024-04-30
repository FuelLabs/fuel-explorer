import { bigint } from 'drizzle-orm/pg-core';
import { ValueObject } from '~/core/ValueObject';

import { BridgeBlocksTable } from '~/domain/BridgeBlock/BridgeBlockModel';

interface Props {
  value: bigint;
}

export class BridgeContractLogBlockRef extends ValueObject<Props> {
  private constructor(props: Props) {
    super(props);
  }

  static type() {
    return bigint('block_number', { mode: 'number' })
      .notNull()
      .references(() => BridgeBlocksTable._id);
  }

  static create(value: bigint) {
    return new BridgeContractLogBlockRef({ value });
  }

  value() {
    return Number(this.props.value);
  }
}
