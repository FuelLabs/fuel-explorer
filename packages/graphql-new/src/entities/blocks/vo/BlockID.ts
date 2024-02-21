import { integer } from 'drizzle-orm/pg-core';
import { GQLBlock } from '~/generated/types';
import { ValueObject } from '~/shared/domain/ValueObject';

interface Props {
  value: number;
}

export class BlockID extends ValueObject<Props> {
  private constructor(props: Props) {
    super(props);
  }

  static type() {
    return integer('_id').primaryKey();
  }

  static create(block: GQLBlock) {
    return new BlockID({ value: Number(block.header.height) });
  }

  get() {
    return this.props.value;
  }
}
