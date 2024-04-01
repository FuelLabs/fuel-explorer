import { bigint } from 'drizzle-orm/pg-core';

import { ValueObject } from '~/core/ValueObject';

interface Props {
  value: number;
}

export class BridgeBlockTimestamp extends ValueObject<Props> {
  private constructor(props: Props) {
    super(props);
  }

  static type() {
    return bigint('timestamp', { mode: 'number' }).notNull();
  }

  static create(timestamp: number) {
    return new BridgeBlockTimestamp({ value: timestamp });
  }

  value() {
    return this.props.value;
  }
}
