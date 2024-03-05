import { varchar } from 'drizzle-orm/pg-core';
import { Address } from '~/core/Address';
import { ValueObject } from '~/core/ValueObject';

interface Props {
  value: string;
}

export class Hash256 extends ValueObject<Props> {
  static type(field: string) {
    return varchar(field, { length: 66 }).notNull().unique();
  }

  static create(id: string) {
    const value = new Address(id).toB256();
    return new Hash256({ value });
  }

  value() {
    return this.props.value;
  }
}
