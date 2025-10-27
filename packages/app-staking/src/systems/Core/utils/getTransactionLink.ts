import { CURRENT_SIMPLY_STAKING_EXPLORER, ETH_CHAIN_NAME } from 'app-commons';
import type { PendingTransactionL1 } from '~staking/systems/Core/hooks/usePendingTransactions';

export const getTransactionLink = (
  hash: string,
  _layer?: PendingTransactionL1['layer'],
) => {
  if (!hash?.startsWith('0x')) {
    return `${CURRENT_SIMPLY_STAKING_EXPLORER}/tx/${hash}`;
  }

  return ETH_CHAIN_NAME !== 'mainnet'
    ? `https://${ETH_CHAIN_NAME}.etherscan.io/tx/${hash}`
    : `https://etherscan.io/tx/${hash}`;
};
