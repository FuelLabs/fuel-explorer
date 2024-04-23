import { ValueObject } from '@core/shared/ValueObject';
import { integer } from 'drizzle-orm/pg-core';
import { BlocksTable } from '../BlockModel';

interface Props {
  value: number;
}

export class BlockRef extends ValueObject<Props> {
  private constructor(props: Props) {
    super(props);
  }

  static type() {
    return integer('block_id')
      .notNull()
      .references(() => BlocksTable._id);
  }

  static create(id: number) {
    return new BlockRef({ value: id });
  }

  value() {
    return this.props.value;
  }
}
