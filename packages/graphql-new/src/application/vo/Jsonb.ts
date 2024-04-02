import { customType } from 'drizzle-orm/pg-core';

import { ValueObject } from '~/core/ValueObject';

interface Props<TValue> {
  value: TValue;
}

export class Jsonb<TValue> extends ValueObject<Props<TValue>> {
  private constructor(props: Props<TValue>) {
    super(props);
  }

  static type<TValue>(field: string) {
    const stringifyBigInts = (_key: string, value: unknown) => {
      if (typeof value === 'bigint') {
        return value.toString();
      }

      return value;
    };

    const jsonbEncoded = customType<{ data: TValue; driverData: string }>({
      dataType: () => 'jsonb',
      toDriver: (value) => JSON.stringify(value, stringifyBigInts),
    });

    return jsonbEncoded(field).notNull();
  }

  static create<TValue>(value: TValue) {
    return new Jsonb({
      value,
    });
  }

  value() {
    return this.props.value;
  }
}
