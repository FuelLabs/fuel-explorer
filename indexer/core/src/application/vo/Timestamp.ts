import { DateHelper } from '@core/shared/Date';
import { ValueObject } from '@core/shared/ValueObject';
import { timestamp } from 'drizzle-orm/pg-core';

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
