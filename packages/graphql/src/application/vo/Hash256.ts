import { varchar } from 'drizzle-orm/pg-core';
import { ValueObject } from '~/core/ValueObject';

interface Props {
  value: string;
}

export class Hash256 extends ValueObject<Props> {
  static type(field: string) {
    return varchar(field, { length: 66 }).notNull();
  }

  static create(value: string) {
    return new Hash256({ value });
  }

  value() {
    return this.props.value;
  }
}
