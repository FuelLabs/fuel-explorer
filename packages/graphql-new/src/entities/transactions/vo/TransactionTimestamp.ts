import { timestamp } from 'drizzle-orm/pg-core';
import { GQLTransaction } from '~/generated/types';
import { DateHelper } from '~/shared/domain/Date';
import { ValueObject } from '~/shared/domain/ValueObject';

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
        ? DateHelper.tai64toDate(transaction.status.time)
        : null;

    return new TransactionTimestamp({ value });
  }

  get() {
    return this.props.value;
  }
}
