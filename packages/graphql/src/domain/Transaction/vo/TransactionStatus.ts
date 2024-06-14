import { text } from 'drizzle-orm/pg-core';
import { ValueObject } from '~/core/ValueObject';
import type {
  GQLTransaction,
  GQLTransactionStatus,
  Maybe,
} from '~/graphql/generated/sdk-provider';

interface Props {
  value: Maybe<GQLTransactionStatus['__typename']> | undefined;
  data: Maybe<GQLTransactionStatus> | undefined;
}

export class TransactionStatus extends ValueObject<Props> {
  private constructor(props: Props) {
    super(props);
  }

  static type() {
    return text('timestamp');
  }

  static create(transaction: GQLTransaction) {
    return new TransactionStatus({
      value: transaction.status?.__typename,
      data: transaction.status,
    });
  }

  data() {
    return this.props.data;
  }

  value() {
    return this.type;
  }

  is(status: 'Success' | 'Failure' | 'Squeezed' | 'Submitted') {
    const statusType = this.props.value;
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
