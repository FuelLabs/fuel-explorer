import { integer } from 'drizzle-orm/pg-core';
import { ValueObject } from '~/core/ValueObject';
import { TransactionsTable } from '../TransactionModel';

interface Props {
  value: number;
}

export class TransactionRef extends ValueObject<Props> {
  private constructor(props: Props) {
    super(props);
  }

  static type() {
    return integer('transaction_id')
      .notNull()
      .references(() => TransactionsTable._id);
  }

  static create(value: number) {
    return new TransactionRef({ value });
  }

  value() {
    return this.props.value;
  }
}
