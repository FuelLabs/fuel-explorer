import { integer } from 'drizzle-orm/pg-core';
import { ValueObject } from '~/core/ValueObject';

interface Props {
  value: number;
}

export class BridgeContractLogBlock extends ValueObject<Props> {
  private constructor(props: Props) {
    super(props);
  }

  static type() {
    return integer('block').notNull();
  }

  static create(value: number) {
    return new BridgeContractLogBlock({ value });
  }

  value() {
    return this.props.value;
  }
}
