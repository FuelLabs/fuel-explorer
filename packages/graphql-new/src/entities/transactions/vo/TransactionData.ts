import { jsonb } from 'drizzle-orm/pg-core';
import { GQLTransaction } from '~/generated/types';
import { ValueObject } from '~/shared/domain/ValueObject';

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

  get() {
    return this.props.value;
  }
}
