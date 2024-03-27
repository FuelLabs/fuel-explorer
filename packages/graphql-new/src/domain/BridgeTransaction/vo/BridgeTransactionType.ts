import { pgEnum } from 'drizzle-orm/pg-core';
import { ValueObject } from '~/core/ValueObject';

const options = ['deposit', 'withdraw'] as const;

type Value = (typeof options)[number];
interface Props {
  value: Value;
}

export const bridgeTransactionTypeEnum = pgEnum('type', options);
export class BridgeTransactionType extends ValueObject<Props> {
  static type() {
    return bridgeTransactionTypeEnum('type').notNull();
  }

  static create(value: Value) {
    return new BridgeTransactionType({ value });
  }

  value() {
    return this.props.value;
  }
}
