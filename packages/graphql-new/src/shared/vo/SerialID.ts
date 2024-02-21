import { serial } from 'drizzle-orm/pg-core';
import { ValueObject } from '../domain/ValueObject';

interface Props {
  value: string;
}

export class SerialID extends ValueObject<Props> {
  private constructor(props: Props) {
    super(props);
  }

  static type() {
    return serial('_id').primaryKey();
  }

  static create(value: string) {
    return new SerialID({ value });
  }

  get() {
    return this.props.value;
  }
}
