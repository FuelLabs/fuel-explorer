import { bigint } from 'drizzle-orm/pg-core';

import { ValueObject } from '~/core/ValueObject';

interface Props {
  value: bigint;
}

export class BridgeBlockTimestamp extends ValueObject<Props> {
  private constructor(props: Props) {
    super(props);
  }

  static type() {
    return bigint('timestamp', { mode: 'number' }).notNull();
  }

  static create(timestamp: bigint) {
    return new BridgeBlockTimestamp({ value: timestamp });
  }

  value() {
    return Number(this.props.value);
  }
}
