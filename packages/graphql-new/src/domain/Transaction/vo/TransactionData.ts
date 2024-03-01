import { jsonb } from 'drizzle-orm/pg-core';
import { ValueObject } from '~/core/ValueObject';
import { GQLTransaction } from '~/generated/types';

interface Props {
  value: GQLTransaction;
}

export class TransactionData extends ValueObject<Props> {
  private constructor(props: Props) {
    super(props);
  }

  static type() {
    return jsonb('data').notNull().$type<GQLTransaction>();
  }

  static create(value: GQLTransaction) {
    return new TransactionData({ value });
  }

  value() {
    return this.props.value;
  }
}
