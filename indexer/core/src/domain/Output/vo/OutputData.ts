import type { GQLOutput } from '@core/generated/gql-types';
import { ValueObject } from '@core/shared/ValueObject';
import { jsonb } from 'drizzle-orm/pg-core';

interface Props {
  value: GQLOutput;
}

export class OutputData extends ValueObject<Props> {
  private constructor(props: Props) {
    super(props);
  }

  static type() {
    return jsonb('data').notNull().$type<GQLOutput>();
  }

  static create(value: GQLOutput) {
    return new OutputData({ value });
  }

  value() {
    return this.props.value;
  }
}
