import { varchar } from 'drizzle-orm/pg-core';
import { ValueObject } from '~/core/ValueObject';

interface Props {
  value: string;
}

export class HashID extends ValueObject<Props> {
  private constructor(props: Props) {
    super(props);
  }

  static type() {
    return varchar('id', { length: 66 }).notNull().unique();
  }

  static create(hash: string) {
    if (hash.length !== 66) throw new Error('Invalid hash length');
    return new HashID({ value: hash });
  }

  get() {
    return this.props.value;
  }
}
