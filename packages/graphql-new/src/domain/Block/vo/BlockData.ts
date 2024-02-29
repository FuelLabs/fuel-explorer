import { jsonb } from 'drizzle-orm/pg-core';
import { ValueObject } from '~/core/ValueObject';
import { GQLBlock } from '~/generated/types';

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

  get() {
    return this.props.value;
  }
}
