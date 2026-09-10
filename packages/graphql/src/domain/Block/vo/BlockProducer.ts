import { varchar } from 'drizzle-orm/pg-core';
import { Address } from '~/core/Address';
import { ValueObject } from '~/core/ValueObject';

interface Props {
  value: Address | null;
}

export class BlockProducer extends ValueObject<Props> {
  static type() {
    return varchar('producer', { length: 66 });
  }

  static create(id: string | null) {
    if (!id) return new BlockProducer({ value: null });
    const address = new Address(id);
    return new BlockProducer({ value: address });
  }

  value() {
    return this.props.value;
  }
}
