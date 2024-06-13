import type { BN } from 'fuels';
import { ValueObject } from '~/core/ValueObject';
import type { GQLTransaction } from '~/graphql/generated/sdk';
import { GasFee } from './GasFee';
import { GasUsed } from './GasUsed';

interface Props {
  value: {
    gasUsed: BN;
    fee: BN;
  };
}

export class GasCosts extends ValueObject<Props> {
  private constructor(props: Props) {
    super(props);
  }

  static create(transaction: GQLTransaction) {
    const fee = GasFee.create(transaction).value();
    const gasUsed = GasUsed.create(transaction).value();
    return new GasCosts({ value: { fee, gasUsed } });
  }

  value() {
    return this.props.value;
  }

  toGQL() {
    return {
      gasUsed: this.value().gasUsed.toString(),
      fee: this.value().fee.toString(),
    };
  }
}
