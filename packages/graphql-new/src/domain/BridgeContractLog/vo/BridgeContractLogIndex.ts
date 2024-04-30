import { integer } from 'drizzle-orm/pg-core';
import { ValueObject } from '~/core/ValueObject';

interface Props {
  value: number;
}

export class BridgeContractLogIndex extends ValueObject<Props> {
  private constructor(props: Props) {
    super(props);
  }

  static type() {
    return integer('log_index').notNull();
  }

  static create(value: number) {
    return new BridgeContractLogIndex({ value });
  }

  value() {
    return this.props.value;
  }
}
