import { varchar } from 'drizzle-orm/pg-core';
import { ValueObject } from '~/core/ValueObject';

interface Props {
  value: string;
}

export class BridgeContractLogName extends ValueObject<Props> {
  private constructor(props: Props) {
    super(props);
  }

  static type() {
    return varchar('name', { length: 30 }).notNull();
  }

  static create(value: string) {
    return new BridgeContractLogName({ value });
  }

  value() {
    return this.props.value;
  }
}
