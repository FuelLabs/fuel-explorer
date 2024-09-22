import type {
  GQLChangeOutput,
  GQLCoinOutput,
  GQLContractCreated,
  GQLContractOutput,
  GQLVariableOutput,
} from '@fuel-explorer/graphql';
import { memo } from 'react';
import { isOutput } from './TxOutput.utils';
import { TxOutputCoin } from './TxOutputCoin';
import { TxOutputContractCreated } from './TxOutputContractCreated';
import { TxOutputContractOutput } from './TxOutputContractOutput';
import type { TxOutputProps } from './types';

function _TxOutput({ output, ...props }: TxOutputProps) {
  if (
    isOutput<GQLVariableOutput>(output, 'VariableOutput') ||
    isOutput<GQLChangeOutput>(output, 'ChangeOutput') ||
    isOutput<GQLCoinOutput>(output, 'CoinOutput')
  ) {
    return <TxOutputCoin output={output} {...props} />;
  }
  if (isOutput<GQLContractCreated>(output, 'ContractCreated')) {
    return <TxOutputContractCreated output={output} {...props} />;
  }
  if (isOutput<GQLContractOutput>(output, 'ContractOutput')) {
    return <TxOutputContractOutput output={output} {...props} />;
  }

  return null;
}

export const TxOutput = memo(_TxOutput);
