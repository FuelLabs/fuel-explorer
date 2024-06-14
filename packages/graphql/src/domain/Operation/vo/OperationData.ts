import { jsonb } from 'drizzle-orm/pg-core';
import { ValueObject } from '~/core/ValueObject';
import type { GQLOperation } from '~/graphql/generated/sdk-provider';

interface Props {
  value: GQLOperation;
}

export class OperationData extends ValueObject<Props> {
  private constructor(props: Props) {
    super(props);
  }

  static type() {
    return jsonb('data').notNull().$type<GQLOperation>();
  }

  static create(operation: GQLOperation) {
    return new OperationData({ value: operation });
  }

  value() {
    return this.props.value;
  }
}
