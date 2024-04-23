import type { GQLBlock } from '@core/generated/gql-types';
import { ValueObject } from '@core/shared/ValueObject';
import { jsonb } from 'drizzle-orm/pg-core';

interface Props {
  value: GQLBlock;
}

export class BlockData extends ValueObject<Props> {
  private constructor(props: Props) {
    super(props);
  }

  static type() {
    return jsonb('data').notNull().$type<GQLBlock>();
  }

  static create(value: GQLBlock) {
    return new BlockData({ value });
  }

  value() {
    return this.props.value;
  }
}
