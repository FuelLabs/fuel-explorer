import { varchar } from 'drizzle-orm/pg-core';
import { Address as FuelAddr, isB256, isBech32 } from 'fuels';
import { ValueObject } from '~/core/ValueObject';

interface Props {
  value: string;
}

export class HashID extends ValueObject<Props> {
  private constructor(props: Props) {
    super(props);
  }

  static type() {
    return varchar('id', { length: 66 }).notNull().unique();
  }

  static create(id: string) {
    const isValid = id && (isB256(id) || isBech32(id));
    if (!id || !isValid) {
      throw new Error('Invalid address');
    }

    const value = FuelAddr.fromString(id).toB256();
    return new HashID({ value });
  }

  value() {
    return this.props.value;
  }
}
