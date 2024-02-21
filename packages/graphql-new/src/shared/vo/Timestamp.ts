import { timestamp } from 'drizzle-orm/pg-core';
import { DateHelper } from '../domain/Date';
import { ValueObject } from '../domain/ValueObject';

interface Props {
  value: Date;
}

export class Timestamp extends ValueObject<Props> {
  private constructor(props: Props) {
    super(props);
  }

  static type() {
    return timestamp('timestamp').notNull();
  }

  static create(timestamp: string) {
    const value = DateHelper.tai64toDate(timestamp);
    return new Timestamp({ value });
  }

  get() {
    return this.props.value;
  }
}
