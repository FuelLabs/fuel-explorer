import { pgEnum } from 'drizzle-orm/pg-core';
import { ValueObject } from '~/core/ValueObject';

const options = ['DEPOSIT', 'WITHDRAW'] as const;

type Value = (typeof options)[number];
interface Props {
  value: Value;
}

export class BridgeTransactionType extends ValueObject<Props> {
  static type() {
    const typeEnum = pgEnum('type', options);
    return typeEnum('type').notNull();
  }

  static create(value: Value) {
    return new BridgeTransactionType({ value });
  }

  value() {
    return this.props.value;
  }
}
