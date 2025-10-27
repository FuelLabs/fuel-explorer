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

function _TxOutput({ output, getContractByIndex, txStatus }: TxOutputProps) {
  if (
    isOutput<GQLVariableOutput>(output, 'VariableOutput') ||
    isOutput<GQLChangeOutput>(output, 'ChangeOutput') ||
    isOutput<GQLCoinOutput>(output, 'CoinOutput')
  ) {
    return <TxOutputCoin output={output} txStatus={txStatus} />;
  }
  if (isOutput<GQLContractCreated>(output, 'ContractCreated')) {
    return <TxOutputContractCreated output={output} />;
  }
  if (isOutput<GQLContractOutput>(output, 'ContractOutput')) {
    return (
      <TxOutputContractOutput
        output={output}
        getContractByIndex={getContractByIndex}
      />
    );
  }

  return null;
}

export const TxOutput = memo(_TxOutput);
