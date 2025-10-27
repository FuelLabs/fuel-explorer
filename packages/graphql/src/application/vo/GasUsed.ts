import { type BN, bn } from 'fuels';
import { ValueObject } from '~/core/ValueObject';
import type { GQLTransaction } from '~/graphql/generated/sdk-provider';

interface Props {
  value: BN;
}

export class GasUsed extends ValueObject<Props> {
  private constructor(props: Props) {
    super(props);
  }

  static create(transaction: GQLTransaction) {
    const { status } = transaction;
    if (status && 'totalGas' in status) {
      const value = bn(status.totalGas);
      return new GasUsed({ value });
    }

    return new GasUsed({ value: bn(0) });
  }

  value() {
    return this.props.value;
  }
}
