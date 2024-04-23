import { GasUsed } from '@core/application/vo/GasUsed';
import type { GQLBlock } from '@core/generated/gql-types';
import { ValueObject } from '@core/shared/ValueObject';
import { varchar } from 'drizzle-orm/pg-core';
import { bn } from 'fuels';

interface Props {
  value: string;
}

export class BlockGasUsed extends ValueObject<Props> {
  private constructor(props: Props) {
    super(props);
  }

  static type() {
    return varchar('gas_used', { length: 66 });
  }

  static create(item: GQLBlock) {
    const value = item.transactions.reduce((acc, transaction) => {
      const txGasUsed = GasUsed.create(transaction).value();
      return acc.add(txGasUsed);
    }, bn(0));
    return new BlockGasUsed({ value: value.toString() });
  }

  value() {
    return this.props.value;
  }

  toBN() {
    return bn(this.props.value);
  }
}
