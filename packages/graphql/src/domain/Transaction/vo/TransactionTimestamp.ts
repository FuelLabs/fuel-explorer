import { timestamp } from 'drizzle-orm/pg-core';
import { DateHelper } from '~/core/Date';
import { ValueObject } from '~/core/ValueObject';
import type { GQLTransaction } from '~/graphql/generated/sdk-provider';

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
