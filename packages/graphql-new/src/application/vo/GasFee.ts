import { BN, bn, calculateTransactionFee } from 'fuels';
import { ValueObject } from '~/core/ValueObject';
import { GQLChainInfo, GQLTransaction } from '~/graphql/generated/sdk';
import { GasUsed } from './GasUsed';

interface Props {
  value: BN;
}

export class GasFee extends ValueObject<Props> {
  private constructor(props: Props) {
    super(props);
  }

  static create(transaction: GQLTransaction, chainInfo: GQLChainInfo) {
    const gasUsed = GasUsed.create(transaction).value();
    const { consensusParameters } = chainInfo;
    const { rawPayload } = transaction;
    const { fee } = calculateTransactionFee({
      consensusParameters,
      rawPayload,
      gasUsed: bn(gasUsed),
    });

    return new GasFee({ value: fee });
  }

  value() {
    return this.props.value;
  }
}
