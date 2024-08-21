import { jsonb } from 'drizzle-orm/pg-core';
import { ValueObject } from '~/core/ValueObject';
import type { GQLOutput } from '~/graphql/generated/sdk-provider';

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
