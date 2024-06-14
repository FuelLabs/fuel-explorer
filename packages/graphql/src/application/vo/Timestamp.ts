import { timestamp } from 'drizzle-orm/pg-core';
import { DateHelper } from '~/core/Date';
import { ValueObject } from '~/core/ValueObject';

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
    return new Timestamp({ value: value.toDate() });
  }

  value() {
    return this.props.value;
  }
}
