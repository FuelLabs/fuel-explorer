import { text } from 'drizzle-orm/pg-core';
import { ValueObject } from '~/core/ValueObject';

interface Props {
  value: string;
}

export class Address extends ValueObject<Props> {
  private constructor(props: Props) {
    super(props);
  }

  static type() {
    return text('address').notNull().unique();
  }

  static create(value: string) {
    return new Address({ value });
  }

  value() {
    return this.props.value;
  }
}
