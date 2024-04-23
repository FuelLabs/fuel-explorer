import type { GQLChainInfo, GQLTransaction } from '@core/generated/gql-types';
import { ValueObject } from '@core/shared/ValueObject';
import { type BN, bn, calculateTransactionFee } from 'fuels';
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
