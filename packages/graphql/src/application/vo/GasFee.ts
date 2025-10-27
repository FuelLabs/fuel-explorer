import { type BN, bn } from 'fuels';
import { ValueObject } from '~/core/ValueObject';
import type { GQLTransaction } from '~/graphql/generated/sdk-provider';

interface Props {
  value: BN;
}

export class GasFee extends ValueObject<Props> {
  private constructor(props: Props) {
    super(props);
  }

  static create(transaction: GQLTransaction) {
    const { status } = transaction;

    if (status && 'totalFee' in status) {
      const value = bn((status.totalFee as string) || '0');
      return new GasFee({ value });
    }

    return new GasFee({ value: bn(0) });
  }

  value() {
    return this.props.value;
  }
}
