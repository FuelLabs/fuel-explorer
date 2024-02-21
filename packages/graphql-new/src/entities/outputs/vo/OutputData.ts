import { jsonb } from 'drizzle-orm/pg-core';
import { GQLOutput } from '~/generated/types';
import { ValueObject } from '~/shared/domain/ValueObject';

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

  get() {
    return this.props.value;
  }
}
