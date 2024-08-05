import { jsonb } from 'drizzle-orm/pg-core';
import { ValueObject } from '~/core/ValueObject';
import type { GQLTransaction } from '~/graphql/generated/sdk-provider';

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
