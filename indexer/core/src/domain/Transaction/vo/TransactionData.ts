import type { GQLTransaction } from '@core/generated/gql-types';
import { ValueObject } from '@core/shared/ValueObject';
import { jsonb } from 'drizzle-orm/pg-core';

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
