import { jsonb } from 'drizzle-orm/pg-core';
import { GQLInput } from '~/generated/types';
import { ValueObject } from '~/shared/domain/ValueObject';

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

  get() {
    return this.props.value;
  }
}
