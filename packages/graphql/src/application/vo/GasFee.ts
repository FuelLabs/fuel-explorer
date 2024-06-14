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
    if (status?.__typename !== 'SuccessStatus') {
      return new GasFee({ value: bn(0) });
    }

    const value = bn(status.totalFee);
    return new GasFee({ value });
  }

  value() {
    return this.props.value;
  }
}
