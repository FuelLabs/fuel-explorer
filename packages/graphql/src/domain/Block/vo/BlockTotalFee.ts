import { varchar } from 'drizzle-orm/pg-core';
import { bn } from 'fuels';
import { GasFee } from '~/application/vo/GasFee';
import { ValueObject } from '~/core/ValueObject';
import type { GQLBlock } from '~/graphql/generated/sdk-provider';

interface Props {
  value: string;
}

export class BlockTotalFee extends ValueObject<Props> {
  private constructor(props: Props) {
    super(props);
  }

  static type() {
    return varchar('total_fee', { length: 66 });
  }

  static create(item: GQLBlock) {
    const value = item.transactions.reduce((acc, transaction) => {
      const txFee = GasFee.create(transaction).value();
      return acc.add(txFee);
    }, bn(0));
    return new BlockTotalFee({ value: value.toString() });
  }

  value() {
    return this.props.value;
  }

  toBN() {
    return bn(this.props.value);
  }
}
