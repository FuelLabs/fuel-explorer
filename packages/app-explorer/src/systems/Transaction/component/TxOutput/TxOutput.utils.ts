import {
  CoinOutput,
  GroupedOutput,
  GroupedOutputType,
  TransactionItemFragment,
} from '@fuel-explorer/graphql';

export const isCoinOutput = (
  outputs: GroupedOutput['outputs'],
): outputs is CoinOutput[] => {
  const output = outputs?.[0];
  if (!output) return false;

  return outputs[0]?.__typename === GroupedOutputType.CoinOutput;
};

export const getTooltipText = (
  tx: TransactionItemFragment,
  isReceiving: boolean,
) => {
  if (tx.isMint) {
    return 'This is the amount minted in the transaction';
  }

  if (isReceiving) {
    return 'This is the amount spent in the transaction';
  }

  return 'This is the amount remaining after transaction';
};
