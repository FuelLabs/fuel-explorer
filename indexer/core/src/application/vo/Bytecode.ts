import { ValueObject } from '@core/shared/ValueObject';
import { text } from 'drizzle-orm/pg-core';

interface Props {
  value: string;
}

export class Bytecode extends ValueObject<Props> {
  private constructor(props: Props) {
    super(props);
  }

  static type() {
    return text('bytecode').notNull();
  }

  static create(value: string) {
    return new Bytecode({ value });
  }

  value() {
    return this.props.value;
  }
}
