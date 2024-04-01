import { bigint } from 'drizzle-orm/pg-core';

import { ValueObject } from '~/core/ValueObject';

interface Props {
  value: number;
}

export class BridgeBlockNumber extends ValueObject<Props> {
  private constructor(props: Props) {
    super(props);
  }

  static type() {
    return bigint('number', { mode: 'number' }).notNull();
  }

  static create(value: number) {
    return new BridgeBlockNumber({ value });
  }

  value() {
    return this.props.value;
  }
}
