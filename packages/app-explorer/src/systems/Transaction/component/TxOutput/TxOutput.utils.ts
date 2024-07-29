import {
  ChangeOutput,
  CoinOutput,
  GroupedOutput,
  GroupedOutputType,
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
