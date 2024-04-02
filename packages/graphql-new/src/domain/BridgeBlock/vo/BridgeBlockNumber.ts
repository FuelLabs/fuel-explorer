import { bigint } from 'drizzle-orm/pg-core';

import { ValueObject } from '~/core/ValueObject';

interface Props {
  value: bigint;
}

export class BridgeBlockNumber extends ValueObject<Props> {
  private constructor(props: Props) {
    super(props);
  }

  static type() {
    return bigint('number', { mode: 'number' }).notNull();
  }

  static create(value: bigint) {
    return new BridgeBlockNumber({ value });
  }

  value() {
    return Number(this.props.value);
  }
}
