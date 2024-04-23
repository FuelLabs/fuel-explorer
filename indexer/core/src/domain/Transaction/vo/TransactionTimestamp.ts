import type { GQLTransaction } from '@core/generated/gql-types';
import { DateHelper } from '@core/shared/Date';
import { ValueObject } from '@core/shared/ValueObject';
import { timestamp } from 'drizzle-orm/pg-core';

interface Props {
  value: Date | null;
}

export class TransactionTimestamp extends ValueObject<Props> {
  private constructor(props: Props) {
    super(props);
  }

  static type() {
    return timestamp('timestamp');
  }

  static create(transaction: GQLTransaction) {
    const value =
      transaction.status && 'time' in transaction.status
        ? DateHelper.tai64toDate(transaction.status.time).toDate()
        : null;

    return new TransactionTimestamp({ value });
  }

  value() {
    return this.props.value;
  }
}
