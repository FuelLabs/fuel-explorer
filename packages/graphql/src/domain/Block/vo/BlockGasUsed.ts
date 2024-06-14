import { varchar } from 'drizzle-orm/pg-core';
import { bn } from 'fuels';
import { GasUsed } from '~/application/vo/GasUsed';
import { ValueObject } from '~/core/ValueObject';
import type { GQLBlock } from '~/graphql/generated/sdk-provider';

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
