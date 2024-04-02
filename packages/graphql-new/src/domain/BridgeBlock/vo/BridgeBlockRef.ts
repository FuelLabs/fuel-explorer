import { integer } from 'drizzle-orm/pg-core';
import { ValueObject } from '~/core/ValueObject';

import { BridgeBlocksTable } from '~/domain/BridgeBlock/BridgeBlockModel';

interface Props {
  value: number;
}

export class BridgeContractLogBlockRef extends ValueObject<Props> {
  private constructor(props: Props) {
    super(props);
  }

  static type() {
    return integer('block_id')
      .notNull()
      .references(() => BridgeBlocksTable._id);
  }

  static create(value: number) {
    return new BridgeContractLogBlockRef({ value });
  }

  value() {
    return this.props.value;
  }
}
