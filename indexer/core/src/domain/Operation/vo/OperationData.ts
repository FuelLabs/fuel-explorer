import type { GQLOperation } from '@core/generated/gql-types';
import { ValueObject } from '@core/shared/ValueObject';
import { jsonb } from 'drizzle-orm/pg-core';

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
    return new OperationData({
      value: operation,
    });
  }

  value() {
    return this.props.value;
  }
}
