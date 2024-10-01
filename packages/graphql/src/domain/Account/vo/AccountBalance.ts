import { bigint as DrizzleBigint } from 'drizzle-orm/pg-core';
import { ValueObject } from '../../../core/ValueObject';
interface Props {
  value: bigint;
}

export class AccountBalance extends ValueObject<Props> {
  private constructor(props: Props) {
    super(props);
  }

  static type() {
    return DrizzleBigint('balance', { mode: 'bigint' }).notNull();
  }

  static create(value: bigint) {
    return new AccountBalance({ value });
  }

  value() {
    return this.props.value;
  }

  add(amount: bigint): AccountBalance {
    return new AccountBalance({ value: this.value() + amount });
  }
}
