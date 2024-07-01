import { jsonb } from 'drizzle-orm/pg-core';
import { ValueObject } from '~/core/ValueObject';
import type { GQLInput } from '~/graphql/generated/sdk-provider';

interface Props {
  value: GQLInput;
}

export class InputData extends ValueObject<Props> {
  private constructor(props: Props) {
    super(props);
  }

  static type() {
    return jsonb('data').notNull().$type<GQLInput>();
  }

  static create(value: GQLInput) {
    return new InputData({ value });
  }

  value() {
    return this.props.value;
  }
}
