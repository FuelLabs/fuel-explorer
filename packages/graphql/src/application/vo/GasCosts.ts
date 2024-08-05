import { ValueObject } from '~/core/ValueObject';
import type {
  GQLTransaction,
  GQLTransactionGasCosts,
} from '~/graphql/generated/sdk-provider';
import { GasFee } from './GasFee';
import { GasUsed } from './GasUsed';

interface Props {
  value: GQLTransactionGasCosts;
}

export class GasCosts extends ValueObject<Props> {
  private constructor(props: Props) {
    super(props);
  }

  static create(transaction: GQLTransaction) {
    const fee = GasFee.create(transaction).value();
    const gasUsed = GasUsed.create(transaction).value();
    return new GasCosts({
      value: {
        __typename: 'TransactionGasCosts',
        fee: fee.toString(),
        gasUsed: gasUsed.toString(),
      },
    });
  }

  value() {
    return this.props.value;
  }

  toGQL() {
    return this.value();
  }
}
