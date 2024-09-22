import { jsonb } from 'drizzle-orm/pg-core';
import { ValueObject } from '../../../core/ValueObject';

interface Props {
  value: any;
}

export class AccountData extends ValueObject<Props> {
  private constructor(props: Props) {
    super(props);
  }

  static type() {
    return jsonb('data').notNull();
  }

  static create(value: any) {
    return new AccountData({ value });
  }

  value() {
    return this.props.value;
  }
}
