import { timestamp } from 'drizzle-orm/pg-core';
import { ValueObject } from '~/core/ValueObject';
import {
  GQLTransaction,
  GQLTransactionStatus,
  Maybe,
} from '~/graphql/generated/sdk';

interface Props {
  value: Maybe<GQLTransactionStatus> | undefined;
}

export class TransactionStatus extends ValueObject<Props> {
  private constructor(props: Props) {
    super(props);
  }

  static type() {
    return timestamp('timestamp');
  }

  static create(transaction: GQLTransaction) {
    return new TransactionStatus({ value: transaction.status });
  }

  value() {
    return this.props.value;
  }

  is(status: 'Success' | 'Failure' | 'Squeezed' | 'Submitted') {
    const statusType = this.value()?.__typename;
    if (status === 'Success') return statusType === 'SuccessStatus';
    if (status === 'Failure') return statusType === 'FailureStatus';
    if (status === 'Squeezed') return statusType === 'SqueezedOutStatus';
    return statusType === 'SubmittedStatus';
  }

  get type() {
    if (this.is('Success')) return 'Success';
    if (this.is('Failure')) return 'Failure';
    if (this.is('Squeezed')) return 'Squeezed';
    return 'Submitted';
  }
}
