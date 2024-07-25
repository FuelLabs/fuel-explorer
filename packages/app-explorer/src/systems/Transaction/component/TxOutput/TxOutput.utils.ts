import {
  ChangeOutput,
  CoinOutput,
  GroupedOutput,
  GroupedOutputType,
  Output,
  TransactionItemFragment,
} from '@fuel-explorer/graphql';

export const isCoinOutputs = (
  outputs: GroupedOutput['outputs'],
): outputs is CoinOutput[] => {
  const output = outputs?.[0];
  if (!output) return false;

  return outputs[0]?.__typename === GroupedOutputType.CoinOutput;
};

export const hasCoins = (tx: TransactionItemFragment): boolean => {
  return tx.outputs.some(
    (output) => output.__typename === GroupedOutputType.CoinOutput,
  );
};

export const isChangeOutputs = (
  outputs: GroupedOutput['outputs'],
): outputs is ChangeOutput[] => {
  const output = outputs?.[0];
  if (!output) return false;

  return outputs[0]?.__typename === GroupedOutputType.ChangeOutput;
};

export const isChangeOutput = (output: Output): output is ChangeOutput => {
  return output.__typename === GroupedOutputType.ChangeOutput;
};

export const getTooltipText = (
  tx: TransactionItemFragment,
  isRemaining: boolean,
) => {
  if (tx.isMint) {
    return 'This is the amount minted in the transaction';
  }

  if (isRemaining) {
    return 'This is the amount remaining after transaction';
  }

  return 'This is the amount spent in the transaction';
};
