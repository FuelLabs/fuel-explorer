import { varchar } from 'drizzle-orm/pg-core';
import { ValueObject } from '~/core/ValueObject';
import { TransactionsTable } from '../TransactionModel';
import type { TxID } from './TransactionModelID';

interface Props {
  value: TxID;
}

export class TransactionRef extends ValueObject<Props> {
  private constructor(props: Props) {
    super(props);
  }

  static type() {
    return varchar('transaction_id', { length: 66 })
      .notNull()
      .references(() => TransactionsTable._id);
  }

  static create(value: TxID) {
    return new TransactionRef({ value });
  }

  value() {
    return this.props.value;
  }
}
